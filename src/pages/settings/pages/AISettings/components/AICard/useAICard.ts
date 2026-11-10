import { useState } from "react"

const useAICard = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const stopEditing = () => {
        setIsEditing(false);
        setIsExpanded(false);
    };

    const editCard = () => {
        setIsEditing(true)
        setIsExpanded(true)
    };

    const toggleExpanded = () => (isEditing) ? stopEditing() : setIsExpanded(prev => !prev)  

    const expandCard = () => setIsExpanded(true)

    const collapseCard = () =>  stopEditing()

    const toggleEditing = () => (isEditing) ? stopEditing() : editCard()

    return {
        isExpanded,
        toggleExpanded,
        expandCard,
        collapseCard,
        isEditing,
        editCard,
        stopEditing,
        toggleEditing,
    };
};

export default useAICard;
