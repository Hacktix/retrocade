import { Link } from "react-router-dom";
import "./SystemSelection.css";

export type System = {
    name: string,
    img: string,
    url: string
}

export type SystemSelectionProps = {
    systems: Array<System>
}

export function SystemSelection(props: SystemSelectionProps) {
    return (
        <div className="SystemContainer">
            {props.systems.map(system => <SystemItem key={system.name} system={system} />)}
        </div>
    )
}

function SystemItem(props: {system: System}) {
    const sys = props.system;
    return (
        <Link to={sys.url}>
            <div className="SystemItem">
                <div className="SystemLogoFrame">
                    <img className="SystemLogo" src={sys.img} alt={sys.name} />
                </div>
                <h4 className="SystemTitle">{sys.name}</h4>
            </div>
        </Link>
    )
}