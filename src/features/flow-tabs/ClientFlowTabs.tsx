'use client';

import { usePathname } from 'next/navigation';
import { FLOW_META, FLOW_SLUGS, type FlowSlug } from '@/settings/flows-config/CLIENT_FLOWS';
import { FlowTabs, type FlowTabItem } from '@/components/lists/tabs/FlowTabs'; // путь к вашему компоненту

/*
	Компонент вкладок этапов проекта для клиента.
	Использует FlowTabs для отображения вкладок и определения активного этапа.
*/

type ClientFlowTabsProps = {
    label?: string;
    className?: string
    onClick: (id: FlowSlug) => void
};

function isActiveFlow(pathname: string, slug: FlowSlug): boolean {
  return pathname === `/client/${slug}` || pathname.startsWith(`/client/${slug}/`);
}

export function ClientFlowTabs({ label, onClick, className }: ClientFlowTabsProps) {
  const pathname = usePathname();
  const activeSlug = FLOW_SLUGS.find((s) => isActiveFlow(pathname, s)) ?? null;

  const items: FlowTabItem[] = FLOW_SLUGS.map((slug) => ({
    id: slug,
    name: FLOW_META[slug].label,
    href: `/client/${slug}`,
  }));

  return (
    <FlowTabs
      label={label}
      items={items}
      selectedId={activeSlug}
      className={className}
      onClick={(id) => onClick(id as FlowSlug)}
    />
  );
}
