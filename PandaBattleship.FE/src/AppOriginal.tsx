import GameOriginal from './components/GameOriginal';
import { PageHeader } from './components/PageHeader';

export default function AppOriginal() {
    return (
        <div className="max-w-5xl mx-auto px-1 pb-1 pt-4 text-center min-h-screen flex flex-col items-center">
            <PageHeader />
            <div className="select-none">
                <GameOriginal />
            </div>
        </div>
    )
}
