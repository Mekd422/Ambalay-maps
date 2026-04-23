import type { ReactNode } from "react";

interface DashboardHeaderProps {
  kicker: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

const mergeClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

export function DashboardHeader({ kicker, title, subtitle, actions }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-[#8cff2e] mb-2">{kicker}</p>
        <h2 className="text-white font-semibold text-lg sm:text-2xl">{title}</h2>
        {subtitle ? <p className="text-sm text-gray-400 mt-1">{subtitle}</p> : null}
      </div>

      {actions ? <div className="flex items-center gap-3 text-sm text-gray-400">{actions}</div> : null}
    </div>
  );
}

export function DashboardCard({ children, className }: DashboardCardProps) {
  return (
    <div className={mergeClassNames("bg-[#111111] border border-white/5 rounded-xl shadow-xl p-6", className)}>
      {children}
    </div>
  );
}

interface DashboardButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}

export function DashboardButton({
  children,
  type = "button",
  onClick,
  disabled,
  variant = "secondary",
  className,
}: DashboardButtonProps) {
  const variantClassName =
    variant === "primary"
      ? "bg-[#8cff2e] text-black hover:bg-[#7be026]"
      : "bg-[#070707] border border-white/10 text-gray-200 hover:bg-white/[0.03]";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={mergeClassNames(
        "px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
        variantClassName,
        className
      )}
    >
      {children}
    </button>
  );
}
