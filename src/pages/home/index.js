import PrivateLayout from "layouts/PrivateLayout";
import React, { useEffect, useState } from "react";
import UserProfile from "./components/UserProfile";
import EventCard from "./components/EventCard";
import HomeHeader from "./components/HomeHeader";
import FriendCard from "./components/FriendCard";
import { useNavigate } from "react-router-dom";
import PathConstants from "routes/PathConstant";
import AddEvent from "./components/AddEvent";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Home = () => {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");

  const [eventList, setEventList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [me, setMe] = useState({});

  useEffect(() => {
    if (access_token === null) {
      navigate(PathConstants.LOGIN);
      return;
    }

    const fetchEventList = async () => {
      const response = await fetch(PathConstants.BACKEND.EVENT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        }
      });

      if (response.status === 401) {
        navigate(PathConstants.LOGIN);
        return;
      }

      if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP status ${response.status}`);
      }

      const parsedData = await response.json();

      if (!parsedData) {
        return;
      }

      const events = parsedData.map(data => ({
        key: data.id,
        createdBy: data.created_by,
        location: data.location,
        date: data.date_time,
        id: data.id,
        desc: data.description
      }));

      setEventList(events);
    };

    const fetchMeAndFriends = async () => {
      const response = await fetch(PathConstants.BACKEND.ME, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        }
      });

      if (response.status === 401) {
        navigate(PathConstants.LOGIN);
        return;
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
      };
      setMe(currentUser);

      for (const element of parsedData.friends) {
        const friendResponse = await fetch(PathConstants.BACKEND.USER + element);

        if (friendResponse.status === 401) {
          navigate(PathConstants.LOGIN);
          return;
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
        };
        setFriendList(prevFriends => [...prevFriends, friend]);
      }
    };

    const fetchData = async () => {
      try {
        await fetchEventList();
        await fetchMeAndFriends();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate, access_token]);

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
          {friendList && friendList.length > 0 && friendList.map((friend) => (
            <li key={friend.userName}>
              <FriendCard
                key={friend.userName}
                fullName={friend.fullName}
                userMail={friend.email}
                userName={friend.userName}
                img={friend.img}
              />
            </li>
          ))}
        </div>
        <div className="w-2/3 flex flex-col gap-y-3">
          <HomeHeader />
          <hr className="w-full h-1"></hr>
          {eventList && eventList.length > 0 && eventList.map((event) => (
            <li key={event.id} style={{ listStyleType: 'none' }}>
              <EventCard
                onClickMethod={() => navigate(PathConstants.EVENT + event.id)}
                description={event.desc}
                createdBy={event.createdBy}
                location={event.location}
                date={event.date}
              />
            </li>
          ))};
          <div className=" bottom-5 right-5 fixed">
            <Popup
              trigger={<button className="border border-gray-200 shadow p-2 rounded-md "> Etkinlik oluştur </button>}
              modal
              nested
              contentStyle={{ width: '80%', height: '45%', maxWidth: '800px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              {close => (
                <div className='modal'>
                  <div className='content'>
                    Yeni Etkinlik
                  </div>
                  <AddEvent />
                </div>
              )}
            </Popup>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default Home;
