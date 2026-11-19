"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { FLOW_META, FLOW_SLUGS, type FlowSlug } from "@/settings/flows/client-flow-meta";

type FlowTabsProps = { className?: string };

/** Активен ли этап: /client/<slug> или /client/<slug>/... */
function isActiveFlow(pathname: string, slug: FlowSlug): boolean {
  return pathname === `/client/${slug}` || pathname.startsWith(`/client/${slug}/`);
}

export function FlowTabs({ className }: FlowTabsProps) {
  const pathname = usePathname();
  const activeSlug = FLOW_SLUGS.find((s) => isActiveFlow(pathname, s));

  return (
    <nav aria-label="Этапы проекта" className={cn("flex items-center gap-1", className)}>
      {FLOW_SLUGS.map((slug) => {
        const isActive = slug === activeSlug;
        return (
          <Link
            key={slug}
            href={`/client/${slug}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
              "hover:bg-muted",
              isActive && "bg-primary text-primary-foreground hover:bg-primary",
            )}
          >
            {FLOW_META[slug].label}
          </Link>
        );
      })}
    </nav>
  );
}