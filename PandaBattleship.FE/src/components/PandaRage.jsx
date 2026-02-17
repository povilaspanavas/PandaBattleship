import "./PandaRage.css";

export default function PandaRage({ onComplete }) {

    return (
        <div className="rage-overlay" onClick={onComplete}>
            <div className="rage-flash" />
            <div className="rage-message text-slate-700 text-xl font-bold font-poppins bg-amber-100 font-semibold
                px-2 py-1 gap-2 rounded-full transition-colors drop-shadow-l tracking-wide animate-pulse">
                MISSION FAILED
            </div>
            <div className="rage-panda">🐼</div>
        </div>
    );
}