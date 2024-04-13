import React from "react";

const UserProfile = ({ className }) => {
  let profileAddress =
    "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg";
  return (
    <div className="flex flex-col items-center">
      <img src={profileAddress} alt="UserProfile" className={className} />
      <h1 className="text-lg font-semibold mt-5">Ertuğrul Ahmet</h1>
      <h2 className=" text-gray-500 italic text-sm">test@gmail.com</h2>
    </div>
  );
};

export default UserProfile;
