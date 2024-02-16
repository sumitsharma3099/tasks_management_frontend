import Header from "../components/Header"
import Login from "../components/Login"

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div class="mb-4 text-center">
                    <img src="logo.ico" alt="LOGO" className="w-16 h-16 mx-auto mb-4"></img>
                </div>
                <Header
                    heading="Login to your account"
                    paragraph="Don't have an account yet? "
                    linkName="Signup"
                    linkUrl="/signup"
                />
                <Login />
            </div>
        </div>
    )
}