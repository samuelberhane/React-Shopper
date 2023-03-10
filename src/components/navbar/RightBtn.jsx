import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOption } from "../../utils/toastOptions";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, USER_LOGOUT } from "../../redux/slice/authSlice";

const RightBtns = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logout Successfully!", toastOption);
        dispatch(USER_LOGOUT());
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message, toastOption);
      });
  };

  return (
    <>
      {user ? (
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-2">
          <p>{user?.email}</p>
          <button
            className="mt-2 py-2 w-[90px] md:w-[80px] lg:w-[100px] text-white rounded text-lg bg-[#6e4b08]"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-2">
          <Link
            className="mt-2 py-2 w-[90px] md:w-[80px] lg:w-[100px] text-center text-white rounded text-lg bg-[#22ac13]"
            to="/login"
          >
            Login
          </Link>

          <Link
            className="mt-2 py-2 w-[90px] text-center text-white rounded text-lg bg-[#616a0f]"
            to="/register"
          >
            Register
          </Link>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default RightBtns;
