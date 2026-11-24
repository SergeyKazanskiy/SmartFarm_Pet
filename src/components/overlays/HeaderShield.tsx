"use client";

/*
* Компонент "щит" для заголовка при открытой панели.
* Используется в layout.tsx.
*/

export default function HeaderShield() {
  return (
    <div className="absolute inset-x-0 top-0 z-20 h-16" />
  );
}