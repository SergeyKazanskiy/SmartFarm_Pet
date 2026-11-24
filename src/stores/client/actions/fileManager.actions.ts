import { fileManagerApi } from '@/api/site/file-manager.api'
import { useClientData } from '@/stores/client/useClientData'
import { useClientState } from '@/stores/client/useClientState'
import { buildTree } from '@/utils/file-manager/build-tree'
import { getDisciplineOptions } from '@/utils/file-manager/get-discipline-options'
import type { TreeItem } from '@/types/file-manager'


let fileRequestVersion = 0

const categoryKey = (projectId: string, categoryId: string) =>
  `${projectId}:${categoryId}`

const scopeKey = (projectId: string, categoryId: string, discipline: string) =>
  `${projectId}:${categoryId}:${discipline}`

function getCurrentContext() {
  const state = useClientState.getState()
  const projectId = state.project_selected
  if (!projectId) return null

  const categoryId = state.category_selectedByProject[projectId]
  if (!categoryId) return null

  const discipline = state.discipline_selectedByCategory[
    categoryKey(projectId, categoryId)
  ]
  if (!discipline) return null

  return { projectId, categoryId, discipline }
}

function findFile(items: TreeItem[], fileId: string): boolean {
  for (const item of items) {
    if (item.type === 'file' && item.id === fileId) return true
    if (item.children && findFile(item.children, fileId)) return true
  }
  return false
}

function rebuildTree() {
  const context = getCurrentContext()
  if (!context) {
    useClientData.getState().setTreeItems([])
    useClientData.getState().setDisciplineOptions([])
    return
  }

  const workspace = useClientData.getState().workspacesByProject[context.projectId]
  if (!workspace) return

  const options = getDisciplineOptions(
    workspace.folders,
    workspace.disciplines,
    context.categoryId,
  )
  useClientData.getState().setDisciplineOptions(options)

  const tree = buildTree(
    workspace.categories,
    workspace.folders,
    workspace.disciplines,
    workspace.files,
    context.categoryId,
    context.discipline,
  )
  useClientData.getState().setTreeItems(tree)
}

async function restoreSelectedFile() {
  const context = getCurrentContext()
  const data = useClientData.getState()
  if (!context) {
    data.setCurrentFileModel(null)
    return
  }

  const key = scopeKey(context.projectId, context.categoryId, context.discipline)
  const fileId = useClientState.getState().file_selectedByDiscipline[key]

  if (!fileId || !findFile(data.tree_items, fileId)) {
    ++fileRequestVersion
    data.setCurrentFileModel(null)
    data.setLoading('isFileLoading', false)
    return
  }

  await actions.file_loadModel(fileId)
}

export const actions = {
  async projects_load() {
    const data = useClientData.getState()
    data.setLoading('isProjectsLoading', true)
    try {
      data.setProjects(await fileManagerApi.getProjects())
    } finally {
      useClientData.getState().setLoading('isProjectsLoading', false)
    }
  },

  async project_select(projectId: string) {
    const state = useClientState.getState()
    const data = useClientData.getState()

    state.setProjectSelectedId(projectId)
    data.setCurrentFileModel(null)
    data.setTreeItems([])
    data.setDisciplineOptions([])

    let workspace = data.workspacesByProject[projectId]
    if (!workspace) {
      data.setLoading('isProjectLoading', true)
      try {
        workspace = await fileManagerApi.getProjectWorkspace(projectId)
        useClientData.getState().setWorkspace(projectId, workspace)
      } finally {
        useClientData.getState().setLoading('isProjectLoading', false)
      }
    }

    // Игнорируем ответ, если пользователь успел выбрать другой проект.
    if (useClientState.getState().project_selected !== projectId) return

    const currentState = useClientState.getState()
    const categoryId = currentState.category_selectedByProject[projectId] ?? workspace.categories[0]?.id

    if (!categoryId) {
      useClientData.getState().setTreeItems([])
      useClientData.getState().setDisciplineOptions([])
      return
    }

    useClientState.setState((s) => ({
      category_selectedByProject: {
        ...s.category_selectedByProject,
        [projectId]: categoryId,
      },
    }))

    const options = getDisciplineOptions(
      workspace.folders, workspace.disciplines, categoryId
    )
    const key = categoryKey(projectId, categoryId)
    const savedDiscipline =
      useClientState.getState().discipline_selectedByCategory[key]
    const discipline =
      options.find((item) => item.code === savedDiscipline)?.code ??
      options[0]?.code

    if (!discipline) {
      useClientData.getState().setDisciplineOptions([])
      useClientData.getState().setTreeItems([])
      useClientData.getState().setCurrentFileModel(null)
      return
    }

    useClientState.setState((s) => ({
      discipline_selectedByCategory: {
        ...s.discipline_selectedByCategory,
        [key]: discipline,
      },
    }))

    rebuildTree()
    await restoreSelectedFile()
  },

  async category_setActive(categoryId: string) {
    const context = getCurrentContext()
    if (!context) return

    useClientState.setState((s) => ({
      category_selectedByProject: {
        ...s.category_selectedByProject,
        [context.projectId]: categoryId,
      },
    }))

    const workspace =
      useClientData.getState().workspacesByProject[context.projectId]
    if (!workspace) return

    const options = getDisciplineOptions(
      workspace.folders, workspace.disciplines, categoryId
    )
    const key = categoryKey(context.projectId, categoryId)
    const saved = useClientState.getState().discipline_selectedByCategory[key]
    const discipline = options.find((x) => x.code === saved)?.code ?? options[0]?.code

    if (!discipline) {
      useClientData.getState().setDisciplineOptions([])
      useClientData.getState().setTreeItems([])
      useClientData.getState().setCurrentFileModel(null)
      return
    }

    useClientState.setState((s) => ({
      discipline_selectedByCategory: {
        ...s.discipline_selectedByCategory,
        [key]: discipline,
      },
    }))

    rebuildTree()
    await restoreSelectedFile()
  },

  async discipline_setActive(discipline: string) {
    const context = getCurrentContext()
    if (!context) return

    const workspace =
      useClientData.getState().workspacesByProject[context.projectId]
    const valid = workspace && getDisciplineOptions(
      workspace.folders, workspace.disciplines, context.categoryId
    ).some((item) => item.code === discipline)
    if (!valid) return

    const key = categoryKey(context.projectId, context.categoryId)
    useClientState.setState((s) => ({
      discipline_selectedByCategory: {
        ...s.discipline_selectedByCategory,
        [key]: discipline,
      },
    }))

    rebuildTree()
    await restoreSelectedFile()
  },

  async file_setActive(fileId: string) {
    const context = getCurrentContext()
    if (!context) return

    const key = scopeKey(context.projectId, context.categoryId, context.discipline)
    useClientState.setState((s) => ({
      file_selectedByDiscipline: {
        ...s.file_selectedByDiscipline,
        [key]: fileId,
      },
      manager_isActive: true,
    }))

    await actions.file_loadModel(fileId)
  },

  async file_loadModel(fileId: string) {
    const version = ++fileRequestVersion
    const data = useClientData.getState()
    data.setLoading('isFileLoading', true)

    try {
      const model = await fileManagerApi.getFileModel(fileId)
      if (version !== fileRequestVersion) return

      const context = getCurrentContext()
      if (!context) return
      const key = scopeKey(context.projectId, context.categoryId, context.discipline)
      const selectedId =
        useClientState.getState().file_selectedByDiscipline[key]

      if (selectedId !== fileId) return
      useClientData.getState().setCurrentFileModel(model)
    } finally {
      if (version === fileRequestVersion) {
        useClientData.getState().setLoading('isFileLoading', false)
      }
    }
  },

  folder_toggle(folderId: string) {
    const context = getCurrentContext()
    if (!context) return
    const key = scopeKey(context.projectId, context.categoryId, context.discipline)

    useClientState.setState((s) => {
      const current = s.folder_expandedByScope[key] ?? []
      const next = current.includes(folderId)
        ? current.filter((id) => id !== folderId)
        : [...current, folderId]

      return {
        folder_expandedByScope: {
          ...s.folder_expandedByScope,
          [key]: next,
        },
      }
    })
  },

  aside_toggle() {
    useClientState.setState((s) => ({ aside_isOpen: !s.aside_isOpen }))
  },
}
