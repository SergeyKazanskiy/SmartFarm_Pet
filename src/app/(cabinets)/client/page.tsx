"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { useActiveFlowView } from "@/stores/client/useClientViews";
import type { FlowId } from "@/settings/flows";

// React.lazy + Next.js dynamic() для ленивой загрузки компонентов view.

const VIEW_COMPONENTS = {
  initial:      { schema: dynamic(() => import("@/features/flow-tabs/InitialSchemaView")) },
  design:       {
    schema:  dynamic(() => import("@/features/flow-tabs/DesignSchemaView")),
    model3d: dynamic(() => import("@/features/flow-tabs/DesignModel3DView")),
    bpmn:    dynamic(() => import("@/features/flow-tabs/DesignBpmnView")),
  },
  production:   {
    kanban: dynamic(() => import("@/features/flow-tabs/ProductionKanbanView")),
    gantt:  dynamic(() => import("@/features/flow-tabs/ProductionGanttView")),
  },
  delivery:     { list: dynamic(() => import("@/features/flow-tabs/DeliveryListView")) },
  installation: { list: dynamic(() => import("@/features/flow-tabs/InstallationListView")) },
  launch:       { list: dynamic(() => import("@/features/flow-tabs/LaunchListView")) },
  management:   { list: dynamic(() => import("@/features/flow-tabs/ManagementListView")) },
} satisfies Record<FlowId, Record<string, ComponentType>>;

// Страница /client/[flow]/[view] → рендерит соответствующий view. Если view не найден — рендерит первый доступный для flow.
export default function ClientPage() {
  const { flowId, viewId } = useActiveFlowView();
  const flowViews = VIEW_COMPONENTS[flowId];
  const View =
    (flowViews[viewId as keyof typeof flowViews] ??
      Object.values(flowViews)[0]) as ComponentType;
  return <View />;
}