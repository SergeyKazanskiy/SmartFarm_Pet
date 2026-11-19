"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAnimationLock } from "@/hooks/layouts/useAnimationLock";
import { AsideToggle } from "@/components/ui/buttons/AsideToggle";
import { SlidingTrack } from "@/components/layouts/SlidingTrack";
import { FlowViewport } from "@/components/layouts/FlowViewport";
import { SlidingDrawer } from "@/components/layouts/SlidingDrawer";
import { ProjectSelector } from "@/components/ui/fields/ProjectSelector";
import { FlowTabs } from "@/features/flow-tabs/FlowTabs";
import { IconsBar } from "@/components/lists/bars/IconsBar";
import { FileNavigator } from "@/features/file-navigator";
import { PropertiesView } from "@/components/lists/properties/PropertiesView";
import { ActionsView } from "@/components/lists/actions/ActionsView";
import { useClientState, useClientData } from "@/stores/client";
import { treeActions } from "@/stores/client/actions";



const ANIM = 300;

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  const left = useAnimationLock(ANIM);
  const right = useAnimationLock(ANIM);

  const state = useClientState(useShallow((s) => s));
  const data = useClientData(useShallow((s) => s));

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-3">
         <AsideToggle side="left" isOpen={leftOpen}
          onToggle={() => {
            if (left.locked) return;
            left.lock();
            setLeftOpen((v) => !v);
          }}
        />
        <ProjectSelector
          width="200px"
          items={data.project_items}
          selectedId={state.project_selectedId}
          onSelect={projectActions.project_select}
        />
        <FlowTabs className="min-w-0 flex-1 overflow-x-auto" />
        <IconsBar 
					items={data.mode_items}
          selectedId={state.mode_selectedId}
          onClick={modeActions.mode_setActive}
				/>
        <AsideToggle side="right" isOpen={leftOpen}
          onToggle={() => {
            if (right.locked) return;
            right.lock();
            setRightOpen((v) => !v);
          }}
        />
      </header>

      <section className="relative flex min-h-0 flex-1 overflow-hidden">
        <SlidingTrack leftOpen={leftOpen} duration={ANIM}>
          <aside className="h-full w-[var(--nav-w)] shrink-0 overflow-y-auto border-r border-border">
            <FileNavigator
              items={data.tree_items}
              selectedId={state.tree_selectedId}
              expandedIds={state.tree_expandedIds}
              onClick={treeActions.tree_setActive}
              onToggle={treeActions.tree_toggleFolder}
              isActive={state.tree_isActive}
            />
            {/* другие левые блоки */}
          </aside>

          <FlowViewport leftOpen={leftOpen} rightOpen={rightOpen} duration={ANIM}>
            {children}
          </FlowViewport>
        </SlidingTrack>

        <SlidingDrawer side="right" open={rightOpen} duration={ANIM}>
					<aside className="flex w-[200px] shrink-0 flex-col border-l border-gray-200">
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
        </SlidingDrawer>
      </section>
    </div>
  );
}