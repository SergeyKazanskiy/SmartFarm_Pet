'use client'

import React, { useState, useRef, useEffect } from 'react';
import { SelectItem } from '@/types/file-manager';

/*
* Компонент выпадающего списка с возможностью выбора элемента и сигналом создания нового.
*/

interface Props {
	label?: string;
  width?: string
  items: SelectItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  placeholder?: string;
}

export const DropdownSelect: React.FC<Props> = ({
	width = '200px',
  items,
  selectedId,
  onSelect,
  onCreate,
  placeholder = 'Выберите значение...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const item = items.find((item) => item.id === selectedId) ?? null

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: SelectItem) => {
    onSelect(item.id);
    setIsOpen(false);
  };

  const handleCreateClick = () => {
    setIsOpen(false);
    onCreate();
  };

  return (
    <div ref={containerRef} className="relative w-72 font-sans select-none" style={{ width }}>
      {/* Утопленное поле выбора */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
        className="flex items-center justify-between w-full h-11 pl-3.5 pr-1.5 rounded-lg cursor-pointer
                   bg-slate-100/90 border border-slate-300/80 border-t-slate-400/70
                   shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]
                   hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      >
        <span className={`truncate text-sm ${item ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
          {item ? item.name : placeholder}
        </span>

        {/* Объемная кнопка со стрелочкой */}
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-all duration-150
                      bg-gradient-to-b from-white to-slate-100
                      border border-slate-300 border-b-slate-400
                      shadow-[0_2px_3px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]
                      ${isOpen ? 'translate-y-[1px] shadow-[0_1px_1px_rgba(0,0,0,0.1)] from-slate-100 to-slate-200' : ''}`}
        >
          <svg
            className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      {/* Выпадающий список */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1.5 bg-white border border-slate-200 rounded-lg
                     shadow-xl overflow-hidden"
        >
          {/* 16 элементов * 36px (h-9) = 576px. Свыше 16 элементов появляется скролл */}
          <ul role="listbox" className="max-h-[576px] overflow-y-auto divide-y divide-slate-50">
            {items.length > 0 ? (
              items.map((item) => {
                const isSelected = selectedId === item.id;
                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleItemClick(item)}
                    className={`h-9 px-3.5 text-sm cursor-pointer flex items-center justify-between transition-colors
                                ${
                                  isSelected
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-slate-700 hover:bg-slate-100'
                                }`}
                  >
                    <span className="truncate">{item.name}</span>
                    {isSelected && (
                      <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </li>
                );
              })
            ) : (
              <li className="h-10 px-3.5 text-sm text-slate-400 flex items-center justify-center">
                Список пуст
              </li>
            )}
          </ul>

          {/* Закрепленная кнопка "Создать" */}
          <div className="p-1.5 bg-slate-50 border-t border-slate-200">
            <button
              type="button"
              onClick={handleCreateClick}
              className="flex items-center justify-center gap-1.5 w-full py-2 px-3 text-sm font-medium
                         text-blue-600 bg-white hover:bg-blue-50 active:bg-blue-100
                         border border-blue-200 rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Создать
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
