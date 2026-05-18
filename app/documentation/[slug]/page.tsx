import { notFound } from 'next/navigation'

import Documentation from '../../../src/views/Documentation'
import {
  documentationPageBySlug,
  documentationPages,
} from '../../../src/views/documentationPages'

export function generateStaticParams() {
  return documentationPages.map((page) => ({ slug: page.slug }))
}

export default async function DocumentationSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!documentationPageBySlug.has(slug)) {
    notFound()
  }

  return <Documentation />
}
