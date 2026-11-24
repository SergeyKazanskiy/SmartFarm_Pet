"use client";

import { IconButton } from "@/components/icons/icon-button";
import type { IconName } from "@/components/icons/icon-paths";
import type { SelectItem } from "@/types/file-manager";

/*
  * Компонент панели с кнопками-иконками для выбора представления.
*/

export interface IconItem extends SelectItem {
  iconName: IconName;
}

interface Props {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  items: IconItem[];
  selectedId: string | null;
  onClick: (id: string) => void;
}

export function IconsBar({ label = "Представление", orientation = 'horizontal', items, selectedId, onClick }: Props) {
  const isVertical = orientation === 'vertical';

  return (
    <div
      role="toolbar"
      aria-label={label}
      aria-orientation={orientation}
      className={`inline-flex items-center gap-0.5 ${ isVertical ? 'flex-col' : 'flex-row' }`}
    >
      {items.map((item) => (
        <IconButton
          key={item.id}
          name={item.iconName}
          label={item.name}
          state={item.id === selectedId ? "active" : "inactive"}
          size={20}
          buttonSize={32}
          onClick={() => onClick(item.id)}
        />
      ))}
    </div>
  );
}