import MainHeader from "../components/MainHeader";
import EditTask from "../components/EditTask";

export default function EditTaskPage() {
    return (
        <>
            <MainHeader />
            <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <div class="mb-4 text-center">
                    <img src="logo.ico" alt="LOGO" className="w-16 h-16 mx-auto mb-3"></img>
                </div>

                    <EditTask />
                </div>
            </div>
        </>
    )
}