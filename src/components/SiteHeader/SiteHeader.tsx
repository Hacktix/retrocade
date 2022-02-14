import { Link } from 'react-router-dom';
import './SiteHeader.css';

export default function SiteHeader() {
    return (
        <>
        <div className="HeaderBar">
            <Link to="/">
                <h1>RETROCADE</h1>
            </Link>
        </div>
        <hr />
        </>
    )
}