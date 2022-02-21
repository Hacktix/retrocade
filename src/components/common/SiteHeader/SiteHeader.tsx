import { BrowserView, MobileView } from 'react-device-detect';
import { Link, Route, Routes } from 'react-router-dom';
import './SiteHeader.css';

export default function SiteHeader() {
    return (
        <>
        <div className="HeaderBar">
            <Link to="/">
                <Routes>
                    <Route path="/" element={
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
                    } />
                    <Route path="*" element={
                        <h1>RETROCADE</h1>
                    } />
                </Routes>
            </Link>
        </div>
        <hr />
        </>
    )
}