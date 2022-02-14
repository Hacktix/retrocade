import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import SiteHeader from './components/SiteHeader/SiteHeader';

import './App.css';

export default function App() {
    return (
        <>
            <SiteHeader />
            <Routes>
                <Route path="*" element={<Homepage />} />
            </Routes>
        </>
    )
}
