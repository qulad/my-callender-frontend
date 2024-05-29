import React from "react";

const UserProfile = ({ onClickMethod, img, className, fullName, userName, email }) => {
  let profileAddress =
    "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg";
  return (
    <div className="flex flex-col items-center" onClick={onClickMethod}>
      <img src={profileAddress} alt="UserProfile" className={className} />
      <h1 className="text-lg font-semibold mt-5">{fullName}</h1>
      <h1 className="text-lg font-semibold mt-5">{userName}</h1>
      <h2 className=" text-gray-500 italic text-sm">{email}</h2>
    </div>
  );
};

export default UserProfile;
