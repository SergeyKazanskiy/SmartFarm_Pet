// Переключение дисциплины (Электрика, Сантехника, ...).
// Это ПЕРЕХОД ПО SCOPE, не смена файла: правило марки не применяется.

import { useClientData } from "../useClientData";
import { useClientState } from "../useClientState";
import { useClientViews } from "../useClientViews";
import { categoryKey, getCurrentContext, scopeKey, syncActiveFields, saveViewToScope, clearSidePanelsData } from "./context";
import { rebuildTree } from "./tree.build";
import { restoreSelectedFile } from "./files.actions";
import { getDisciplineOptions } from "@/utils/file-manager/get-discipline-options";

export const actions = {
  async discipline_setActive(discipline: string) {
    const ctx = getCurrentContext();
    if (!ctx || ctx.discipline === discipline) return;

    const data = useClientData.getState();
    const workspace = data.workspacesByProject[ctx.projectId];
    if (!workspace) return;

    // Валидация: дисциплина должна быть доступна для этой категории
    const valid = getDisciplineOptions(
      workspace.folders,
      workspace.disciplines,
      ctx.categoryId,
    ).some((o) => o.code === discipline);
    if (!valid) return;

    // 1. Сохранить view текущего scope
    saveViewToScope();

    // 2. Обновить дисциплину для пары (project, category)
    const cKey = categoryKey(ctx.projectId, ctx.categoryId);
    useClientState.setState((s) => ({
      discipline_selectedByCategory: {
        ...s.discipline_selectedByCategory,
        [cKey]: discipline,
      },
    }));

    // 3. Восстановить flow/view из памяти нового scope
    const newScopeKey = scopeKey(ctx.projectId, ctx.categoryId, discipline);
    const remembered = useClientState.getState().view_selectedByScope[newScopeKey];
    const views = useClientViews.getState();

    if (remembered) {
      views.setFlowView(remembered.flowId, remembered.viewId);
    } else {
      views.resetToFirst();
    }

    // 4. Пересобрать + синхронизировать + восстановить файл
    rebuildTree();
    syncActiveFields();
    clearSidePanelsData();
    await restoreSelectedFile();
  },
};