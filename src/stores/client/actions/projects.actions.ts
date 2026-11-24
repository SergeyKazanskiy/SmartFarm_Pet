// Загрузка списка проектов и выбор проекта.
//
// Смена проекта = полный сброс всей памяти контекста
// (per-scope Record, viewByFlow, view_selectedByScope, lastFileMark).
// Проекты переключаются редко — переживать за UX сохранения не нужно.

import { fileManagerApi } from "@/api/site/file-manager.api";
import { useClientData } from "../useClientData";
import { useClientState } from "../useClientState";
import { useClientViews } from "../useClientViews";
import { FLOW_IDS } from "@/settings/flows";
import { categoryKey, syncActiveFields, clearSidePanelsData } from "./context";
import { rebuildTree } from "./tree.build";
import { restoreSelectedFile } from "./files.actions";
import { getDisciplineOptions } from "@/utils/file-manager/get-discipline-options";
import { DEFAULT_CATEGORY_ITEMS } from "@/settings/categories";

export const actions = {
  /** Загрузить список проектов. */
  async projects_load() {
    const data = useClientData.getState();
    data.setLoading("isProjectsLoading", true);
    try {
      const items = await fileManagerApi.getProjects();
      useClientData.getState().setProjectItems(items);
    } finally {
      useClientData.getState().setLoading("isProjectsLoading", false);
    }
  },

  /** Выбор проекта: полный сброс памяти + загрузка workspace + выбор первой категории/дисциплины. */
  async project_select(projectId: string) {
    // Ранний выход: тот же проект
    if (useClientState.getState().project_selected === projectId) return;

    const data = useClientData.getState();

    // ── Полный сброс ──
    useClientState.setState({
      project_selected: projectId,
      category_selectedByProject: {},
      discipline_selectedByCategory: {},
      file_selectedByDiscipline: {},
      folder_expandedByScope: {},
      view_selectedByScope: {},
      category_activeId: null,
      discipline_activeId: null,
      tree_selectedId: null,
      tree_expandedIds: [],
      lastFileMark: null,
      manager_isActive: false,
    });
    useClientViews.getState().resetToFirst();
    clearSidePanelsData();
    useClientData.setState({ currentFileModel: null, tree_items: [], discipline_items: [] });

    // ── Загрузка workspace (с кэшем) ──
    let workspace = data.workspacesByProject[projectId];
    if (!workspace) {
      data.setLoading("isProjectLoading", true);
      try {
        workspace = await fileManagerApi.getProjectWorkspace(projectId);
        useClientData.getState().setWorkspace(projectId, workspace);
      } finally {
        useClientData.getState().setLoading("isProjectLoading", false);
      }
    }

    // Пока грузили workspace, могли выбрать другой проект
    if (useClientState.getState().project_selected !== projectId) return;

    // ── Категории проекта ──
    const categoryItems =
      workspace.categories.length > 0
        ? workspace.categories.map((c) => ({ id: c.id, name: c.name }))
        : DEFAULT_CATEGORY_ITEMS;
    useClientData.getState().setCategoryItems(categoryItems);

    const categoryId = categoryItems[0]?.id;
    if (!categoryId) return;

    // ── Запомнить категорию для проекта ──
    useClientState.setState((s) => ({
      category_selectedByProject: {
        ...s.category_selectedByProject,
        [projectId]: categoryId,
      },
    }));

    // ── Дисциплина по умолчанию для (project, category) ──
    const options = getDisciplineOptions(
      workspace.folders,
      workspace.disciplines,
      categoryId,
    );
    const discipline = options[0]?.code;
    if (!discipline) return;

    // ── Запомнить дисциплину для (project, category) ──
    const cKey = categoryKey(projectId, categoryId);
    useClientState.setState((s) => ({
      discipline_selectedByCategory: {
        ...s.discipline_selectedByCategory,
        [cKey]: discipline,
      },
    }));

    // ── Сборка + синхронизация + восстановление файла ──
    rebuildTree();
    syncActiveFields();
    await restoreSelectedFile();
  },
};