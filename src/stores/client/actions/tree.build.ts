// Пересборка discipline_items и tree_items из закэшированного workspace.
// Вызывается после смены проекта / категории / дисциплины.

import { useClientData } from "../useClientData";
import { buildTree } from "@/utils/file-manager/build-tree";
import { getDisciplineOptions } from "@/utils/file-manager/get-discipline-options";
import { getCurrentContext } from "./context";

/**
 * Пересобирает:
 *   - discipline_items (из workspace.folders + workspace.disciplines по категории)
 *   - tree_items (buildTree по текущему scope)
 *
 * Если контекст неполный — обнуляет оба списка.
 */
export function rebuildTree() {
  const ctx = getCurrentContext();
  const data = useClientData.getState();

  if (!ctx) {
    data.setDisciplineItems([]);
    data.setTreeItems([]);
    return;
  }

  const workspace = data.workspacesByProject[ctx.projectId];
  if (!workspace) return;

  data.setDisciplineItems(
    getDisciplineOptions(workspace.folders, workspace.disciplines, ctx.categoryId),
  );
  data.setTreeItems(
    buildTree(
      workspace.categories,
      workspace.folders,
      workspace.disciplines,
      workspace.files,
      ctx.categoryId,
      ctx.discipline,
    ),
  );
}