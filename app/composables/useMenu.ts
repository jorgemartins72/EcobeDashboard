import type { NavigationMenuItem } from '@nuxt/ui'

type AnyItem = { to?: string; label?: string; children?: AnyItem[] }

function flatItems(menus: NavigationMenuItem[][]): AnyItem[] {
  const result: AnyItem[] = []
  for (const group of menus) {
    for (const item of group as AnyItem[]) {
      result.push(item)
      if (item.children) result.push(...item.children)
    }
  }
  return result
}

export function useMenu(data: NavigationMenuItem[][]) {
  const allItems = flatItems(data)
  return { items: data, allItems }
}
