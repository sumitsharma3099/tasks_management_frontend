import { useNavigate } from 'react-router-dom';
import { clearSession } from '../constants/CommonFunctions'
import swal from 'sweetalert';
import EditUserPage from '../pages/EditUser';

const MainHeader = () => {

  let user_profile_pic_url = localStorage.getItem("profile_pic_url");
  const navigate = useNavigate();

  const logOutUser = () => {
    clearSession();
    swal("Great!", "Logout successfully.", "success");
    navigate("/");
  }

  const EditUserPage = () => {
    navigate("/edit_user");
  }
  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Site Name */}
        <div className="flex items-center">
          <img src="logo.ico" alt="Logo" className="w-8 h-8 mr-2" />
          <span className="text-emerald-500 text-lg font-semibold">Task Management</span>
        </div>
        <div className="flex items-center cursor-pointer">
            <img src={user_profile_pic_url} alt="Avatar" className="w-10 h-10 rounded-full mr-4" onClick={()=>EditUserPage()}
            />
          <button className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-700" onClick={()=>logOutUser()}>
            Logout
          </button>
        </div>
      </div>
    </nav>

  );
};
export default MainHeader;
