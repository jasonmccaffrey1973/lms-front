import { useRef, useState } from "react";
import useDialog from "../../../sharedComponents/dialog/useDialog";

const useVideoProduction = (initialTab: string) => {
    /** ----------------------------------------------------------------------------------
     * 
    ** ---------------------------------------------------------------------------------- */
    const activeTab = (initialTab ?? 'characters').toLowerCase()
    const videoProductionModalRef = useRef<HTMLDialogElement>(null);
    const dialogControls = useDialog({ ref: videoProductionModalRef });
    const [dialogItems, setDialogItems] = useState({
        title: "",
        submitLabel: "",
    });
    
    /** ==================================================================================
     * HELPER FUNCTIONS for adding new items based on the active tab.
     ** ================================================================================== */


    const addCharacter = () => {
        console.log("Add new character");
    };

    const addScenes = () => {
        console.log("Add new scene");
    };

    const addEquipment = () => {
        console.log("Add new equipment");
    };



    /** ----------------------------------------------------------------------------------
     * Handles the click event for the "Add New" button based on the currently active tab.
     ** ---------------------------------------------------------------------------------- */
    const handleAddButtonClick = () => {
        dialogControls.openDialog();
        switch (activeTab.toLowerCase()) {
            case "characters":
                setDialogItems({ title: "Add Character", submitLabel: "Add Character" });
                break;
            case "scenes":
                setDialogItems({ title: "Add Scene", submitLabel: "Add Scene" });
                break;
            case "equipment":
                setDialogItems({ title: "Add Equipment", submitLabel: "Add Equipment" });
                break;
            default:
                setDialogItems({ title: "Add " + activeTab, submitLabel: "Add " + activeTab });
        };
        
    };

    const handleSubmit = () => {
        switch (activeTab.toLowerCase()) {
            case "characters":
                addCharacter();
                break;
            case "scenes":
                addScenes();
                break;
            case "equipment":
                addEquipment();
                break;
            default:
                console.log("Add new " + activeTab);
        }
        dialogControls.closeDialog();
    };


    return {
        activeTab,
        handleAddButtonClick,
        handleSubmit,
        videoProductionModalRef,
        dialogControls,
        dialogItems,
    }   
}

export default useVideoProduction
