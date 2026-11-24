'use client'

import { cn } from "@/utils/cn";
import { Icon, type IconState } from "./icon";
import type { IconName } from "./icon-paths";

const stateBorderClass: Record<IconState, string> = {
  active: "border-[var(--icon-active)]",
  inactive: "border-[var(--icon-inactive)]",
  disabled: "border-[var(--icon-disabled)]",
};

interface IconButtonProps {
  name: IconName;
  label: string;
  state?: IconState;
  size?: number;
  buttonSize?: number;
  border?: boolean;
  onClick?: () => void;
}

export function IconButton({
  name,
  label,
  state = "inactive",
  size = 24,
  buttonSize = 40,
  border = false,
  onClick,
}: IconButtonProps) {
  const isDisabled = state === "disabled";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={state === "active"}
      title={label}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      className={cn(
        "inline-flex items-center justify-center rounded p-0 m-0 border",
        "transition-opacity transition-colors duration-200 ease-out",
        border ? stateBorderClass[state] : "border-transparent",
        isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
      )}
      style={{ width: buttonSize, height: buttonSize }}
    >
      <Icon name={name} state={state} size={size} />
    </button>
  );
}