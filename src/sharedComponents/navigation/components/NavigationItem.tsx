import { Link } from "react-router-dom";

const NavigationItem = ({ obj }: { obj: { name: string; path: string } }) => {
    const { name, path } = obj;
    return (
        <li className="nav-item">
            <Link to={path}>{name}</Link>
        </li>
    )
}

export default NavigationItem