import { useAuth } from "../../../auth";
import SVGIcon from "../../buttons/SVG/SVGIcon";
import UserAvatar from "../../UserAvatar";
import DropDownMenu from "../dropDownMenu/DropDownMenu";
import useProfileMenu from "./useProfileMenu";
const ProfileMenu = () => {

    const { isAuthenticated } = useAuth();
    const { menuItems } = useProfileMenu();
    const profileTrigger = isAuthenticated ? <UserAvatar /> : <SVGIcon icon="profile" />;

    return (
        <DropDownMenu trigger={profileTrigger}
            menuItems={menuItems}
        />
    );
};

export default ProfileMenu;