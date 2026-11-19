import type {
  Category, Discipline, FileRecord, Folder, TreeItem
} from '@/types/file-manager'

// Фильтр по categoryId + disciplineCode.
// В дерево попадают только папки с подходящими файлами и все их родители.
export function buildTree(
  categories: Category[],
  folders: Folder[],
  disciplines: Discipline[],
  files: FileRecord[],
  categoryId: string,
  disciplineCode: string,
): TreeItem[] {
  const categoryExists = categories.some(x => x.id === categoryId)
  if (!categoryExists) return []

  const categoryFolders = folders.filter(x => x.category_id === categoryId)
  const folderById = new Map(categoryFolders.map(x => [x.id, x]))
  const disciplineById = new Map(disciplines.map(x => [x.id, x]))

  const matchingFiles = files.filter(file => {
    if (!folderById.has(file.folder_id)) return false
    return disciplineById.get(file.discipline_id)?.code === disciplineCode
  })

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
    const list = filesByFolder.get(file.folder_id) ?? []
    list.push(file)
    filesByFolder.set(file.folder_id, list)
  }

  const foldersByParent = new Map<string | null, Folder[]>()
  for (const folder of categoryFolders) {
    const parentId =
      folder.parent_id && folderById.has(folder.parent_id)
        ? folder.parent_id
        : null
    const list = foldersByParent.get(parentId) ?? []
    list.push(folder)
    foldersByParent.set(parentId, list)
  }

  const build = (parentId: string | null): TreeItem[] => {
    const childFolders = foldersByParent.get(parentId) ?? []

    return childFolders
      .filter(folder => visibleFolderIds.has(folder.id))
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(folder => {
        const childItems: TreeItem[] = [
          ...build(folder.id),
          ...(filesByFolder.get(folder.id) ?? []).map(file => ({
            id: file.id,
            parentId: folder.id,
            type: 'file' as const,
            title: file.title,
            status: file.status,
          })),
        ]

        return {
          id: folder.id,
          parentId: folder.parent_id,
          type: 'folder' as const,
          title: folder.title,
          children: childItems,
        }
      })
  }

  return build(null)
}
