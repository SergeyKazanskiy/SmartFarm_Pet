// Flow / View кабинета клиента.
//
// ДВА УРОВНЯ:
//   1) Текущие flow_selectedId / view_selectedId — что показать прямо сейчас.
//   2) Транзиентная память viewByFlow — какой view был у каждого flow.
//      Живёт до смены файла (в file_setActive вызывается clearViewByFlow
//      или resetToFirst). НЕ персистится.
//
// Постоянная память «view для scope» (category/discipline) живёт
// в useClientState.view_selectedByScope и управляется actions.
//
// flow_setActive / view_setActive — чистые сеттеры. Оркестрация
// (сброс правой панели, запрос данных файла, сохранение в scope)
// вынесена в actions.set_flow / actions.set_view.

"use client";

import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { FLOW_IDS, type FlowId } from "@/settings/flows";
import { VIEWS, type ViewId } from "@/settings/views";
import { useTranslations } from "@/locales";

/**
 * Привязка flow → доступные views. Специфична для кабинета клиента.
 * Для developer будет свой FLOW_META.
 */
export const FLOW_META: Record<FlowId, readonly ViewId[]> = {
  initial:      ["schema"],
  design:       ["schema", "model3d", "bpmn"],
  production:   ["kanban", "gantt"],
  delivery:     ["list"],
  installation: ["list"],
  launch:       ["list"],
  management:   ["list"],
};

interface ClientViewsState {
  flow_selectedId: FlowId; // Активный flow. Должен быть валиден для FLOW_META (см. FLOW_META).
  view_selectedId: ViewId; // Активный view. Должен быть валиден для flow_selectedId (см. FLOW_META).
  viewByFlow: Partial<Record<FlowId, ViewId>>; // Транзиентная память view по flow. Сбрасывается при смене файла (в file_setActive вызывается clearViewByFlow или resetToFirst). НЕ персистится.

  // ── СЕТТЕРЫ ──
  flow_setActive: (id: FlowId | string) => void; // Восстанавливает view из viewByFlow (если он валиден для нового flow) или берёт первый доступный. Запоминает текущий view в viewByFlow[старый flow].
  view_setActive: (id: ViewId | string) => void; // Запоминает view в viewByFlow[текущий flow].
  resetToFirst: () => void; // Полный сброс: первый flow, его первый view, чистая память.
  clearViewByFlow: () => void; // Очистка памяти viewByFlow (flow/view остаются). Используется при смене файла (file_setActive).
  setFlowView: (flowId: FlowId, viewId: ViewId) => void; // Установить flow + view напрямую (при восстановлении из view_selectedByScope). Память viewByFlow при этом очищается — это «свежий» контекст.
}

export const useClientViews = create<ClientViewsState>()((set) => ({
  flow_selectedId: FLOW_IDS[0],
  view_selectedId: FLOW_META[FLOW_IDS[0]][0],
  viewByFlow: {},

  flow_setActive: (id) =>
    set((s) => {
      // Запоминаем view текущего flow перед переключением
      const updated = { ...s.viewByFlow, [s.flow_selectedId]: s.view_selectedId };
      const saved = updated[id];
      // Если для нового flow есть валидный сохранённый view — берём его,
      // иначе первый доступный
      const nextView =
        saved && FLOW_META[id].includes(saved) ? saved : FLOW_META[id][0];
      return {
        flow_selectedId: id,
        view_selectedId: nextView,
        viewByFlow: updated,
      };
    }),

  view_setActive: (id) =>
    set((s) => ({
      view_selectedId: id,
      viewByFlow: { ...s.viewByFlow, [s.flow_selectedId]: id },
    })),

  resetToFirst: () =>
    set({
      flow_selectedId: FLOW_IDS[0],
      view_selectedId: FLOW_META[FLOW_IDS[0]][0],
      viewByFlow: {},
    }),

  clearViewByFlow: () => set({ viewByFlow: {} }),

  setFlowView: (flowId, viewId) =>
    set({
      flow_selectedId: flowId,
      view_selectedId: viewId,
      viewByFlow: {},
    }),
}));

// ───────────────────────────────────────────────────────────
// Селекторы с локализацией — пересобираются при смене языка.
// ───────────────────────────────────────────────────────────

/** Список flow для ClientFlowTabs (id + локализованное имя). */
export function useFlowItems() {
  const t = useTranslations();
  const selectedId = useClientViews((s) => s.flow_selectedId);
  return {
    items: FLOW_IDS.map((id: string | number) => ({ id, name: t.flows[id] ?? id })),
    selectedId,
  };
}

/** Список view текущего flow для IconsBar. */
export function useViewItems() {
  const t = useTranslations();
  const { flowId, viewId } = useClientViews(
    useShallow((s) => ({ flowId: s.flow_selectedId, viewId: s.view_selectedId })),
  );
  return {
    items: FLOW_META[flowId].map((id) => ({
      id,
      name: t.views[id] ?? id,
      iconName: VIEWS[id].icon,
    })),
    selectedId: viewId,
  };
}

/** Текущий flow + view (для page.tsx). */
export function useActiveFlowView() {
  return useClientViews(
    useShallow((s) => ({ flowId: s.flow_selectedId, viewId: s.view_selectedId })),
  );
}