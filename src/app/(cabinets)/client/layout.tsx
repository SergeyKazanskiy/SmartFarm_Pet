"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAnimationLock } from "@/hooks/layouts/useAnimationLock";
import { AsideToggle } from "@/components/ui/buttons/AsideToggle";
import { SlidingTrack } from "@/components/layouts/SlidingTrack";
import { FlowViewport } from "@/components/layouts/FlowViewport";
import { SlidingDrawer } from "@/components/layouts/SlidingDrawer";
import { DropdownSelect } from "@/components/lists/dropdowns/DropdownSelect";
import { IconsBar } from "@/components/lists/bars/IconsBar";
import { FileNavigator } from "@/components/lists/tree/FileNavigator";
import { PropertiesView } from "@/components/lists/properties/PropertiesView";
import { ActionsView } from "@/components/lists/actions/ActionsView";
import { useClientState } from "@/stores/client/useClientState";
import { useClientData } from "@/stores/client/useClientData";
import { actions } from "@/stores/client/actions/fileManager.actions";
import { ButtonsBar } from '@/components/lists/bars/ButtonsBar';
import { useClientViews, useFlowItems, useViewItems } from "@/stores/client/useClientViews";
import { FlowTabs } from '@/components/lists/tabs/FlowTabs';

const ANIM = 300;

export default function ClientLayout({ children }: { children: React.ReactNode }) {
	// Side-панели — локальное UI-состояние
	const [leftOpen, setLeftOpen] = useState(true);
	const [rightOpen, setRightOpen] = useState(true);
	const left = useAnimationLock(ANIM);
	const right = useAnimationLock(ANIM);

	// Сторы
	const state = useClientState(useShallow((s) => s));
	const data = useClientData(useShallow((s) => s));

	// Flow / View
	const flows = useFlowItems();
	const views = useViewItems();
	const flow_setActive = useClientViews((s) => s.flow_setActive);
	const view_setActive = useClientViews((s) => s.view_setActive);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">

			{/* Верхняя панель с навигацией по проекту, этапам и представлениям */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-3">
        <AsideToggle label="Скрытие навигатора" side="left" isOpen={leftOpen}
          onToggle={() => {
            if (left.locked) return;
            left.lock();
            setLeftOpen((v) => !v);
          }}
        />
        <DropdownSelect label="Выбор проекта" width="200px"
          items={data.project_items}
          selectedId={state.project_selected}
          onSelect={actions.project_select}
					onCreate={() => {}}
        />
				<FlowTabs label="Этапы проекта" className="min-w-0 flex-1 overflow-x-auto"
          items={flows.items}
          selectedId={flows.selectedId}
          onClick={flow_setActive}
        />
        <IconsBar label="Выбор представления" orientation="horizontal"
          items={views.items}
          selectedId={views.selectedId}
          onClick={view_setActive}
        />
        <AsideToggle label="Скрытие свойств" side="right" isOpen={rightOpen}
          onToggle={() => {
            if (right.locked) return;
            right.lock();
            setRightOpen((v) => !v);
          }}
        />
      </header>

			{/* Основная область с навигатором файлов, рабочей областью и панель со свойствами и действиями */}		
      <main className="relative flex min-h-0 flex-1 overflow-hidden">
        <SlidingTrack leftOpen={leftOpen} duration={ANIM}>
					<aside className="flex min-h-0 w-[var(--nav-w)] shrink-0">
						<nav className="flex w-12 min-h-0 shrink-0 flex-col border-r border-border">
              <ButtonsBar label="Выбор категории"
                items={data.category_items}
                selectedId={state.category_activeId}
                onClick={actions.category_setActive}
              />
              <IconsBar label="Выбор дисциплины" orientation="vertical"
                items={data.discipline_items}
                selectedId={state.discipline_activeId}
                onClick={actions.discipline_setActive}
              />
            </nav>
            <FileNavigator label="Навигатор файлов"
              items={data.tree_items}
              selectedId={state.tree_selectedId}
              expandedIds={state.tree_expandedIds}
							isActive={state.manager_isActive}
              onFileSelect={actions.file_setActive}
              onFolderToggle={actions.folder_toggle}
            />
          </aside>

          <FlowViewport leftOpen={leftOpen} rightOpen={rightOpen} duration={ANIM}>
            {children}
          </FlowViewport>
        </SlidingTrack>

        <SlidingDrawer side="right" open={rightOpen} duration={ANIM}>
					<aside className="flex min-h-0 w-[var(--props-w)] shrink-0 flex-col border-l border-border">
						<PropertiesView label="Свойства"
              className="flex-[3] min-h-0 overflow-y-auto border-b border-border"
              rows={data.properties_rows}
            />
            {/* <ActionsView label="Действия"
              className="flex-[2] min-h-0 overflow-y-auto"
              items={data.actions_items}
              onAction={actions.actions_run}
            /> */}
					</aside>
        </SlidingDrawer>
      </main>
    </div>
  );
}