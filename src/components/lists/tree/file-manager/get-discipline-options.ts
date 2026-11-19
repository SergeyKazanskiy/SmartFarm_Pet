import type { Discipline, Folder, DisciplineOption } from '@/types/file-manager'

// Собирает уникальные дисциплины категории.
// Одинаковые code из разных папок превращаются в одну кнопку IconsBar.
export function getDisciplineOptions(
  folders: Folder[],
  disciplines: Discipline[],
  categoryId: string,
): DisciplineOption[] {
  const categoryFolderIds = new Set(
    folders.filter(x => x.category_id === categoryId).map(x => x.id)
  )

  const unique = new Map<string, DisciplineOption>()

  for (const item of disciplines) {
    if (!categoryFolderIds.has(item.folder_id)) continue
    if (!unique.has(item.code)) {
      unique.set(item.code, {
        code: item.code,
        title: item.title,
        icon: item.icon,
      })
    }
  }

  return [...unique.values()].sort((a, b) => a.code.localeCompare(b.code, 'ru'))
}
