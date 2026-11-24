export interface SelectItem {
  id: string;
  name: string;
}

export interface Project extends SelectItem {
  date: string;
}

// export type Project = {
//   id: string
//   title: string
// }

export type Category = {
  id: string
  project_id: string
  title: string
  sort_order: number
}

export type Folder = {
  id: string
  category_id: string
  parent_id: string | null
  title: string
  sort_order: number
}

export type Discipline = {
  id: string
  folder_id: string
  code: string
  title: string
  icon?: string
  sort_order: number
}

export type FileStatus = 'empty' | 'draft' | 'progress' | 'ready' | 'error'

export type FileRecord = {
  id: string
  folder_id: string
  discipline_id: string
  title: string
  status: FileStatus
  updated_at: string
}

export type TreeItem = {
  id: string
  parentId: string | null
  type: 'folder' | 'file'
  title: string
  status?: FileStatus
  children?: TreeItem[]
}

export type ProjectWorkspace = {
  categories: Category[]
  folders: Folder[]
  disciplines: Discipline[]
  files: FileRecord[]
}

export type NodeRecord = {
  id: string
  file_id: string
  type: string
  title: string
  data: Record<string, unknown>
  position: { x: number; y: number }
}

export type EdgeRecord = {
  id: string
  file_id: string
  source: string
  target: string
  type: string
  data?: Record<string, unknown>
}

export type FileModel = {
  fileId: string
  nodes: NodeRecord[]
  edges: EdgeRecord[]
}

export type DisciplineOption = {
  code: string
  title: string
  icon?: string
}
