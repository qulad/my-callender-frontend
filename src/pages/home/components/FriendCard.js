import React from "react";

const FriendCard = ({
  fullName,
  userName,
  userMail,
  img,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex justify-center items-center">
        <img
          src={img}
          alt="UserProfile"
          className={"w-32 h-32 rounded-full"}
        />
      </div>
      <h1 className="text-sm font-semibold mt-5">{fullName}</h1>
      <h1 className="text-sm font-semibold mt-5">{userName}</h1>
      <h2 className=" text-gray-500 italic text-xs">{userMail}</h2>
    </div>
  );
};

export default FriendCard;
