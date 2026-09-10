type MenuListItemTypes = {
    label: string;
    value: string;
    action: string;
};

type RibbonListElementProps = {
    label: string;
    items: MenuListItemTypes[];
    action?: (value: string) => void;
};

export type { MenuListItemTypes, RibbonListElementProps };