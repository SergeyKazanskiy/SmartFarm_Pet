import { StateCreator } from 'zustand'
import { ClientStore } from '../useClientStore' // общий тип, создадим ниже

export interface StateSlice {
  state: {
    activeFolderId: string | null
    activeFileByFolder: Record<string, string | null>
    isFileLoading: boolean
    fileError: string | null
  }
}

// Используем StateCreator, чтобы Zustand понимал, что этот слайс будет частью большого стора
export const createStateSlice: StateCreator<ClientStore, [], [], StateSlice> = () => ({
  state: {
    activeFolderId: null,
    activeFileByFolder: {},
    isFileLoading: false,
    fileError: null,
  }
})
