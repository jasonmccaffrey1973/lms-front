import { memo } from "react";
import { Link } from "react-router-dom";
import { StyledCategoryTrigger, StyledList } from "../Navigation.styles"

type NavigationCategoryProps = {
    obj: { name: string; itemList: { name: string; path: string }[] };
    isOpen: boolean;
    onToggle: (title: string) => void;
}

const NavigationCategory = ({ obj, isOpen, onToggle }: NavigationCategoryProps) => {
    const { name: title, itemList } = obj;

    return (
        <>
        <StyledCategoryTrigger onClick={() => onToggle(title)} aria-expanded={isOpen} aria-controls={`${title}-list`}>
            <span>{title}</span>
            <span aria-label={isOpen ? `Close ${title} Category` : `Expand ${title} Category`} />
        </StyledCategoryTrigger>
        <StyledList role="menu" aria-label={`${title}-list`} aria-expanded={isOpen}>
            <div className="list-wrapper">
                {itemList.map((item) => (
                    <li key={item.name} className="nav-item">
                        <Link to={item.path} tabIndex={isOpen ? 0 : -1}>{item.name}</Link>
                    </li>
                ))}
            </div>
        </StyledList>
        </>
    );
};

export default memo(NavigationCategory);