import React from "react";

const EventCard = ({ eventName, location, date }) => {
  return (
    <div className="flex flex-col  rounded-lg bg-white p-2 text-surface shadow-lg cursor-pointer text-center w-[250px] gap-y-1">
      <h5 className="text-lg font-medium leading-tight">{eventName}</h5>
      <p className="text-sm">{location}</p>
      <p className=" text-xs text-gray-500">{date}</p>
    </div>
  );
};

export default EventCard;