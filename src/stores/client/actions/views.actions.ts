// Оркестрация переключения flow / view пользователем.
//
// Чистые сеттеры useClientViews (flow_setActive, view_setActive) не знают
// о файле, properties и scope. Здесь — обвязка:
//   1) переключить flow/view в useClientViews
//   2) сохранить выбор в view_selectedByScope (для возврата из scope)
//   3) сбросить properties/actions
//   4) перезапросить данные файла (для нового view данные другие)

import { useClientViews } from "../useClientViews";
import type { FlowId } from "@/settings/flows";
import type { ViewId } from "@/settings/views";
import { getCurrentFileId, saveViewToScope, clearSidePanelsData } from "./context";
import { actions as fileActions } from "./files.actions";

/**
 * Если flow/view изменились — перезагрузить данные файла.
 * Данные зависят от view (nodes/edges для schema ≠ nodes/edges для 3d),
 * поэтому запрос нужен при каждом реальном изменении.
 */
async function reloadFileIfViewChanged(prevFlow: FlowId, prevView: ViewId) {
  const { flow_selectedId, view_selectedId } = useClientViews.getState();
  if (flow_selectedId === prevFlow && view_selectedId === prevView) return;

  const fileId = getCurrentFileId();
  if (fileId) await fileActions.file_loadModel(fileId);
}

export const actions = {
  /** Клик по flow в ClientFlowTabs. */
  async set_flow(flowId: FlowId) {
    const prev = useClientViews.getState();
    const prevFlow = prev.flow_selectedId;
    const prevView = prev.view_selectedId;

    prev.flow_setActive(flowId);
    saveViewToScope();
    clearSidePanelsData();

    await reloadFileIfViewChanged(prevFlow, prevView);
  },

  /** Клик по view в IconsBar. */
  async set_view(viewId: ViewId) {
    const prev = useClientViews.getState();
    const prevFlow = prev.flow_selectedId;
    const prevView = prev.view_selectedId;

    prev.view_setActive(viewId);
    saveViewToScope();
    clearSidePanelsData();

    await reloadFileIfViewChanged(prevFlow, prevView);
  },
};