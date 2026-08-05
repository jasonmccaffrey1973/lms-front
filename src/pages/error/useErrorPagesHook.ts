import { useState } from "react";

const useErrorPagesHook = () => {

    const [serchSubmitted, setSearchSubmitted] = useState(false);

    const handleSearchSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchSubmitted(true);
        const formData = new FormData(event.currentTarget);
        const searchQuery = formData.get("search") as string;
        console.log(searchQuery);
        setSearchSubmitted(false);
    };

    const errorPageLinks = () => {
        return [
            { href: "/", label: "Home" },
            { href: "/contact", label: "Contact" },
            { href: "/faq", label: "Frequently Asked Questions" },
            { href: "/services", label: "Services" },
            { href: "/blog", label: "Blog" }
        ];
    }

    return {
        serchSubmitted,
        handleSearchSubmit,
        errorPageLinks
    };
};


export default useErrorPagesHook;