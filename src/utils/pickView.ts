// src/features/flow-views/merge-views.ts
import type { FlowMeta } from "@/settings/flows/client-flow-meta";

/** Возвращает компонент активного View с fallback на default */
export function pickView<T extends Record<string, React.ComponentType>>(
  meta: FlowMeta, // конфигурация flow (FLOW_META.design, FLOW_META.production и т.д.)
  registry: T, // реестр компонентов View (VIEW_COMPONENTS)
  activeViewId: string, // id активного View (view_activeByFlow.design, view_activeByFlow.production и т.д.)
): React.ComponentType {
  return registry[activeViewId] ?? registry[meta.defaultViewId];
}