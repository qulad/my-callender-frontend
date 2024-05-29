import PrivateLayout from "layouts/PrivateLayout";
import React, { useEffect, useState } from "react";
import UserProfile from "./components/UserProfile";
import EventCard from "./components/EventCard";
import HomeHeader from "./components/HomeHeader";
import FriendCard from "./components/FriendCard";
import { useNavigate } from "react-router-dom";
import PathConstants from "routes/PathConstant";

const Home = () => {
  const navigate = useNavigate();

  const access_token = localStorage.getItem("access_token");
  useEffect(() => {
    if (!access_token) {
      navigate(PathConstants.LOGIN);
    }
  });

  const [eventList, setEventList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [me, setMe] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(PathConstants.BACKEND.EVENT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        }
      });
      
      if (response.status === 401) {
        navigate(PathConstants.LOGIN);
        throw new Error('Unauthorized');
      }
  
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.text();
      const parsedData = JSON.parse(data);
      const event = {
        createdBy: parsedData.created_by,
        location: parsedData.location,
        date: parsedData.date_time,
        id: parsedData.id,
        desc: parsedData.description
      }
      setEventList(prevEvents => [...prevEvents, event]);
    };
  
    fetchData();
  }, [access_token]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(PathConstants.BACKEND.ME, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        }
      });
  
      if (response.status === 401) {
        navigate(PathConstants.LOGIN);
        throw new Error('Unauthorized');
      }
  
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
  
      const data = await response.text();
      const parsedData = JSON.parse(data);
      const currentUser = {
        id: parsedData.id,
        fullName: parsedData.full_name,
        userName: parsedData.user_name,
        email: parsedData.email,
        img: parsedData.profile_photo
      }
      setMe(currentUser);
  
      for (const element of parsedData.friends) {
        const friendResponse = await fetch(PathConstants.BACKEND.USER + element);
  
        if (friendResponse.status === 401) {
          navigate(PathConstants.LOGIN);
          throw new Error('Unauthorized');
        }
  
        if (!friendResponse.ok) {
          throw new Error(`HTTP status ${friendResponse.status}`);
        }
  
        const friendData = await friendResponse.text();
        const parsedFriendData = JSON.parse(friendData);
        const friend = {
          userName: parsedFriendData.user_name,
          fullName: parsedFriendData.full_name,
          email: parsedFriendData.email,
          img: parsedFriendData.profile_photo
        }
        setFriendList(prevFriends => [...prevFriends, friend]);
      }
    };
  
    fetchData().catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, [access_token, navigate]);

  return (
    <PrivateLayout>
      <div className="flex justify-between gap-x-10 my-10 relative">
        <div className="w-1/3 flex flex-col items-center gap-y-3">
          <UserProfile
            onClickMethod={() => navigate(PathConstants.USER + me.userName)}
            className="w-64 h-64 rounded-full"
            img={me.img}
            userName={me.userName}
            fullName={me.fullName}
            email={me.email}
          />
          <hr className="w-full h-1"></hr>
          {friendList.map((friend) => (
            <FriendCard
              key={friend.userName}
              fullName={friend.fullName}
              userMail={friend.email}
              userName={friend.userName}
              img={friend.img}
            />
          ))}
        </div>
        <div className="w-2/3 flex flex-col gap-y-3">
          <HomeHeader />
          <hr className="w-full h-1"></hr>
          {eventList.map((event) => (
            <EventCard
              key={event.id}
              createdBy={event.createdBy}
              location={event.location}
              date={event.date}
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
