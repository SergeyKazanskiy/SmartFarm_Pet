// UI-состояние кабинета клиента.
//
// ДВА УРОВНЯ ХРАНЕНИЯ:
//
//   1) Источник правды (per-scope Record):
//      category_selectedByProject, discipline_selectedByCategory,
//      file_selectedByDiscipline, folder_expandedByScope, view_selectedByScope.
//      Пишутся ТОЛЬКО actions. Читаются ТОЛЬКО actions (для восстановления
//      выбора при возврате в scope).
//
//   2) Проекция для UI:
//      category_activeId, discipline_activeId, tree_selectedId, tree_expandedIds.
//      Синхронизируются из Record через syncActiveFields() в actions.
//      Компоненты читают ТОЛЬКО проекции.
//
// ПРАВИЛО: после любого setState, который трогает Record, — вызвать syncActiveFields().
//
// flow_selectedId / view_selectedId — в useClientViews (см. отдельный файл).
// Side-панели (leftOpen/rightOpen) — useState в layout.tsx, не в сторе.
// properties_rows / actions_items — в useClientData, сбрасываются при переходах.

"use client";

import { create } from "zustand";
import type { FlowId } from "@/settings/flows";
import type { ViewId } from "@/settings/views";


export interface ClientState {
  project_selected: string | null; // Текущий проект.

  // ── ИСТОЧНИК ПРАВДЫ (per-scope) ──
  category_selectedByProject: Record<string, string>; // Запоминает категорию для каждого проекта.
  discipline_selectedByCategory: Record<string, string>; // Запоминает дисциплину для каждой пары project+category.
  file_selectedByDiscipline: Record<string, string>; // Запоминает выбранный файл для каждой тройки project+category+discipline.
  folder_expandedByScope: Record<string, string[]>; // Раскрытые папки для каждой тройки project+category+discipline.
  view_selectedByScope: Record<string, { flowId: FlowId; viewId: ViewId }>; // Постоянная память view по scope.

  // ── ПРОЕКЦИЯ ДЛЯ UI ──
  category_activeId: string | null; // Активная категория.
  discipline_activeId: string | null; // Активная дисциплина.
  tree_selectedId: string | null; // Активный файл.
  tree_expandedIds: string[]; // Раскрытые папки. Синхронизируются с folder_expandedByScope через syncActiveFields().

  // ── ВСПОМОГАТЕЛЬНОЕ ──
  lastFileMark: string | null; // Марка последнего активного файла. Нужна для правила марки при клике на файл в дереве: если марка совпадает — view не сбрасывается
  manager_isActive: boolean; // Флаг «файл выбран и модель загружена» (для индикаторов).

  // ── СЕТТЕРЫ ──
  setProjectSelectedId: (id: string | null) => void;
}

export const useClientState = create<ClientState>()((set) => ({
  project_selected: null,

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

  setProjectSelectedId: (id) => set({ project_selected: id }),
}));