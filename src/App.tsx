import { Route, Routes } from 'react-router-dom';
import Homepage from './components/pages/Homepage/Homepage';
import SiteHeader from './components/common/SiteHeader/SiteHeader';
import SpaceInvaders from './components/pages/SpaceInvaders/SpaceInvaders';
import I8080CPM from './components/pages/i8080CPM/i8080CPM';

export default function App() {
    return (
        <>
            <SiteHeader />
            <Routes>
                <Route path="/spaceinvaders" element={<SpaceInvaders />} />
                <Route path="/cpm" element={<I8080CPM />} />
                <Route path="*" element={<Homepage />} />
            </Routes>
        </>
    )
}
