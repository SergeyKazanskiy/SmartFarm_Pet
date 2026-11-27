'use client'

import type { ReactNode } from 'react'

export interface ActionItem {
  id: string
  label: string
  icon?: ReactNode
  disabled?: boolean
}

export interface ActionsViewProps {
  label?: string;
  className?: string
  title?: string
  items: ActionItem[]
  onAction: (id: string) => void
  emptyText?: string
}

export function ActionsView({
  className = '',
  title = 'Действия',
  items,
  onAction,
  emptyText = 'Нет доступных действий',
}: ActionsViewProps) {
  return (
    <section className={`flex min-h-0 flex-col overflow-hidden ${className}`}>
      <header className="flex h-8 shrink-0 items-center px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </header>
      <div className="min-h-0 flex-1 overflow-auto p-2">
        {items.length === 0 ? (
          <p className="p-1 text-sm text-gray-400">{emptyText}</p>
        ) : (
          <ul className="space-y-1">
            {items.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  disabled={a.disabled}
                  onClick={() => onAction(a.id)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {a.icon && <span className="shrink-0">{a.icon}</span>}
                  <span className="truncate">{a.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

/*
// src/components/lists/actions/ActionsPanel.tsx
"use client";

import { Panel } from "@/components/ui/Panel/Panel";
import { IconButton } from "@/components/icons/icon-button";
import type { ActionItem } from "@/stores/client/useClientData";

interface ActionsPanelProps {
  className?: string;
  items: ActionItem[];
  onAction: (id: string) => void;
}

export function ActionsPanel({ className, items, onAction }: ActionsPanelProps) {
  return (
    <Panel
      title="Действия"
      materialOverride="glass-frosted"
      relief="raised"
      className={className}
    >
      {items.length === 0 ? (
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Нет доступных действий
        </p>
      ) : (
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onAction(item.id)}
              className="flex items-center gap-2 rounded px-2 py-1 text-left text-sm hover:bg-[var(--color-muted)]"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </Panel>
  );
}*/