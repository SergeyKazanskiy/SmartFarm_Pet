type ClassValue = string | number | boolean | undefined | null | Record<string, any>;

/**
 * Простая утилита для объединения классов без сторонних библиотек.
 */
export function cn(...classes: ClassValue[]): string {
  const result: string[] = [];

  for (const cls of classes) {
    if (!cls) continue;

    if (typeof cls === "string" || typeof cls === "number") {
      result.push(cls.toString());
    } else if (Array.isArray(cls)) {
      const inner = cn(...cls);
      if (inner) result.push(inner);
    } else if (typeof cls === "object") {
      for (const key in cls) {
        if (cls[key]) {
          result.push(key);
        }
      }
    }
  }

  return result.join(" ");
}

/**
// Пример использования:
<div 
  className={cn(
    "flex items-center p-4 rounded-xl", // Базовые классы
    props.isActive ? "bg-cyan-500 text-white" : "bg-slate-800 text-slate-400", // Условие
    props.className // Пользовательские классы, переданные сверху
  )}
>
 */