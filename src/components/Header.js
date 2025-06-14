import { NETFLIX_LOGO_PMS } from "../util/constants";

const Header = () => {
  return (
    <div className="w-48 my-4 mx-44 relative z-[2]">
      <img
        src={NETFLIX_LOGO_PMS}
        alt="netflix-logo"
      />
    </div>
  );
};
export default Header;
