import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import AppOriginal from './AppOriginal'
import { GameBoard } from "./components/GamePage";
import { PvpLobbyPage } from "./components/PvpLobbyPage";
import { HelpPage } from "./components/HelpPage";
import { HomePage } from "./components/HomePage";

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Root element not found.");
}

createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/ai" element={<AppOriginal />}/>
                <Route path="/pvp" element={<PvpLobbyPage />}/>
                <Route path="/pvp/:gameId" element={<GameBoard />}/>
                <Route path="/help" element={<HelpPage />}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
