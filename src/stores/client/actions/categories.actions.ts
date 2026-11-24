// Переключение категории (Сооружения, Узлы, ...).
// Это ПЕРЕХОД ПО SCOPE, не смена файла:
//   - правило марки НЕ применяется
//   - view/file/expanded восстанавливаются из view_selectedByScope и per-scope Record

import { useClientData } from "../useClientData";
import { useClientState } from "../useClientState";
import { useClientViews } from "../useClientViews";
import { FLOW_IDS } from "@/settings/flows";
import { categoryKey, getCurrentContext, scopeKey, syncActiveFields, saveViewToScope, clearSidePanelsData } from "./context";
import { rebuildTree } from "./tree.build";
import { restoreSelectedFile } from "./files.actions";
import { getDisciplineOptions } from "@/utils/file-manager/get-discipline-options";


export const actions = {
  async category_setActive(categoryId: string) {
    const ctx = getCurrentContext();
    if (!ctx || ctx.categoryId === categoryId) return;

    // 1. Сохранить view текущего scope (чтобы вернуться к нему позже)
    saveViewToScope();

    // 2. Обновить категорию проекта
    useClientState.setState((s) => ({
      category_selectedByProject: {
        ...s.category_selectedByProject,
        [ctx.projectId]: categoryId,
      },
    }));

    const data = useClientData.getState();
    const workspace = data.workspacesByProject[ctx.projectId];
    if (!workspace) return;

    // 3. Определить дисциплину в новой категории:
    //    сохранённую для пары (project, category) или первую доступную
    const options = getDisciplineOptions(workspace.folders, workspace.disciplines, categoryId);
    const cKey = categoryKey(ctx.projectId, categoryId);
    const saved = useClientState.getState().discipline_selectedByCategory[cKey];
    const discipline = options.find((o) => o.code === saved)?.code ?? options[0]?.code;
    if (!discipline) return;

    useClientState.setState((s) => ({
      discipline_selectedByCategory: {
        ...s.discipline_selectedByCategory,
        [cKey]: discipline,
      },
    }));

    // 4. Восстановить flow/view из памяти нового scope
    const newScopeKey = scopeKey(ctx.projectId, categoryId, discipline);
    const remembered = useClientState.getState().view_selectedByScope[newScopeKey];
    const views = useClientViews.getState();

    if (remembered) {
      views.setFlowView(remembered.flowId, remembered.viewId);
    } else {
      views.resetToFirst();
    }

    // 5. Пересобрать дерево, синхронизировать проекции
    rebuildTree();
    syncActiveFields();
    clearSidePanelsData();

    // 6. Восстановить выбранный ранее файл (БЕЗ правила марки)
    await restoreSelectedFile();
  },
};