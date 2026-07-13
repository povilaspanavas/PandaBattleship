import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import SinglePlayerPage from './pages/SinglePlayerPage'
import { PvpGamePage } from "./pages/PvpGamePage";
import { PvpLobbyPage } from "./pages/PvpLobbyPage";
import { HelpPage } from "./pages/HelpPage";
import { HomePage } from "./pages/HomePage";
import { AllShipLayoutsPage } from "./pages/AllShipLayoutsPage";

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Root element not found.");
}

createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/ai" element={<SinglePlayerPage />}/>
                <Route path="/pvp" element={<PvpLobbyPage />}/>
                <Route path="/pvp/:gameId" element={<PvpGamePage />}/>
                <Route path="/help" element={<HelpPage />}/>
                <Route path="/all-ship-layouts" element={<AllShipLayoutsPage />}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)