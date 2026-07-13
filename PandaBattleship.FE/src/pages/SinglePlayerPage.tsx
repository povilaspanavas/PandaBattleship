import SinglePlayerGame from '../components/SinglePlayerGame';
import { PageHeader } from '../components/PageHeader';

export default function SinglePlayerPage() {
    return (
        <div className="max-w-5xl mx-auto px-1 pb-1 pt-4 text-center min-h-screen flex flex-col items-center">
            <PageHeader />
            <div className="select-none">
                <SinglePlayerGame />
            </div>
        </div>
    )
}
