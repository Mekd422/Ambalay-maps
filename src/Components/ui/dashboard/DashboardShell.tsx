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
        <h2 className="text-lg font-semibold text-white sm:text-2xl">
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
        'rounded-xl border border-white/5 bg-[#111111] p-6 shadow-xl',
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
      : 'bg-[#070707] border border-white/10 text-gray-200 hover:bg-white/[0.03]'

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
