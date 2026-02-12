import Game from './components/Game';
import DisplayAllLayouts from './components/DisplayAllLayouts';
import pandaLogo from './assets/brave_panda_1024.png'

export default function App() {
    return (
        <div className="max-w-5xl mx-auto p-8 text-center min-h-screen flex flex-col items-center">
            <div className="flex items-center gap-4 mb-8">
                <h1 className="font-bold text-3xl">Panda Battleship</h1>
                <img src={pandaLogo} className="max-w-30" alt="Panda Battleship" />
            </div>
            <Game />
            <div className="mt-20 w-full border-t border-gray-700 pt-10">
                <DisplayAllLayouts />
            </div>
        </div>
    )
}