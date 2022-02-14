import { Route, Routes } from 'react-router-dom';
import Homepage from './components/pages/Homepage/Homepage';
import SiteHeader from './components/common/SiteHeader/SiteHeader';
import SpaceInvaders from './components/pages/SpaceInvaders/SpaceInvaders';

export default function App() {
    return (
        <>
            <SiteHeader />
            <Routes>
                <Route path="/spaceinvaders" element={<SpaceInvaders />} />
                <Route path="*" element={<Homepage />} />
            </Routes>
        </>
    )
}
