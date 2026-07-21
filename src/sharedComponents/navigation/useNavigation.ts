const useNavigation = () => {
    
    const getLinks = () => {
        return [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
        ]
    }

    return { getLinks }

}

export default useNavigation