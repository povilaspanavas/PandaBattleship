import "./PandaRage.css";

export default function PandaRage({ onComplete }) {

    return (
        <div className="rage-overlay">
            <div className="rage-flash" />
            <div className="rage-message text-slate-700 text-xl font-bold font-poppins">MISSION FAILED</div>
            <div className="rage-panda">🐼</div>
        </div>
    );
}