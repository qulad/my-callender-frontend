import React from "react";

const EventCard = ({ onClickMethod, description, createdBy, location, date }) => {
  return (
    <div onClick={onClickMethod} className="flex flex-col  rounded-lg bg-white p-2 text-surface shadow-lg cursor-pointer text-center leading-tight gap-y-1">
      <h5 className="text-lg font-medium leading-tight">{createdBy}</h5>
      <h6 className="text-lg font-medium leading-tight">{description}</h6>
      <a href={location} target="_blank" className="text-sm">Konum</a>
      <p className=" text-xs text-gray-500">{date}</p>
    </div>
  );
};

export default EventCard;
