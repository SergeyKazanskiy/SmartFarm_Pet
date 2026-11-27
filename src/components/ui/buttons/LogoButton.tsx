"use client";

import { LOGO_ICONS, type LogoIcon } from "@/types/logo-icons";

interface EmojiButtonProps {
  label: string;
  emoji?: LogoIcon;
  emojiSize?: number;
  buttonSize?: number;
  onClick?: () => void;
}

export function EmojiButton({
  label,
  emoji = "sprout",
  emojiSize = 24,
  buttonSize = 40,
  onClick,
}: EmojiButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded border-0 bg-transparent p-0 m-0 cursor-pointer leading-none transition-opacity duration-200 ease-out hover:opacity-80 active:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--icon-active)]"
      style={{ width: buttonSize, height: buttonSize }}
    >
      <span aria-hidden="true" style={{ fontSize: emojiSize, lineHeight: 1 }}>
        {LOGO_ICONS[emoji]}
      </span>
    </button>
  );
}