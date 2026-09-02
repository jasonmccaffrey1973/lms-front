type MenuListItemTypes = {
    label: string;
    value: string;
    action: string;
};

type RibbonListElementProps = {
    label: string;
    items: MenuListItemTypes[];
};

export type { MenuListItemTypes, RibbonListElementProps };