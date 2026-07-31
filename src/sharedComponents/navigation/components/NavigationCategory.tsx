import { useNavigation } from "../NavigationContext";
import { StyledCategoryTrigger, StyledList } from "../Navigation.styles"

const NavigationCategory = ({ obj }: { obj: { name: string; itemList: { name: string; path: string }[] } }) => {
    const { name: title, itemList } = obj;
    const { toggleCategory, isCategoryOpen } = useNavigation();

    return (
        <>
        <StyledCategoryTrigger onClick={() => toggleCategory(title)} aria-expanded={isCategoryOpen(title)} aria-controls={`${title}-list`}>
            <span>{title}</span>
            <span aria-label={isCategoryOpen(title) ? `Close ${title} Category` : `Expand ${title} Category`} />
        </StyledCategoryTrigger>
        <StyledList role="menu" aria-label={`${title}-list`} aria-expanded={isCategoryOpen(title)}>
            <div className="list-wrapper">
                {itemList.map((item) => (
                    <li key={item.name} className="nav-item">
                        <a href={item.path} tabIndex={isCategoryOpen(title) ? 0 : -1}>{item.name}</a>
                    </li>
                ))}
            </div>
        </StyledList>
        </>
    );
};

export default NavigationCategory;