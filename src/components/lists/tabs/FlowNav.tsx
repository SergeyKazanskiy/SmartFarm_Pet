import Link from 'next/link';
import { cn } from '@/utils/cn';
import { SelectItem } from '@/types/file-manager';

/*
	Компонент навигации по этапам проекта, который отображает горизонтальный список ссылок.
*/

export interface FlowNavItem extends SelectItem {
  href: string;
}

interface Props {
  label?: string;
  items: FlowNavItem[];
  selectedId: string | null;
  className?: string;
}

const FIRST_CLIP = 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)';
const NEXT_CLIP = 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%)';

export function FlowNav({ label, items, selectedId, className }: Props) {
  return (
    <nav aria-label={label} className={cn('flex items-center', className)}>
      {items.map((item, i) => {
        const isFirst = i === 0;
        const active = item.id === selectedId;

        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            style={{ clipPath: isFirst ? FIRST_CLIP : NEXT_CLIP }}
            className={cn(
              'relative inline-flex items-center h-8 whitespace-nowrap pr-4 text-xs font-medium transition-colors',
              isFirst ? 'pl-4 rounded-l-md' : 'pl-6 -ml-2',
              active
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
