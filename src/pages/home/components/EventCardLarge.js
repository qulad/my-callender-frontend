import React from "react";

const EventCardLarge = ({
  eventName,
  location,
  address,
  desc,
  userName,
  userMail,
  img,
}) => {
  return (
    <div className="flex justify-between">
      <div className="w-1/3 flex flex-col">
        <div className="flex flex-col ">
          <div className="flex justify-center items-center">
            <img
              src={img}
              alt="UserProfile"
              className={"w-32 h-32 rounded-full"}
            />
          </div>
          <h1 className="text-sm font-semibold mt-5">{userName}</h1>
          <h2 className=" text-gray-500 italic text-xs">{userMail}</h2>
        </div>
        <p className="text-base mt-4">{location}</p>
        <p className="text-sm mt-2">{address}</p>
      </div>
      <div className="w-2/3 rounded-md p-3 shadow h-fit">{desc}</div>
    </div>
  );
};

export default EventCardLarge;
