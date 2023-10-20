import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import profile from "../../src/assets/profile.jpeg";
import useAuth from "../hooks/useAuth.js";
import { Link } from "react-router-dom";

const Header = ({isHbMenu, setHbMenu}) => {
  const { signOut } = useAuth();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const clearTime = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(clearTime);
  }, []);

  return (
    <div>
      <div className="navbar bg-white">
        <div className="flex-1">
          <div className="dropdown">
            <label tabIndex={0} className="md:hidden btn btn-ghost btn-circle" onClick={() => setHbMenu(!isHbMenu)}>
              <AiOutlineMenu></AiOutlineMenu>
            </label>
          </div>
        </div>

        {/* time setUp */}
        <div className="me-9 border p-3">
          <p className="text-2xl">{time.toLocaleTimeString()}</p>
        </div>
        {/* time setUp */}

        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profile} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>

              <li onClick={signOut}>
                <Link to={`/`}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
