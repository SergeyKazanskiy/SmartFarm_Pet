// Работа с файлом: клик в дереве, загрузка модели, восстановление выбранного.
//
// ПРАВИЛО МАРКИ (только при клике в дереве!):
//   - mark совпадает с предыдущим файлом → view НЕ сбрасывается (clearViewByFlow)
//   - mark отличается / первый файл → сброс на первый flow + первый view (resetToFirst)
//
// Восстановление файла при смене scope (category/discipline) —
// правило марки НЕ применяется, view берётся из view_selectedByScope.

import { fileManagerApi } from "@/api/site/file-manager.api";
import { useClientData } from "../useClientData";
import { useClientState } from "../useClientState";
import { useClientViews } from "../useClientViews";
import { getCurrentContext, findFileInTree, scopeKey, nextFileVersion, isCurrentFileVersion, syncActiveFields, saveViewToScope, clearSidePanelsData } from "./context";

/**
 * Восстановить выбранный файл текущего scope.
 * Правило марки НЕ применяется — view уже восстановлен из view_selectedByScope
 * вызывающим action (category/discipline_setActive).
 *
 * Если файла нет в дереве (удалён / категория изменилась) — сбрасываем модель.
 */
export async function restoreSelectedFile() {
  const ctx = getCurrentContext();
  const data = useClientData.getState();

  if (!ctx) {
    data.setCurrentFileModel(null);
    return;
  }

  const key = scopeKey(ctx.projectId, ctx.categoryId, ctx.discipline);
  const fileId = useClientState.getState().file_selectedByDiscipline[key];
  const file = fileId ? findFileInTree(data.tree_items, fileId) : null;

  if (!file) {
    nextFileVersion();                       // отменяем незавершённые загрузки
    data.setCurrentFileModel(null);
    data.setLoading("isFileLoading", false);
    useClientState.setState({ lastFileMark: null });
    return;
  }

  useClientState.setState({ lastFileMark: file.mark ?? null });
  await actions.file_loadModel(file.id);
}

export const actions = {
  /**
   * Клик по файлу в дереве. Применяет правило марки.
   */
  async file_setActive(fileId: string) {
    const ctx = getCurrentContext();
    if (!ctx) return;

    const data = useClientData.getState();
    const state = useClientState.getState();
    const file = findFileInTree(data.tree_items, fileId);
    if (!file) return;

    // ── Правило марки ──
    const sameMark =
      state.lastFileMark !== null &&
      file.mark !== undefined &&
      file.mark === state.lastFileMark;

    const views = useClientViews.getState();
    if (sameMark) {
      // Тот же тип файла — view «переезжает» на новый файл
      views.clearViewByFlow();
    } else {
      // Другая марка или первый файл — сброс на первый flow/view
      views.resetToFirst();
    }

    // ── Запись в per-scope Record ──
    const key = scopeKey(ctx.projectId, ctx.categoryId, ctx.discipline);
    useClientState.setState((s) => ({
      file_selectedByDiscipline: { ...s.file_selectedByDiscipline, [key]: fileId },
      lastFileMark: file.mark ?? null,
      manager_isActive: true,
    }));

    // ── Обновление памяти view и проекций ──
    saveViewToScope();
    syncActiveFields();       // tree_selectedId = fileId
    clearSidePanelsData();    // свойства/действия сбрасываются

    // ── Запрос данных ──
    await actions.file_loadModel(fileId);
  },

  /**
   * Загрузка модели файла.
   * Race-guard: если за время запроса выбран другой файл / scope —
   * ответ игнорируется.
   */
  async file_loadModel(fileId: string) {
    const version = nextFileVersion();
    const data = useClientData.getState();
    data.setLoading("isFileLoading", true);

    try {
      const model = await fileManagerApi.getFileModel(fileId);
      if (!isCurrentFileVersion(version)) return;

      const ctx = getCurrentContext();
      if (!ctx) return;

      const key = scopeKey(ctx.projectId, ctx.categoryId, ctx.discipline);
      const selectedId = useClientState.getState().file_selectedByDiscipline[key];
      if (selectedId !== fileId) return;

      useClientData.getState().setCurrentFileModel(model);
    } finally {
      if (isCurrentFileVersion(version)) {
        useClientData.getState().setLoading("isFileLoading", false);
      }
    }
  },
};