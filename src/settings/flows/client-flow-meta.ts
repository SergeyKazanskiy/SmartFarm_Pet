// src/features/flow-views/flow-views-config.ts
// Без единого импорта компонентов — только описания.

export type FlowSlug = "initial" | "design" | "production" | "delivery" | "installation" | "launch" | "management";

export type ViewMeta = {
  id: string;
  label: string;
  icon: string;
};

export type FlowMeta = {
  slug: FlowSlug;
  label: string;
  defaultViewId: string;
  views: ViewMeta[];
};

export const FLOW_META: Record<FlowSlug, FlowMeta> = {
  initial: {
    slug: "initial",
    label: "Исходные",
    defaultViewId: "schema",
    views: [{ id: "schema", label: "Схема", icon: "grid" }],
  },
  design: {
    slug: "design",
    label: "Проектирование",
    defaultViewId: "schema",
    views: [
      { id: "schema", label: "Схема",   icon: "grid" },
      { id: "3d",     label: "3D",      icon: "cube" },
      { id: "list",   label: "Список",  icon: "list" },
    ],
  },
  production: {
    slug: "production",
    label: "Производство",
    defaultViewId: "kanban",
    views: [
      { id: "kanban", label: "Канбан", icon: "kanban" },
      { id: "gantt",  label: "Гант",   icon: "timeline" },
    ],
  },
	delivery: {
		slug: "delivery",
		label: "Доставка",
		defaultViewId: "list",
		views: [
			{ id: "list", label: "Список", icon: "list" }
		],
	},
	installation: {
		slug: "installation",
		label: "Монтаж",
		defaultViewId: "list",
		views: [
			{ id: "list", label: "Список", icon: "list" }
		],
	},
	launch: {
		slug: "launch",
		label: "Запуск",
		defaultViewId: "list",
		views: [
			{ id: "list", label: "Список", icon: "list" }
		],
	},
	management: {		
		slug: "management",
		label: "Управление",
		defaultViewId: "list",
		views: [
			{ id: "list", label: "Список", icon: "list" }
		],
	},
};

// Удобно иметь и массив (для FlowTabs/IconsBar), но можно и Object.values
export const FLOW_SLUGS = Object.keys(FLOW_META) as FlowSlug[];

// Единственный источник правды о этапах.

// export const FLOW_META = {
//     initial:      { label: "Исходные" },
//     design:       { label: "Проектирование" },
//     production:   { label: "Производство" },
//     delivery:     { label: "Доставка" },
//     installation: { label: "Монтаж" },
//     launch:       { label: "Запуск" },
//     management:   { label: "Управление" },
//   } as const;
  
//   export type FlowSlug = keyof typeof FLOW_META;
  
//   // Порядок ключей сохраняется → порядок вкладок = порядок пайплайна
//   export const FLOW_SLUGS = Object.keys(FLOW_META) as FlowSlug[];
  
   export const DEFAULT_FLOW: FlowSlug = "initial";