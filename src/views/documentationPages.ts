export type DocumentationPage = {
  title: string
  slug: string
}

export const documentationPages: DocumentationPage[] = [
  { title: 'Overview', slug: 'overview' },
  { title: 'Quickstart Guide', slug: 'quickstart-guide' },
  { title: 'Services Overview', slug: 'services-overview' },
  { title: 'Tiles', slug: 'tiles' },
  { title: 'Geocoding', slug: 'geocoding' },
  { title: 'Route', slug: 'route' },
  { title: 'Matrix', slug: 'matrix' },
  { title: 'Trips', slug: 'trips' },
  { title: 'Reverse Geocoding', slug: 'reverse-geocoding' },
  { title: 'Best Practices', slug: 'best-practices' },
  { title: 'FAQ & Troubleshooting', slug: 'faq-troubleshooting' },
  { title: 'Developer Support', slug: 'developer-support' },
]

export const documentationPageBySlug = new Map(
  documentationPages.map((page) => [page.slug, page]),
)

export const documentationSlugByTitle = new Map(
  documentationPages.map((page) => [page.title, page.slug]),
)

export const documentationTitleBySlug = new Map(
  documentationPages.map((page) => [page.slug, page.title]),
)
