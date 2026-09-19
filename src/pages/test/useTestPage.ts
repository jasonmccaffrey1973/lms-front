import { useState, useId } from "react";
const useTestPage = () => {

    const id = useId();

    const [checkedItems, setCheckedItems] = useState<string[]>([])

    const toggleItemCheck = () => setCheckedItems(prev =>
        prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );

    const isItemChecked = () => Boolean(checkedItems.includes(id))

    const handleCheckClick = () => toggleItemCheck()

    const checkItem = () => setCheckedItems(prev => Array.from(new Set(prev)).concat(id))

    const uncheckItem = () => setCheckedItems(prev => prev.filter(itemId => itemId !== id))

    const getCheckedItems = () => checkedItems

    const clearCheckedItems = () => setCheckedItems([]); 

    const numberOfCheckedItems = () => checkedItems.length; 

  return {
    id,
    handleCheckClick,
    isItemChecked,
    getCheckedItems,
    checkItem,
    uncheckItem,
    clearCheckedItems,
    numberOfCheckedItems
  };
};

export default useTestPage;