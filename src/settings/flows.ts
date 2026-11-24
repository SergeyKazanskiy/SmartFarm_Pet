export const FLOW_IDS = [ "initial", "design", "production", "delivery", "installation", "launch", "management" ] as const;
  
export type FlowId = (typeof FLOW_IDS)[number];