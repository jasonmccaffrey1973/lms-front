import { useState } from "react";
const useSelectedCheck = () => {

    // const id = useId();

    const [checkedItems, setCheckedItems] = useState<string[]>([])

    const toggleItemCheck = (itemId: string) => setCheckedItems(prev =>
        prev.includes(itemId) ? prev.filter(prevItemId => prevItemId !== itemId) : [...prev, itemId]
    );

    const isItemChecked = (itemId: string) => Boolean(checkedItems.includes(itemId))

    const handleCheckClick = (itemId: string) => toggleItemCheck(itemId)

    const checkItem = (itemId: string) => setCheckedItems(prev => Array.from(new Set(prev)).concat(itemId))

    const uncheckItem = (itemId: string) => setCheckedItems(prev => prev.filter(prevItemId => prevItemId !== itemId))

    const getCheckedItems = () => checkedItems

    const clearCheckedItems = () => setCheckedItems([]); 

    const numberOfCheckedItems = () => checkedItems.length; 

  return {
    // id,
    handleCheckClick,
    isItemChecked,
    getCheckedItems,
    checkItem,
    uncheckItem,
    clearCheckedItems,
    numberOfCheckedItems
  };
};

export default useSelectedCheck;