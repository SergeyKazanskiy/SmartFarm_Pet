"use client";

/*
    * Компонент затемнения фона при открытой панели.
    * Используется в layout.tsx.
*/

type Props = {
  onClick?: () => void;
};

export default function MainBackdrop({ onClick }: Props) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 top-16 z-10 bg-black/30"
      onClick={onClick}
    />
  );
}
