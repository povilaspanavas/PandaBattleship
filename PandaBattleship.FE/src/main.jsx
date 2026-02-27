import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import './index.css'
import AppOriginal from './AppOriginal.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppOriginal />}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)