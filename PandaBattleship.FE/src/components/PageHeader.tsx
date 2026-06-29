import pandaLogo from "../assets/brave_panda_1024.png";

export const PageHeader = () => (
    <div className="flex items-center gap-2">
        <h1 className="font-bold text-3xl">Panda Battleship</h1>
        <img src={pandaLogo} className="max-w-30" alt="Panda Battleship" />
    </div>
);
