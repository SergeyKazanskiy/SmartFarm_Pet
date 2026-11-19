import type {
  Category, Discipline, FileRecord, Folder, TreeItem,
} from '@/types/file-manager'

export function buildTree(
  categories: Category[],
  folders: Folder[],
  disciplines: Discipline[],
  files: FileRecord[],
  categoryId: string,
  disciplineCode: string,
): TreeItem[] {
  if (!categories.some((item) => item.id === categoryId)) return []

  const categoryFolders = folders.filter((item) => item.category_id === categoryId)
  const folderById = new Map(categoryFolders.map((item) => [item.id, item]))
  const disciplineById = new Map(disciplines.map((item) => [item.id, item]))

  const matchingFiles = files.filter((file) =>
    folderById.has(file.folder_id) &&
    disciplineById.get(file.discipline_id)?.code === disciplineCode
  )

  // Включаем папки с подходящими файлами и всех их родителей.
  const visibleFolderIds = new Set<string>()

  for (const file of matchingFiles) {
    let currentId: string | null = file.folder_id
    const visited = new Set<string>()

    while (currentId && !visited.has(currentId)) {
      visited.add(currentId)
      const folder = folderById.get(currentId)
      if (!folder) break
      visibleFolderIds.add(currentId)
      currentId = folder.parent_id
    }
  }

  const filesByFolder = new Map<string, FileRecord[]>()
  for (const file of matchingFiles) {
    const items = filesByFolder.get(file.folder_id) ?? []
    items.push(file)
    filesByFolder.set(file.folder_id, items)
  }

  const foldersByParent = new Map<string | null, Folder[]>()
  for (const folder of categoryFolders) {
    const parentId = folder.parent_id && folderById.has(folder.parent_id)
      ? folder.parent_id
      : null
    const items = foldersByParent.get(parentId) ?? []
    items.push(folder)
    foldersByParent.set(parentId, items)
  }

  const build = (parentId: string | null): TreeItem[] =>
    (foldersByParent.get(parentId) ?? [])
      .filter((folder) => visibleFolderIds.has(folder.id))
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((folder) => ({
        id: folder.id,
        parentId: folder.parent_id,
        type: 'folder' as const,
        title: folder.title,
        children: [
          ...build(folder.id),
          ...(filesByFolder.get(folder.id) ?? []).map((file) => ({
            id: file.id,
            parentId: folder.id,
            type: 'file' as const,
            title: file.title,
            status: file.status,
          })),
        ],
      }))

  return build(null)
}
