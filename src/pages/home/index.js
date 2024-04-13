import PrivateLayout from "layouts/PrivateLayout";
import React from "react";
import UserProfile from "./components/UserProfile";
import EventCard from "./components/EventCard";
import HomeHeader from "./components/HomeHeader";
import EventCardLarge from "./components/EventCardLarge";

const Home = () => {
  const eventList = [
    {
      eventName: "Yaratıcı Yazma Atölyesi",
      location: "Şehir Kütüphanesi, Salon A",
      date: "25 Nisan 2024",
      id: "ETNKL1234",
      desc: "Kendinizi ifade etmenin yaratıcı yollarını keşfedin!",
    },
    {
      eventName: "Girişimcilik Konferansı",
      location: "Ticaret ve Sanayi Odası Konferans Salonu",
      date: "10 Mayıs 2024",
      id: "ETNKL5678",
      desc: "Yeni iş fikirlerini paylaşmak ve ilham almak için bir araya gelin!",
    },
    {
      eventName: "Doğa Yürüyüşü ve Piknik",
      location: "Milli Park, Doğa Yolu",
      date: "15 Haziran 2024",
      id: "ETNKL91011",
      desc: "Doğanın tadını çıkarın ve harika bir gün geçirin!",
    },
    {
      eventName: "Bilim ve Teknoloji Fuarı",
      location: "Bilim Merkezi",
      date: "20 Temmuz 2024",
      id: "ETNKL121314",
      desc: "Geleceği şekillendiren teknolojik yenilikleri keşfedin!",
    },
    {
      eventName: "Müzik Festivali",
      location: "Şehir Stadyumu",
      date: "5 Ağustos 2024",
      id: "ETNKL151617",
      desc: "Müzik dolu eğlenceli bir gün geçirmek için hazır olun!",
    },
  ];
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
      <div className="flex justify-between gap-x-10 my-10 relative">
        <div className="w-1/3 flex flex-col items-center gap-y-3">
          <UserProfile className="w-64 h-64 rounded-full" />
          <hr className="w-full h-1"></hr>
          {eventList.map((event) => (
            <EventCard
              eventName={event.eventName}
              location={event.location}
              key={event.id}
              date={event.date}
            />
          ))}
        </div>
        <div className="w-2/3 flex flex-col gap-y-3">
          <HomeHeader />
          <hr className="w-full h-1"></hr>
          {mainEventList.map((allEvent) => (
            <EventCardLarge
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
          <div className=" bottom-5 right-5 fixed">
            <button className="border border-gray-200 shadow p-2 rounded-md ">
              Etkinlik oluştur
            </button>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default Home;
