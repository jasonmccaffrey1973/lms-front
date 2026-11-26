const useFilterFacet = (value: string[], searchValue: string) => {
    return value.filter(item => item.toLowerCase().includes(searchValue.toLowerCase()))
}

export default useFilterFacet