import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignupPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="mb-4 text-center">
                    <img src="logo.ico" alt="LOGO" className="w-16 h-16 mx-auto mb-4"></img>
                </div>
                <Header
                    heading="Signup to create an account"
                    paragraph="Already have an account? "
                    linkName="Login"
                    linkUrl="/"
                />
                <Signup />
            </div>
        </div>
    )
}