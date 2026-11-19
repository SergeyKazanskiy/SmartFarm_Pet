import { ClientStore } from './useClientStore'

export const selectFolders = (state: ClientStore) => state.folders
export const selectActiveFolderId = (state: ClientStore) => state.activeFolderId

// Сложный селектор для файлов
export const selectFilesByFolderId = (state: ClientStore) => {
  if (!state.activeFolderId) return []
  return state.files.filter(file => file.folder_id === state.activeFolderId)
}
