import type { StageKey } from "./stage-colors";


export interface SelectItem {
  id: string;
  name: string;
  tooltip?: string;
}

export interface StageItem {
  id: string;
  stage: StageKey;
}