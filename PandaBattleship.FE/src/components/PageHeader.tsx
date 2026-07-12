import { Link } from "react-router";
import pandaLogo from "../assets/brave_panda_1024.png";

// const navLinks = [
//     { to: "/ai", label: "Play vs AI" },
//     { to: "/pvp", label: "Play vs a Friend" },
//     { to: "/help", label: "Help" },
// ];

export const PageHeader = () => (
    <header className="flex flex-col items-center">
        <Link to="/" className="flex items-center gap-2 text-inherit hover:text-inherit">
            <h1 className="font-bold text-3xl">Panda Battleship</h1>
            <img src={pandaLogo} className="max-w-30" alt="Panda Battleship" />
        </Link>
        {/*<nav className="flex gap-4 text-sm font-semibold text-cyan-700">*/}
        {/*    {navLinks.map((link) => (*/}
        {/*        <Link key={link.to} to={link.to} className="hover:underline">*/}
        {/*            {link.label}*/}
        {/*        </Link>*/}
        {/*    ))}*/}
        {/*</nav>*/}
    </header>
);