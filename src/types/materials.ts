// src/types/materials.ts
//
// Реестр материалов. Материал = «что видно в покое»: фон, бордер, тень,
// backdrop. Все значения — CSS-переменные с масштабированием по
// --intensity-scale (см. materials.css).
//
// crystal отложен: требует SCSS-миксинов (фасеты через clip-path),
// не укладывается в вариант B. TODO: отдельная итерация.

/** Семейства для Container / Surface / Plate — без crystal. */
export type ContainerFamily = "metal" | "stone" | "wood" | "glass";

/** Семейства для интерактивных элементов (Button). */
export type InteractiveFamily = ContainerFamily | "crystal";

/** Общий — для реестра и настроек. */
export type MaterialFamily = InteractiveFamily;

/** Маппинг: семейство → выбранный вариант. Заполняется пользователем. */
export type MaterialFamilyVariants = Record<MaterialFamily, MaterialId>;

/** Дефолтные варианты (до первого выбора пользователя). */
export const DEFAULT_MATERIAL_VARIANTS: MaterialFamilyVariants = {
    metal: "metal-gold",
    stone: "stone-marble",
    wood: "wood-brown",
    glass: "glass-frosted",
    crystal: "crystal-sapphire",
  };
  
/** Специальный маркер «материал не задан» — нейтральный фон темы. */
export const NO_MATERIAL = "none" as const;
export type NoMaterial = typeof NO_MATERIAL;

export type MaterialId =
  | "metal-gold" | "metal-silver" | "metal-platinum" | "metal-copper" | "metal-bronze"
  | "stone-granite" | "stone-marble" | "stone-porcelain"
  | "wood-light-green" | "wood-green" | "wood-light-brown" | "wood-brown" | "wood-dark-brown"
  | "glass-frosted" | "glass-clear" | "glass-tinted"
  | "crystal-ruby" | "crystal-sapphire" | "crystal-emerald";


export interface MaterialEntry {
  id: MaterialId;
  family: MaterialFamily;
  labelKey: string;
}

export interface MaterialFamilyEntry {
  id: MaterialFamily;
  labelKey: string;
}

export const MATERIAL_FAMILIES: MaterialFamilyEntry[] = [
  { id: "metal",   labelKey: "materials.families.metal"   },
  { id: "stone",   labelKey: "materials.families.stone"   },
  { id: "wood",    labelKey: "materials.families.wood"    },
  { id: "glass",   labelKey: "materials.families.glass"   },
  { id: "crystal", labelKey: "materials.families.crystal" },
];

export const MATERIALS: MaterialEntry[] = [
  { id: "metal-gold",     family: "metal", labelKey: "materials.metal.gold" },
  { id: "metal-silver",   family: "metal", labelKey: "materials.metal.silver" },
  { id: "metal-platinum", family: "metal", labelKey: "materials.metal.platinum" },
  { id: "metal-copper",   family: "metal", labelKey: "materials.metal.copper" },
  { id: "metal-bronze",   family: "metal", labelKey: "materials.metal.bronze" },

  { id: "stone-granite",   family: "stone", labelKey: "materials.stone.granite" },
  { id: "stone-marble",    family: "stone", labelKey: "materials.stone.marble" },
  { id: "stone-porcelain", family: "stone", labelKey: "materials.stone.porcelain" },

  { id: "wood-light-green", family: "wood", labelKey: "materials.wood.lightGreen" },
  { id: "wood-green",       family: "wood", labelKey: "materials.wood.green" },
  { id: "wood-light-brown", family: "wood", labelKey: "materials.wood.lightBrown" },
  { id: "wood-brown",       family: "wood", labelKey: "materials.wood.brown" },
  { id: "wood-dark-brown",  family: "wood", labelKey: "materials.wood.darkBrown" },

  { id: "glass-frosted", family: "glass", labelKey: "materials.glass.frosted" },
  { id: "glass-clear",   family: "glass", labelKey: "materials.glass.clear" },
  { id: "glass-tinted",  family: "glass", labelKey: "materials.glass.tinted" },

  { id: "crystal-ruby",     family: "crystal", labelKey: "materials.crystal.ruby" },
  { id: "crystal-sapphire", family: "crystal", labelKey: "materials.crystal.sapphire" },
  { id: "crystal-emerald",  family: "crystal", labelKey: "materials.crystal.emerald" },
];

export const MATERIAL_IDS = MATERIALS.map((m) => m.id);

/** Хелпер: кристаллический ли материал (требует .surface-crystal). */
export function isCrystalMaterial(id: MaterialId): boolean {
  return id.startsWith("crystal-");
}
