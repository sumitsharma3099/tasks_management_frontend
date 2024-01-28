import { useNavigate } from 'react-router-dom';
import { clearSession } from '../constants/CommonFunctions'
import swal from 'sweetalert';

const MainHeader = () => {
  
  let user_full_name = localStorage.getItem("user_full_name");
  let user_profile_pic_url = localStorage.getItem("profile_pic_url");
  const navigate = useNavigate();

  const logOutUser = (e) => {
    clearSession();
    swal("Great!", "Logout successfully.", "success");
    navigate("/");
  }
  return (
    <nav
      className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div>
          <div
            className="mx-2 my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0">
              <h2 className="text-3xl font-extrabold text-emerald-500">Task Management</h2>
          </div>
        </div>
        <div>
        <img
      src={user_profile_pic_url}
      alt="Profile Picture"
      className="rounded-full w-10 h-10 object-cover"
    />
          <i className='mr-2'>{user_full_name}</i> 
          <button onClick={() => logOutUser()}
            className="inline-block rounded-full bg-emerald-500 px-6 pb-2 pt-2.5 text-xs text-white font-medium uppercase leading-normal hover:bg-emerald-500 hover:text-white">
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};
export default MainHeader;
