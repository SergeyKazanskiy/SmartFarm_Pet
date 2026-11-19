import { StateCreator } from 'zustand'
import { ClientStore } from '../useClientStore'

export interface Folder { id: string; name: string }
export interface FileItem { id: string; name: string; folder_id: string }

export interface DataSlice {
  data: {
    folders: Folder[]
    files: FileItem[]
    fileContent: string | null
  }
}

export const createDataSlice: StateCreator<ClientStore, [], [], DataSlice> = () => ({
  data: {
    folders: [],
    files: [],
    fileContent: null,
  }
})
