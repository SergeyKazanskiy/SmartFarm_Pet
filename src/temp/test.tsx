'use client'

import { useShallow } from 'zustand/react/shallow'

import { useClientState } from '@/store/useClientState'
import { useClientData } from '@/store/useClientData'
import {
  asideActions,
  projectActions,
  flowActions,
  modeActions,
  categoryActions,
  disciplineActions,
  treeActions,
  actionsActions,
} from '@/store/actions'

import { AsideToggle } from '@/components/AsideToggle'
import { ProjectSelector } from '@/components/ProjectSelector'
import { FlowTabs } from '@/components/FlowTabs'
import { ModeIcons } from '@/components/ModeIcons'
import { ButtonsBar } from '@/components/ButtonsBar'
import { IconsBar } from '@/components/IconsBar'
import { FileNavigator } from '@/components/FileNavigator'
import { PropertiesView } from '@/components/PropertiesView'
import { ActionsView } from '@/components/ActionsView'

export default function FileManagerPage() {
  const state = useClientState(useShallow((s) => s))
  const data = useClientData(useShallow((s) => s))

  return (
    <div className="flex h-full flex-col">
      {/* Верхняя строка */}
      <div className="flex h-10 items-center gap-2 px-2">
        <AsideToggle
          side="left"
          isOpen={state.aside_isOpen}
          onToggle={asideActions.aside_toggle}
        />

        <ProjectSelector
          width="200px"
          items={data.project_items}
          selectedId={state.project_selectedId}
          onSelect={projectActions.project_select}
        />

        <FlowTabs
          items={data.flow_items}
          selectedId={state.flow_selectedId}
          onClick={flowActions.flow_setActive}
        />

        {/* распорка: прижимает ModeIcons и правую кнопку к краю */}
        <div className="flex-1" />

        <ModeIcons
          items={data.mode_items}
          selectedId={state.mode_selectedId}
          onClick={modeActions.mode_setActive}
        />

        <AsideToggle
          side="right"
          isOpen={state.rightAside_isOpen}
          onToggle={asideActions.rightAside_toggle}
        />
      </div>

      {/* Рабочая область */}
      <div className="flex min-h-0 flex-1">
        {/* Левый aside */}
        {state.aside_isOpen && (
          <aside className="flex shrink-0 border-r border-gray-200">
            {/* Узкая панель */}
            <div className="flex w-12 flex-col border-r border-gray-200">
              <ButtonsBar
                items={data.category_items}
                selectedId={state.category_selectedId}
                onClick={categoryActions.category_setActive}
              />
              <div className="flex-1" />
              <IconsBar
                items={data.discipline_items}
                selectedId={state.discipline_selectedId}
                onClick={disciplineActions.discipline_setActive}
              />
            </div>

            {/* Дерево */}
            <FileNavigator
              width="200px"
              items={data.tree_items}
              selectedId={state.tree_selectedId}
              expandedIds={state.tree_expandedIds}
              onClick={treeActions.tree_setActive}
              onToggle={treeActions.tree_toggleFolder}
              isActive={state.tree_isActive}
            />
          </aside>
        )}

        {/* Центр */}
        <main className="min-w-0 flex-1 overflow-auto">
          {/* содержимое выбранной папки / файла */}
        </main>

        {/* Правый aside, 200px, прижат к правому краю */}
        {state.rightAside_isOpen && (
          <aside className="flex w-[200px] shrink-0 flex-col border-l border-gray-200">
            {/* соотношение высот 3 : 2 */}
            <PropertiesView
              className="flex-[3] border-b border-gray-200"
              rows={data.properties_rows}
            />
            <ActionsView
              className="flex-[2]"
              items={data.actions_items}
              onAction={actionsActions.actions_run}
            />
          </aside>
        )}
      </div>
    </div>
  )
}