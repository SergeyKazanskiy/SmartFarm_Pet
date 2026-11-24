import { getIconPath, type IconName } from "./icon-paths";

export type IconState = "active" | "inactive" | "disabled";

// Классы цветов — CSS-переменные, чтобы Tailwind видел статические строки
const stateTextClass: Record<IconState, string> = {
  active: "text-[var(--icon-active)]",
  inactive: "text-[var(--icon-inactive)]",
  disabled: "text-[var(--icon-disabled)]",
};

// Пропсы — interface
interface IconProps {
  name: IconName;
  state?: IconState;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, state = "inactive", size = 24, strokeWidth = 2 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={stateTextClass[state]}
    >
      <path d={getIconPath(name)} />
    </svg>
  );
}