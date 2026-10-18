const useProfileMenu = () => {
    const menuItems = [
        { label: "Profile", href: "/profile" },
        { label: "Settings", href: "/profile/settings" },
        { label: "Logout", href: "/logout" }
    ];

    return { menuItems };
};

export default useProfileMenu;