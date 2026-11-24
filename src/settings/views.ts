import type { IconName } from "@/components/icons/icon-paths";

export interface ViewMeta {
  icon: IconName;
}

export const VIEWS = {
  schema:  { icon: "snow" },
  model3d: { icon: "model" },
  bpmn:    { icon: "process" },
  list:    { icon: "description" },
  kanban:  { icon: "process" },
  gantt:   { icon: "process" },
} as const satisfies Record<string, ViewMeta>;

export type ViewId = keyof typeof VIEWS;