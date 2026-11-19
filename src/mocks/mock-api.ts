import type { FileModel, ProjectWorkspace } from '@/types/file-manager'
import { mockCategories } from './categories.mock'
import { mockDisciplines } from './disciplines.mock'
import { mockFiles } from './files.mock'
import { mockFileModels } from './file-models.mock'
import { mockFolders } from './folders.mock'
import { mockProjects } from './projects.mock'

// Имитирует API. Здесь нет Supabase: позднее функции можно заменить реальными запросами.
export const mockApi = {
  async getProjects() {
    return mockProjects
  },

  async getProjectWorkspace(projectId: string): Promise<ProjectWorkspace> {
    const categories = mockCategories.filter(x => x.project_id === projectId)
    const categoryIds = new Set(categories.map(x => x.id))
    const folders = mockFolders.filter(x => categoryIds.has(x.category_id))
    const folderIds = new Set(folders.map(x => x.id))

    const disciplines = mockDisciplines.filter(x => folderIds.has(x.folder_id))
    const disciplineIds = new Set(disciplines.map(x => x.id))
    const files = mockFiles.filter(
      x => folderIds.has(x.folder_id) && disciplineIds.has(x.discipline_id)
    )

    return { categories, folders, disciplines, files }
  },

  async getFileModel(fileId: string): Promise<FileModel> {
    const model = mockFileModels[fileId]
    if (!model) {
      return { fileId, nodes: [], edges: [] }
    }
    return model
  },
}
