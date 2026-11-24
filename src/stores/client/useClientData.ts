// Данные кабинета клиента: списки для селектов, дерево, модель файла.
// properties_rows / actions_items сбрасываются при любом переходе
// (flow / view / файл / категория / дисциплина / проект) и заполняются
// только когда внутри View выбран компонент (потом).

"use client";

import { create } from "zustand";
import type { SelectItem } from "@/types/file-manager";
import type { IconItem } from "@/components/lists/bars/IconsBar";
import type { TreeItem, Workspace, FileModel } from "@/types/file-manager";

/** Ключи loading-флагов. */
export type LoadingKey = "isProjectsLoading" | "isProjectLoading" | "isFileLoading";

/** Строка в PropertiesView. */
export interface PropertyRow {
  id: string;
  label: string;
  value: string;
}

/** Действие в ActionsView. */
export interface ActionItem extends SelectItem {
  // позже: icon, disabled и т.д.
}

export interface ClientData {
  // ── ДАННЫЕ ДЛЯ СЕЛЕКТОВ ──
  project_items: SelectItem[]; // Список проектов (грузится через actions.projects_load)
  category_items: SelectItem[]; // Список сооружений (заполняется в project_select)
  discipline_items: IconItem[]; // Список дисциплин (заполняется в category_select)

  // ── ДЕРЕВО ФАЙЛОВ ──
  tree_items: TreeItem[]; // Дерево для FileNavigator (пересобирается в rebuildTree)
  workspacesByProject: Record<string, Workspace>; // Кэш «сырых» workspace по проекту. НЕ для рендера — только для локального построения дерева без повторных запросов при смене категории/дисциплины

  // ── АКТИВНЫЙ ФАЙЛ ──
  currentFileModel: FileModel | null; // Модель выбранного файла (nodes/edges). Сбрасывается при смене файла/view

  // ── ДАННЫЕ ПРАВОЙ ПАНЕЛИ ──
  properties_rows: PropertyRow[]; // Строки для PropertiesView (сбрасываются при переходах)
  actions_items: ActionItem[]; // Действия для ActionsView (сбрасываются при переходах)

  // ── LOADING ──
  loading: Record<LoadingKey, boolean>;

  // ── СЕТТЕРЫ ──
  setProjectItems: (items: SelectItem[]) => void;
  setCategoryItems: (items: SelectItem[]) => void;
  setDisciplineItems: (items: IconItem[]) => void;
  setTreeItems: (items: TreeItem[]) => void;
  setWorkspace: (projectId: string, workspace: Workspace) => void;
  setCurrentFileModel: (model: FileModel | null) => void;
  setLoading: (key: LoadingKey, value: boolean) => void;
}

export const useClientData = create<ClientData>()((set) => ({
  project_items: [],
  category_items: [],
  discipline_items: [],
  tree_items: [],
  workspacesByProject: {},
  currentFileModel: null,
  properties_rows: [],
  actions_items: [],
  loading: {
    isProjectsLoading: false,
    isProjectLoading: false,
    isFileLoading: false,
  },

  setProjectItems: (project_items) => set({ project_items }),
  setCategoryItems: (category_items) => set({ category_items }),
  setDisciplineItems: (discipline_items) => set({ discipline_items }),
  setTreeItems: (tree_items) => set({ tree_items }),
  setWorkspace: (projectId, workspace) =>
    set((s) => ({
      workspacesByProject: { ...s.workspacesByProject, [projectId]: workspace },
    })),
  setCurrentFileModel: (currentFileModel) => set({ currentFileModel }),
  setLoading: (key, value) =>
    set((s) => ({ loading: { ...s.loading, [key]: value } })),
}));