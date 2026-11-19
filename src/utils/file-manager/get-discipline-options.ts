import type {
  Discipline, DisciplineOption, Folder,
} from '@/types/file-manager'

export function getDisciplineOptions(
  folders: Folder[],
  disciplines: Discipline[],
  categoryId: string,
): DisciplineOption[] {
  const folderIds = new Set(
    folders.filter((folder) => folder.category_id === categoryId).map((folder) => folder.id)
  )

  const unique = new Map<string, DisciplineOption>()

  for (const discipline of disciplines) {
    if (!folderIds.has(discipline.folder_id)) continue
    if (!unique.has(discipline.code)) {
      unique.set(discipline.code, {
        code: discipline.code,
        title: discipline.title,
        icon: discipline.icon,
      })
    }
  }

  return [...unique.values()].sort((a, b) => a.code.localeCompare(b.code, 'ru'))
}
