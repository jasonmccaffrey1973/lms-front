import { useAuth } from "../../../auth";
import ProfileSVG from "../../buttons/SVG/profileSVG";
import UserAvatar from "../../UserAvatar";
import DropDownMenu from "../dropDownMenu/DropDownMenu";
import useProfileMenu from "./useProfileMenu";
const ProfileMenu = () => {

    const { isAuthenticated } = useAuth();
    const { menuItems } = useProfileMenu();
    const profileTrigger = isAuthenticated ? <UserAvatar /> : <ProfileSVG />;

    return (
        <DropDownMenu trigger={profileTrigger}
            menuItems={menuItems}
        />
    );
};

export default ProfileMenu;