import React from "react";

const HomeHeader = () => {
  return (
    <div className="flex justify-between shadow-md py-2 gap-x-5 px-5 items-center rounded-lg mb-3">
      <h1 className="text-lg font-semibold">TAKVİMİM</h1>
      <span className="w-5 h-5 bg-red-500" />
      <input
        type="text"
        placeholder="Arama Çubuğu"
        className="w-full bg-gray-50 rounded-md p-2 border border-gray-100"
      />
      <button className="p-1 rounded-md bg-gray-200  text-sm">Hakkında</button>
    </div>
  );
};

export default HomeHeader;
