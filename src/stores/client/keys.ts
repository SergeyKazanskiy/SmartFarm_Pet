// Внутренние хелперы для построения ключей per-scope Record.
// Используются ТОЛЬКО в actions/. Компоненты и хуки не должны их импортировать —
// они работают с проекциями (category_activeId и т.д.).

/** Ключ для пар project+category: используется в discipline_selectedByCategory. */
export const categoryKey = (projectId: string, categoryId: string) =>
  `${projectId}:${categoryId}`;

/** Ключ для тройки project+category+discipline: используется в file_selectedByDiscipline, folder_expandedByScope, view_selectedByScope. */
export const scopeKey = (projectId: string, categoryId: string, discipline: string) =>
  `${projectId}:${categoryId}:${discipline}`;