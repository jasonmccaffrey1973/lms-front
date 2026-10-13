import { Characters, Locations, Equipment } from './index'
import useVideoProduction from './hooks/useVideoProduction'
import Render from '../../sharedComponents/Render';
import { TABS } from './constants';
import VideoProductionTabs from './components/VideoProductionTabs';
import { StyledVideoProductionPage } from './videoProduction.styles';

const VideoProduction = ({ tab } : { tab : string }) => {
    const { activeTab } = useVideoProduction(tab);
	return (    
            <StyledVideoProductionPage>
                <VideoProductionTabs activeTab={activeTab} />
                <div className="page-body">
                    <Render if={activeTab === TABS.CHARACTERS.label.toLowerCase()}>
                        <Characters />
                    </Render>
                    <Render if={activeTab === TABS.LOCATIONS.label.toLowerCase()}>
                        <Locations />
                    </Render>
                    <Render if={activeTab === TABS.EQUIPMENT.label.toLowerCase()}>
                        <Equipment />
                    </Render>
                </div>
            </StyledVideoProductionPage>
	)
}

export default VideoProduction