// Общие хелперы для actions. Не публикуются в index.ts.

import { useClientState } from "../useClientState";
import { useClientData } from "../useClientData";
import { useClientViews } from "../useClientViews";
import { categoryKey, scopeKey } from "../keys";
import type { TreeItem } from "@/types/file-manager";


let _fileVersion = 0; // Версионирование запросов к API файла (race-guard)

/** Инкрементирует версию. Возвращает новое значение. */
export const nextFileVersion = () => ++_fileVersion;

/** true, если это всё ещё актуальный запрос (не прерван более новым). */
export const isCurrentFileVersion = (v: number) => v === _fileVersion;

/**
 * Текущий «полный» контекст. null, если хотя бы один уровень не выбран.
 * Используется в actions. Компоненты работают с проекциями из стора.
 */
export function getCurrentContext() {
  const s = useClientState.getState();
  const projectId = s.project_selected;
  if (!projectId) return null;

  const categoryId = s.category_selectedByProject[projectId];
  if (!categoryId) return null;

  const discipline = s.discipline_selectedByCategory[categoryKey(projectId, categoryId)];
  if (!discipline) return null;

  return { projectId, categoryId, discipline };
}

/**
 * id активного файла текущего scope. null, если файл не выбран.
 */
export function getCurrentFileId(): string | null {
  const ctx = getCurrentContext();
  if (!ctx) return null;
  return (
    useClientState.getState().file_selectedByDiscipline[
      scopeKey(ctx.projectId, ctx.categoryId, ctx.discipline)
    ] ?? null
  );
}

/**
 * Рекурсивный поиск файла в дереве.
 * Возвращает узел (с mark) или null.
 */
export function findFileInTree(items: TreeItem[], fileId: string): TreeItem | null {
  for (const item of items) {
    if (item.type === "file" && item.id === fileId) return item;
    if (item.children) {
      const found = findFileInTree(item.children, fileId);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Пересчитывает проекции (category_activeId, discipline_activeId,
 * tree_selectedId, tree_expandedIds) из per-scope Record.
 *
 * ПРАВИЛО: вызывать после любого setState, который трогает Record.
 */
export function syncActiveFields() {
  const s = useClientState.getState();
  const projectId = s.project_selected;
  const categoryId = projectId ? s.category_selectedByProject[projectId] ?? null : null;

  const cKey = projectId && categoryId ? categoryKey(projectId, categoryId) : null;
  const discipline = cKey ? s.discipline_selectedByCategory[cKey] ?? null : null;

  const sKey =
    projectId && categoryId && discipline
      ? scopeKey(projectId, categoryId, discipline)
      : null;

  useClientState.setState({
    category_activeId: categoryId,
    discipline_activeId: discipline,
    tree_selectedId: sKey ? s.file_selectedByDiscipline[sKey] ?? null : null,
    tree_expandedIds: sKey ? s.folder_expandedByScope[sKey] ?? [] : [],
  });
}

/**
 * Сохраняет текущие flow/view в useClientState.view_selectedByScope[текущий scope].
 * Вызывается перед любым переходом, который может сменить scope (category/discipline)
 * или файл, чтобы при возврате восстановить view.
 */
export function saveViewToScope() {
  const ctx = getCurrentContext();
  if (!ctx) return;

  const key = scopeKey(ctx.projectId, ctx.categoryId, ctx.discipline);
  const views = useClientViews.getState();

  useClientState.setState((s) => ({
    view_selectedByScope: {
      ...s.view_selectedByScope,
      [key]: { flowId: views.flow_selectedId, viewId: views.view_selectedId },
    },
  }));
}

/**
 * Сбрасывает данные PropertiesView / ActionsView.
 * Вызывается при любом переходе — свойства/действия не запоминаются.
 */
export function clearSidePanelsData() {
  useClientData.setState({ properties_rows: [], actions_items: [] });
}