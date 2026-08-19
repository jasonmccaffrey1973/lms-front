import { useAuth } from "../auth";

const UserAvatar = () => {
    const { user } = useAuth();
    const { avatarUrl, firstName, lastName } = user ?? {};

    const firstInitial = firstName?.[0] ?? "U";
    const lastInitial = lastName?.[0] ?? "";
    const separator = lastInitial ? " | " : "";

    return (
        <div className="user-avatar">
            {avatarUrl ? (
                <img src={avatarUrl} alt="User Avatar" />
            ) : (
                <div className="default-avatar">{firstInitial}{separator}{lastInitial}</div>
            )}
        </div>
    );
};

export default UserAvatar;