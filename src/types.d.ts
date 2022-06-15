interface Settings {
  assetsRoot: string
}

interface AssetsIndex {
  articles: Article[]
}

interface Article {
  id: string
  title: string
  categories: string[]
  tags: string[]
  create: number
  description: string
}
