import { Characters, Locations, Equipment } from './index'
import useVideoProduction from './hooks/useVideoProduction'
import Render from '../../sharedComponents/Render';
import { TABS } from './constants';
import VideoProductionTabs from './components/VideoProductionTabs';
import { StyledVideoProductionPage } from './videoProduction.styles';
import PageTemplate from '../../templates/PageTemplate';

const VideoProduction = ({ tab } : { tab : string }) => {
    const { activeTab, handleTabChange } = useVideoProduction(tab);
	return (    
        <PageTemplate>
            <StyledVideoProductionPage>
                <VideoProductionTabs activeTab={activeTab} handleTabChange={handleTabChange} />
                <div className="page-body">
                    <Render if={activeTab === TABS.CHARACTERS.label}>
                        <Characters />
                    </Render>
                    <Render if={activeTab === TABS.LOCATIONS.label}>
                        <Locations />
                    </Render>
                    <Render if={activeTab === TABS.EQUIPMENT.label}>
                        <Equipment />
                    </Render>
                </div>
            </StyledVideoProductionPage>
        </PageTemplate>
	)
}

export default VideoProduction