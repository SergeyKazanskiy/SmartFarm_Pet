// src/stores/client/actions/index.ts
//
// Публичный API actions кабинета клиента.
// Импортируется в компонентах:
//   import { actions } from "@/stores/client/actions";
//
// Внутренние хелперы (restoreSelectedFile, rebuildTree, syncActiveFields,
// saveViewToScope и т.д.) — НЕ публикуются. Только явные действия.

import { actions as views } from "./views.actions";
import { actions as projects } from "./projects.actions";
import { actions as categories } from "./categories.actions";
import { actions as disciplines } from "./disciplines.actions";
import { actions as files } from "./files.actions";
import { actions as tree } from "./tree.actions";

export const actions = {
  ...views,         // set_flow, set_view
  ...projects,      // projects_load, project_select
  ...categories,    // category_setActive
  ...disciplines,   // discipline_setActive
  ...files,         // file_setActive, file_loadModel
  ...tree,          // folder_toggle
};

export type Actions = typeof actions;