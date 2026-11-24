// Сейчас используется mockApi. При подключении Supabase замените реализации
// этих методов, сохранив их сигнатуры. Компоненты и actions менять не придётся.
import { mockApi } from '@/mocks/mock-api'
import type { FileModel, Project, ProjectWorkspace } from '@/types/file-manager'

export const fileManagerApi = {
  getProjects(): Promise<Project[]> {
    return mockApi.getProjects()
  },

  getProjectWorkspace(projectId: string): Promise<ProjectWorkspace> {
    return mockApi.getProjectWorkspace(projectId)
  },

  getFileModel(fileId: string): Promise<FileModel> {
    return mockApi.getFileModel(fileId)
  },
}
