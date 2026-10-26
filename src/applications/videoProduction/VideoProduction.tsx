import { Characters, Scenes, Equipment } from './index'
import useVideoProduction from './hooks/useVideoProduction'
import Render from '../../sharedComponents/Render';
import { TABS } from './constants';
import VideoProductionTabs from './components/VideoProductionTabs';
import { StyledVideoProductionPage } from './videoProduction.styles';
import Dialog from '../../sharedComponents/dialog/Dialog';
import { AddCharacterForm, AddSceneForm, AddEquipmentForm } from './components';


const VideoProduction = ({ tab } : { tab : string }) => {
    const { activeTab, handleAddButtonClick, handleSubmit, videoProductionModalRef, dialogControls, dialogItems } = useVideoProduction(tab);

	return (    
            <StyledVideoProductionPage>
                <VideoProductionTabs activeTab={activeTab} onAddClick={handleAddButtonClick} />
                <div className="page-body">
                    <Render if={activeTab === TABS.CHARACTERS.label.toLowerCase()}>
                        <Characters />
                    </Render>
                    <Render if={activeTab === TABS.SCENES.label.toLowerCase()}>
                        <Scenes />
                    </Render>
                    <Render if={activeTab === TABS.EQUIPMENT.label.toLowerCase()}>
                        <Equipment />
                    </Render>
                </div>

                <Dialog
                    title={dialogItems.title}
                    dialogRef={videoProductionModalRef}
                    controls={dialogControls}
                    footerButtons={[
                        // { label: 'Cancel', color: 'danger', onClick: dialogControls.closeDialog },
                        { label: dialogItems.submitLabel, color: 'success', type: 'submit', form: 'video-production-item-form' },
                    ]}
                >
                    <Render if={activeTab === TABS.CHARACTERS.label.toLowerCase()}>
                        <AddCharacterForm handleSubmit={handleSubmit} />
                    </Render>
                    <Render if={activeTab === TABS.SCENES.label.toLowerCase()}>
                        <AddSceneForm handleSubmit={handleSubmit} />
                    </Render>
                    <Render if={activeTab === TABS.EQUIPMENT.label.toLowerCase()}>
                        <AddEquipmentForm handleSubmit={handleSubmit}  />
                    </Render>
                </Dialog>

            </StyledVideoProductionPage>
	)
}

export default VideoProduction
