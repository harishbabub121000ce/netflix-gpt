import { NETFLIX_LOGO_PMS } from "../util/constants";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeUser } from "../util/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../util/firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className="absolute w-full bg-gradient-to-b from-black z-10">
      <div className="flex justify-between items-center px-44 py-4">
        <div className="flex items-center">
          <div className="w-48">
            <img src={NETFLIX_LOGO_PMS} alt="netflix-logo" />
          </div>
          {user && (
            <div className="flex gap-6 ml-8">
              <div className="text-white hover:text-gray-300 cursor-pointer">Home</div>
              <div className="text-white hover:text-gray-300 cursor-pointer">TV Shows</div>
              <div className="text-white hover:text-gray-300 cursor-pointer">Movies</div>
              <div className="text-white hover:text-gray-300 cursor-pointer">Games</div>
              <div className="text-white hover:text-gray-300 cursor-pointer">New & Popular</div>
              <div className="text-white hover:text-gray-300 cursor-pointer">My List</div>
              <div className="text-white hover:text-gray-300 cursor-pointer">Browse by Languages</div>
            </div>
          )}
        </div>
        {user && (
          <div>
            <button 
              onClick={handleSignOut}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
