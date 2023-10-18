import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import profile from '../../src/assets/profile.jpeg'


const Header = () => {
  const [time,setTime] = useState(new Date());

  useEffect(()=>{
setInterval(()=>setTime(new Date()),1000)

  },[])
    return (
        <div>
             <div className="navbar bg-base-100">
        <div className="flex-1">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <AiOutlineMenu></AiOutlineMenu>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>About</a>
              </li>
              <li>
                <a>Dashboard</a>
              </li>
            </ul>
          </div>
        </div>

{/* time setUp */}
<div className="me-9">
    <p className="text-2xl">{time.toLocaleTimeString()}</p>
   </div>
{/* time setUp */}

        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profile}/> 
               
              
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>

              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Header;