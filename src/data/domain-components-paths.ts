const domains = ['post']
export const domainComponentsPaths = domains.map((name) => ({
  path: `features/${name}/components`,
  pathPrefix: false,
  global: true,
}))
