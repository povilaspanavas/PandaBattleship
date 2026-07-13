import DisplayAllLayouts from "../components/DisplayAllLayouts";
import { PageHeader } from "../components/PageHeader";

export const AllShipLayoutsPage: React.FC = () => (
    <div className="max-w-5xl mx-auto p-4 text-center min-h-screen flex flex-col items-center">
        <PageHeader />

        <main className="w-full mt-6">
            <DisplayAllLayouts />
        </main>
    </div>
);
