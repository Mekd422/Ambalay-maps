import DashboardPage from '../../../src/Components/ui/dashboard/DashboardPage'

type DashboardRouteProps = {
  params: Promise<{ slug?: string[] }>
}

export default async function DashboardRoute({ params }: DashboardRouteProps) {
  const { slug = [] } = await params
  return <DashboardPage slug={slug} />
}
