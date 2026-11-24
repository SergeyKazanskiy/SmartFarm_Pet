"use client";

import { useTranslations } from "@/locales";
import type { FlowId } from "@/settings/flows";
import type { ViewId } from "@/settings/views";

interface ViewStubProps {
  flow: FlowId;
  view: ViewId;
}

export function ViewStub({ flow, view }: ViewStubProps) {
  const t = useTranslations();

  return (
    <div className="flex h-full flex-col items-start gap-2 p-6">
      <h1 className="text-lg font-medium">
        {t.flows[flow]} — {t.views[view]}
      </h1>
      <p className="text-sm text-muted-foreground">
        Заглушка представления
      </p>
    </div>
  );
}