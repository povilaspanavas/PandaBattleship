import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import './index.css'
import AppOriginal from './AppOriginal.jsx'
import AppPvP from './AppPvP.jsx'
import {GameBoard} from "./components/GamePage.tsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppOriginal />}/>
                <Route path="/ai" element={<AppOriginal />}/>
                <Route path="/pvp" element={<GameBoard />}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)