/**
 * Перечень доступных семантических цветов из вашей дизайн-системы.
 * Обеспечивает строгую типизацию и автокомплит в коде.
 * 
 * Для SVG-редактора критически важно получать актуальные значения цветов в формате, который понимает спецификация SVG (например, rgb(r, g, b) или #hex), так как «сырые» CSS-переменные или значения вроде oklch(...) внутри атрибутов fill или stroke в SVG поддерживаются браузерами нестабильно (особенно при экспорте SVG в файл).
 * Так как используется TypeScript, ниже представлена строго типизированная утилита, которая считывает вычисленные (computed) значения цветов из DOM «на лету». Она автоматически учитывает текущую тему (светлую или темную) и любые изменения ползунков из Zustand.
 */
export type ThemeColorKey =
  | 'primary'
  | 'primary-foreground'
  | 'background'
  | 'foreground'
  | 'surface'
  | 'border'
  | 'icon-active'
  | 'icon-inactive';

/**
 * Опции для настройки возвращаемого формата цвета
 */
interface GetColorOptions {
  /** Если true, вернет значение в формате RGB "r, g, b". Полезно для SVG-фильтров или opacity */
  asRawRgb?: boolean;
}

/**
 * Функция считывает актуальный вычисленный цвет из DOM.
 * Работает "на лету", учитывая текущую тему (.dark) и динамические параметры OKLCH.
 * 
 * @param colorKey Семантическое имя цвета из дизайн-системы (например, 'primary')
 * @param options Настройки формата вывода
 * @returns Строка с цветом, готовая для вставки в SVG (например, "rgb(37, 99, 235)")
 */
export function getDomColor(colorKey: ThemeColorKey, options: GetColorOptions = {}): string {
  // Защита для Next.js (SSR). На сервере DOM нет, возвращаем пустую строку или дефолт
  if (typeof window === 'undefined') {
    return '';
  }

  const { asRawRgb = false } = options;

  if (asRawRgb) {
    // 1. Способ через ваши кастомные RGB переменные (идеально для JS-логики и SVG редактора)
    // Tailwind v4 маппит --color-primary-rgb в корневой элемент
    const rgbVarName = `--color-${colorKey}-rgb`;
    const rawRgb = getComputedStyle(document.documentElement)
      .getPropertyValue(rgbVarName)
      .trim();
    
    if (rawRgb) return rawRgb; // Вернет строку вида "37, 99, 235"
  }

  // 2. Универсальный способ: запрашиваем у браузера конечный вычисленный цвет.
  // Даже если в CSS написано oklch(...), браузер вернет строку "rgb(r, g, b)"
  const colorVarName = `--color-${colorKey}`;
  
  // Создаем временный элемент-шпион, чтобы вытащить цвет, скомпилированный Tailwind v4
  const spy = document.createElement('div');
  spy.style.color = `var(${colorVarName})`;
  spy.style.display = 'none';
  document.body.appendChild(spy);

  // Получаем финальный вычисленный стиль, который гарантированно будет в формате RGB
  const computedColor = getComputedStyle(spy).color;

  // Удаляем элемент за собой, чтобы не засорять DOM
  document.body.removeChild(spy);

  return computedColor; // Вернет строку вида "rgb(37, 99, 235)"
}

/**
 * Пример использования:
 * Браузер всегда будет отдавать валидный rgb(...), даже если пользователь прямо сейчас крутит ползунок насыщенности или меняет тему
  
'use client';

import React, { useEffect, useState } from 'react';
import { getDomColor } from '@/utils/getDomColor';
import { useThemeStore } from '@/stores/themeStore'; // ваш стор параметров

export function SvgCircleEditor() {
  // Подписываемся на стор параметров, чтобы компонент перерендерился при их изменении
  const currentTheme = useThemeStore((state) => state.currentTheme);
  const params = useThemeStore((state) => state.params);

  const [strokeColor, setStrokeColor] = useState('rgb(0, 0, 0)');
  const [fillColor, setFillColor] = useState('rgb(255, 255, 255)');

  // Обновляем цвета для SVG при изменении темы или параметров oklch
  useEffect(() => {
    setStrokeColor(getDomColor('primary'));
    setFillColor(getDomColor('surface'));
  }, [currentTheme, params]); // Реагирует на любые изменения ползунков

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="border border-ui rounded-ui">
      <circle
        cx="100"
        cy="100"
        r="80"
        fill={fillColor}      // Передаем чистый rgb() полученный из DOM
        stroke={strokeColor}  // Передаем чистый rgb() полученный из DOM
        strokeWidth="4"
      />
    </svg>
  );
}
*/
