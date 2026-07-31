import type { NavigationItem as UserNavigationItem } from "../../queries/useNavigationQueries"

type FlatNavigationItem = {
    name: string
    path: string
}

export type NavigationRenderNode =
    | { kind: "item"; key: string; item: FlatNavigationItem }
    | { kind: "category"; key: string; category: { name: string; itemList: FlatNavigationItem[] } }

const hasPath = (item: UserNavigationItem): item is UserNavigationItem & { path: string } => item.path !== undefined

const toFlatItems = (items: UserNavigationItem[] | undefined): FlatNavigationItem[] => {
    if (!items) {
        return []
    }

    return items
        .filter(hasPath)
        .map((item) => ({ name: item.name, path: item.path }))
}

const toRenderNode = (item: UserNavigationItem): NavigationRenderNode | null => {
    if (hasPath(item)) {
        return {
            kind: "item",
            key: item.name,
            item: { name: item.name, path: item.path },
        }
    }

    if (item.itemList !== undefined) {
        return {
            kind: "category",
            key: item.name,
            category: {
                name: item.name,
                itemList: toFlatItems(item.itemList),
            },
        }
    }

    return null
}

export const buildNavigationRenderModel = (links: UserNavigationItem[]): NavigationRenderNode[] => {
    return links
        .map(toRenderNode)
        .filter((node): node is NavigationRenderNode => node !== null)
}
