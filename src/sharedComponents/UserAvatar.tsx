import { useAuth } from "../auth";
import ProfileSVG from "./buttons/SVG/ProfileSVG";
import Render from "./Render";

const UserAvatar = () => {
    const { user } = useAuth();
    const { avatarUrl, firstName, lastName } = user ?? {};

    const firstInitial = firstName?.[0] ?? "";
    const lastInitial = lastName?.[0] ?? "";
    const separator = lastInitial ? " | " : "";
    const avatarSrc = avatarUrl ?? undefined;
    const hasAvatar = Boolean(avatarSrc);
    const hasInitials = Boolean(firstInitial || lastInitial);

    return (
        <div className="user-avatar">
            <Render if={hasAvatar}>
                <img src={avatarSrc} alt="User Avatar" />
            </Render>
            <Render if={!hasAvatar && hasInitials}>
                {firstInitial}{separator}{lastInitial}
            </Render>
            <Render if={!hasAvatar && !hasInitials}>
                <ProfileSVG />
            </Render>
        </div>
    );
};

export default UserAvatar;