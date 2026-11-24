import { cn } from '@/utils/cn';
import { SelectItem } from '@/types/file-manager';

/*
  * Компонент вкладок с возможностью выбора активной вкладки.
*/

interface Props {
  label?: string;
  items: SelectItem[];
  selectedId: string | null;
  onClick: (id: string) => void;
  className?: string;
}

const FIRST_CLIP = 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)';
const NEXT_CLIP = 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%)';

export function FlowTabs({ label, items, selectedId, onClick, className }: Props) {
  return (
    <div role="tablist" aria-label={label} className={cn('flex items-center', className)}>
      {items.map((item, i) => {
        const isFirst = i === 0;
        const active = item.id === selectedId;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onClick(item.id)}
            style={{ clipPath: isFirst ? FIRST_CLIP : NEXT_CLIP }}
            className={cn(
              'relative inline-flex items-center h-8 whitespace-nowrap pr-4 text-xs font-medium transition-colors cursor-pointer',
              isFirst ? 'pl-4 rounded-l-md' : 'pl-6 -ml-2',
              active
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
}
