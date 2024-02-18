import MainHeader from "../components/MainHeader";
import EditUser from "../components/EditUser";

export default function EditUserPage() {
    return (
        <>
            <MainHeader />
            <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <div className="mb-4 text-center">
                    <img src="logo.ico" alt="LOGO" className="w-16 h-16 mx-auto mb-3"></img>
                </div>
                    <EditUser />
                </div>
            </div>
        </>
    )
}