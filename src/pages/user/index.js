import { AddUser } from "components/Icons/AddUser";
import { Dots } from "components/Icons/Dots";
import { Verify } from "components/Icons/Verify";
import PrivateLayout from "layouts/PrivateLayout";
import FriendCard from "pages/home/components/FriendCard";
import React from "react";

const User = () => {
  let profileAddress =
    "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg";
  const mainEventList = [
    {
      eventName: "Yaratıcı Yazma Atölyesi",
      location: "Şehir Kütüphanesi, Salon A",
      date: "25 Nisan 2024",
      id: "ETNKL1234",
      address: "Beylikdüzü, İstanbul",
      desc: "Kendinizi ifade etmenin yaratıcı yollarını keşfedin! Kendinizi ifade etmenin yaratıcı yollarını keşfedin! Kendinizi ifade etmenin yaratıcı yollarını keşfedin! Kendinizi ifade etmenin yaratıcı yollarını keşfedin!Kendinizi ifade etmenin yaratıcı yollarını keşfedin! Kendinizi ifade etmenin yaratıcı yollarını keşfedin!",
      userName: "Ertuğrul Ahmet",
      userMail: "test@gmail.com",
      img: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    },
  ];
  return (
    <PrivateLayout>
      <div className="flex  justify-center  items-center gap-x-20 my-10 ">
        <img
          src={profileAddress}
          alt="ProfilePhoto"
          className="w-44 h-44 rounded-full"
        />
        <div className="flex flex-col">
          <div className="flex gap-x-5 items-center">
            <div className="flex gap-x-2 items-center">
              ertuğrulAhmet <Verify />
            </div>
            <button className="p-1 rounded-md text-sm bg-gray-200 text-black">
              Arkadaş Ekle
            </button>
            <button className="p-1 rounded-md text-sm bg-gray-200 text-black">
              Mesaj gönder
            </button>
            <div className="flex justify-center items-center bg-gray-200 p-1 rounded-md">
              <AddUser />
            </div>
            <Dots />
          </div>
          <div className="flex gap-x-10 font-semibold text-sm mt-5">
            <p>
              1.156 <span className="font-normal">gönderi</span>
            </p>
            <p>
              7.6 M <span className="font-normal">takipçi</span>
            </p>
            <p>
              362 <span className="font-normal">takip</span>
            </p>
          </div>
          <p className="font-semibold mt-5">Ahmet Ertuğrul</p>
        </div>
      </div>
      <hr className="w-full h-1"></hr>
      <div className="flex flex-col  justify-center items-center mt-5 ">
        <h1 className="text-gray-500 text-xl my-4">Etkinlikler</h1>
        <div className="w-[800px] shadow p-4 rounded-md">
          {mainEventList.map((allEvent) => (
            <FriendCard
              eventName={allEvent.eventName}
              location={allEvent.location}
              desc={allEvent.desc}
              key={allEvent.id}
              userMail={allEvent.userMail}
              userName={allEvent.userName}
              img={allEvent.img}
              address={allEvent.address}
            />
          ))}
        </div>
      </div>
    </PrivateLayout>
  );
};

export default User;
