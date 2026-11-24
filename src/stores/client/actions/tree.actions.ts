// Раскрытие/сворачивание папки в дереве файлов.
// Память раскрытых папок — per-scope (folder_expandedByScope).

import { useClientState } from "../useClientState";
import { getCurrentContext, scopeKey, syncActiveFields } from "./context";


export const actions = {
  /** Toggle раскрытия папки в текущем scope. */
  folder_toggle(folderId: string) {
    const ctx = getCurrentContext();
    if (!ctx) return;

    const key = scopeKey(ctx.projectId, ctx.categoryId, ctx.discipline);

    // Обновляем Record: если папка была раскрыта — сворачиваем, если была свернута — раскрываем.
    useClientState.setState((s) => {
      const current = s.folder_expandedByScope[key] ?? [];
      const next = current.includes(folderId)
        ? current.filter((id) => id !== folderId)
        : [...current, folderId];
      return {
        folder_expandedByScope: { ...s.folder_expandedByScope, [key]: next },
      };
    });

    syncActiveFields();   // tree_expandedIds обновились
  },
};