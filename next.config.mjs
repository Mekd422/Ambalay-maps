import createMDX from '@next/mdx'

const withMDX = createMDX({})

const nextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    disableStaticImages: true,
  },
}

export default withMDX(nextConfig)
