import type { ReactNode } from 'react'

interface DashboardHeaderProps {
  kicker: string
  title: string
  subtitle?: string
  actions?: ReactNode
}

interface DashboardCardProps {
  children: ReactNode
  className?: string
}

const mergeClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(' ')

export function DashboardHeader({
  kicker,
  title,
  subtitle,
  actions,
}: DashboardHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-sm uppercase tracking-[0.35em] text-[#8cff2e]">
          {kicker}
        </p>
        <h2 className="text-lg font-semibold text-slate-900 sm:text-2xl dark:text-white">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex items-center gap-3 text-sm text-gray-400">
          {actions}
        </div>
      ) : null}
    </div>
  )
}

export function DashboardCard({ children, className }: DashboardCardProps) {
  return (
    <div
      className={mergeClassNames(
        'rounded-xl border border-slate-200/20 bg-white p-6 shadow-xl dark:border-white/5 dark:bg-[#111111]',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface DashboardButtonProps {
  children: ReactNode
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  className?: string
}

export function DashboardButton({
  children,
  type = 'button',
  onClick,
  disabled,
  variant = 'secondary',
  className,
}: DashboardButtonProps) {
  const variantClassName =
    variant === 'primary'
      ? 'bg-[#8cff2e] text-black hover:bg-[#7be026]'
      : 'bg-white text-slate-900 border border-slate-200/30 hover:bg-slate-100 dark:bg-[#070707] dark:text-gray-100 dark:border-white/10 dark:hover:bg-white/[0.03]'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={mergeClassNames(
        'rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-30',
        variantClassName,
        className,
      )}
    >
      {children}
    </button>
  )
}
