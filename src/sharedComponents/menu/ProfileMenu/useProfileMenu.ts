const useProfileMenu = () => {
    const menuItems = [
        { label: "Profile", href: "/profile" },
        { label: "Settings", href: "/settings" },
        { label: "Logout", href: "/logout" }
    ];

    return { menuItems };
};

export default useProfileMenu;