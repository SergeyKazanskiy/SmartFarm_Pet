import { StateCreator } from 'zustand'
import { ClientStore } from '../useClientStore'


export interface ActionsSlice {
  actions: {
    setActiveFolder: (id: string) => Promise<void>
    setDriveData: (folders: any[], files: any[]) => void
    setActiveFileForCurrentFolder: (fileId: string | null) => Promise<void>
    fetchFileContent: (folderId: string | null, fileId: string | null) => Promise<void>
  }
}

export const createActionsSlice: StateCreator<ClientStore, [], [], ActionsSlice> = (set, get) => ({
  actions: {
    setDriveData: (folders, files) => set((store) => ({
      data: { ...store.data, folders, files }
    })),

    // Метод для установки активной папки и загрузки соответствующего файла
    setActiveFolder: async (folderId) => {
      set((store) => ({
        state: { ...store.state, activeFolderId: folderId }
      })) 

      const previousFileId = get().state.activeFileByFolder[folderId] || null
      await get().actions.fetchFileContent(folderId, previousFileId) 
    },
    
    // Метод для установки активного файла для текущей папки и загрузки его содержимого
    setActiveFileForCurrentFolder: async (fileId) => {
      const { activeFolderId, activeFileByFolder } = get()
      if (!activeFolderId) return
  
      set({
        activeFileByFolder: { ...activeFileByFolder, [activeFolderId]: fileId }
      })
      await get().actions.fetchFileContent(activeFolderId, fileId)
    },
  
    // Метод для загрузки содержимого файла
    fetchFileContent: async (folderId, fileId) => {
      if (!folderId || !fileId) {
        set((store) => ({
          data: { ...store.data, fileContent: 'Файл не выбран' },
          state: { ...store.state, isFileLoading: false, fileError: null }
        }))
        return
      }
      set({ isFileLoading: true, fileError: null })
      try {
        const mockData = await new Promise<string>((res) => 
          setTimeout(() => res(`Контент файла ${fileId}`), 600)
        )
        // Обновляем данные в DataSlice и состояние загрузки в StateSlice одновременно!
        set({ fileContent: mockData, isFileLoading: false })
      } catch (error) {
        set({ fileError: 'Ошибка', isFileLoading: false, fileContent: null })
      }
    }
  }
})
