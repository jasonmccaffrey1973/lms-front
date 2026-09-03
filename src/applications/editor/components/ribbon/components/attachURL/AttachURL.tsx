import Button from "../../../../../../sharedComponents/Button/Button";
import Render from "../../../../../../sharedComponents/Render";
import { AttachURLWrapper } from "./AttachURL.styles";
import type { AttachURLProps } from "./AttachURL.types";
import useAttachURL from "./useAttachURL";

const AttachURL = ({ recentURLs, action }: AttachURLProps) => {
    const { hasRecentURLs, handleSubmit, newURL, updateURL } = useAttachURL({
        recentURLs,
        action,
    });

    return (
        <AttachURLWrapper>
            <Render if={hasRecentURLs}>
                <div className="recent-urls-wrapper">
                    <h2 className="category-label">Recent Links</h2>
                    <ul className="recent-urls">
                        {recentURLs && Array.isArray(recentURLs)
                            ? recentURLs.map((url, index) => (
                                <li key={index} onClick={() => updateURL(url)}>{url}</li>
                            ))
                            : []}
                    </ul>
                </div>
            </Render>

            <form onSubmit={handleSubmit} method="post">
                <div className="input-wrapper">
                    <h2 className="category-label">Add New Link</h2>
                    <input
                        type="url"
                        placeholder="Enter URL"
                        value={newURL}
                        onChange={(e) => updateURL(e.target.value)}
                    />
                </div>
                <Button color="primary" type="submit">
                    Add Link
                </Button>
            </form>
        </AttachURLWrapper>
    );
};

export default AttachURL;
