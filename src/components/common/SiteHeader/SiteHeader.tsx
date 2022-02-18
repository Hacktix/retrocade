import { BrowserView, MobileView } from 'react-device-detect';
import { Link } from 'react-router-dom';
import './SiteHeader.css';

export default function SiteHeader() {
    return (
        <>
        <div className="HeaderBar">
            <Link to="/">
                <BrowserView>
                    <h1>
                        <span className="Flicker1A">R</span>
                        <span>E</span>
                        <span className="Flicker2B">T</span>
                        <span>R</span>
                        <span>O</span>
                        <span>C</span>
                        <span className="Flicker2A">A</span>
                        <span>D</span>
                        <span className="Flicker1B">E</span>
                    </h1>
                </BrowserView>
                <MobileView>
                    <h1>RETROCADE</h1>
                </MobileView>
            </Link>
        </div>
        <hr />
        </>
    )
}