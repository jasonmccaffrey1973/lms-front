import { useState } from "react";
import { useAuth } from "../../auth";
import { useUserLinks, type NavigationItem } from "../../queries/useNavigationQueries";

type ErrorPageLink = {
    href: string;
    label: string;
    visits: number;
};


/** ================================================================================
 * Custom hook to manage error page links and search functionality.
 * It fetches user navigation links, flattens them, and provides popular links for error pages.
 * It also handles search submissions and maintains the state of the search form.
 * @returns An object containing methods and state for error page links and search functionality.
 ** ================================================================================ */
const DEFAULT_ERROR_LINKS: ErrorPageLink[] = [
    { href: "/", label: "Home", visits: 0 },
    { href: "/contact", label: "Contact", visits: 0 },
    { href: "/faq", label: "Frequently Asked Questions", visits: 0 },
    { href: "/services", label: "Services", visits: 0 },
    { href: "/blog", label: "Blog", visits: 0 }
];

/** --------------------------------------------------------------------------------
 * Flattens a nested structure of navigation items into a flat array of error page links.
 * It recursively traverses the navigation items and collects links with their href, label, and visits.
 * @param items - The nested navigation items to flatten.
 * @returns A flat array of error page links.
 ** -------------------------------------------------------------------------------- */
const flattenNavigationLinks = (items: NavigationItem[] | undefined): ErrorPageLink[] => {
    if (!items || items.length === 0) {
        return [];
    }

    const links: ErrorPageLink[] = [];

    const walk = (nodes: NavigationItem[]) => {
        nodes.forEach((node) => {
            if (node.path) {
                links.push({ href: node.path, label: node.name, visits: node.visits ?? 0 });
            }

            if (node.itemList && node.itemList.length > 0) {
                walk(node.itemList);
            }
        });
    };

    walk(items);
    return links;
};

/** --------------------------------------------------------------------------------
 * Filters out duplicate error page links based on their href.
 * If multiple links have the same href, the one with the highest visits count is kept.
 * @param links - The array of error page links to filter.
 * @returns A unique array of error page links.
 ** -------------------------------------------------------------------------------- */
const uniqueLinksByHref = (links: ErrorPageLink[]) => {
    const uniqueLinks = new Map<string, ErrorPageLink>();

    links.forEach((link) => {
        const existing = uniqueLinks.get(link.href);

        if (!existing || link.visits > existing.visits) {
            uniqueLinks.set(link.href, link);
        }
    });

    return Array.from(uniqueLinks.values());
};

/** --------------------------------------------------------------------------------
 * Ranks the top visited error page links based on their visits count.
 * @param links 
 * @param count 
 * @returns An array of the top visited error page links, limited to the specified count.
 ** -------------------------------------------------------------------------------- */
const rankTopVisitedLinks = (links: ErrorPageLink[], count: number) => {
    return [...links]
        .sort((a, b) => b.visits - a.visits)
        .slice(0, count);
};

/** --------------------------------------------------------------------------------
 * Builds a list of popular error page links, including the home link and the top visited links.
 * @param links - The array of error page links to process.
 * @returns An array of popular error page links.
 ** -------------------------------------------------------------------------------- */
const buildPopularLinks = (links: ErrorPageLink[]) => {
    const homeLink = links.find((link) => link.href === "/") ?? DEFAULT_ERROR_LINKS[0];
    const topVisitedLinks = rankTopVisitedLinks(
        links.filter((link) => link.href !== homeLink.href),
        4
    );

    return [homeLink, ...topVisitedLinks];
};

/** ================================================================================
 * Custom hook to manage error page links and search functionality.
 * It fetches user navigation links, flattens them, and provides popular links for error pages. * 
 * @returns  An object containing methods and state for error page links and search functionality.
 ** ================================================================================ */
const useErrorPagesHook = () => {
    const { token } = useAuth();
    const { data } = useUserLinks(token);

    const [serchSubmitted, setSearchSubmitted] = useState(false);

    const handleSearchSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchSubmitted(true);
        const formData = new FormData(event.currentTarget);
        const searchQuery = formData.get("search") as string;
        console.log(searchQuery);
        setSearchSubmitted(false);
    };

    const allLinks = () => {
        const flattenedLinks = flattenNavigationLinks(data?.navigation);

        if (flattenedLinks.length > 0) {
            return uniqueLinksByHref(flattenedLinks);
        }

        return DEFAULT_ERROR_LINKS;
    };

    const errorPageLinks = () => {
        return buildPopularLinks(allLinks());
    };

    const searchSuggestions = () => {
        return allLinks();
    };

    return {
        serchSubmitted,
        handleSearchSubmit,
        errorPageLinks,
        searchSuggestions
    };
};


export default useErrorPagesHook;