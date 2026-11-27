/*
Эта карта содержит набор иконок, которые могут быть использованы в качестве логотипа в центре шапки сайта.
Каждая иконка представлена в виде строки с соответствующим символом.
*/  

export const LOGO_ICONS = {
    sprout: "🌱",
    sunflower: "🌻",
    wheat: "🌾",
    leaf: "🌿",
    tree: "🌳",
    evergreen: "🌲",
    plant: "🪴",
    tractor: "🚜",
    gear: "⚙️",
    factory: "🏭",
    earth: "🌍",
    water: "💧",
  } as const;
  
  export type LogoIcon = keyof typeof LOGO_ICONS;