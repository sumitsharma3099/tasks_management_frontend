import MainHeader from "../components/MainHeader";
import NewTask from "../components/NewTask";

export default function NewTaskPage() {
    return (
        <>
            <MainHeader />
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white px-10 py-10 rounded-lg">

                    <NewTask />
                </div>
            </div>
        </>
    )
}