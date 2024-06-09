import { AddUser } from "components/Icons/AddUser";
import { BlockUser } from "components/Icons/BlockUser";
import { RejectUser } from "components/Icons/RejectUser";
import { AcceptUser } from "components/Icons/AcceptUser";
import { Verify } from "components/Icons/Verify";
import PrivateLayout from "layouts/PrivateLayout";
import FriendCard from "pages/home/components/FriendCard";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import PathConstants from "routes/PathConstant";
import EventCard from "pages/home/components/EventCard";

const User = () => {
  const navigate = useNavigate();

  const [me, setMe] = useState({});
  const [user, setUser] = useState({});
  const [eventList, setEventList] = useState([]);

  const access_token = localStorage.getItem("access_token");
  useEffect(() => {
    if (!access_token) {
      navigate(PathConstants.LOGIN);
    }
  });

  const location = useLocation();

  useEffect(() => {
    fetch(PathConstants.BACKEND.ME, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    })
      .then((response) => {
        if (response.status === 401) {
          navigate(PathConstants.LOGIN);
          throw new Error('Unauthorized');
        }
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        fetchEventList();
        const parsedData = JSON.parse(data);
        const currentUser = {
          friends: parsedData.friends,
          sentFriendRequests: parsedData.sent_friend_requests,
          receivedFriendRequest: parsedData.received_friend_requests,
          blocked: parsedData.blocked,
          id: parsedData.id,
          fullName: parsedData.full_name,
          userName: parsedData.user_name,
          email: parsedData.email,
          img: parsedData.profile_photo
        }
        setMe(currentUser);
      })
      .catch(error => {
        console.error('Error fetching friends list:', error);
      });
  }, [access_token, navigate]);

  useEffect(() => {
    fetch(PathConstants.BACKEND.BASE + location.pathname, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    })
      .then((response) => {
        if (response.status === 401) {
          navigate(PathConstants.LOGIN);
          throw new Error('Unauthorized');
        }
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        const parsedData = JSON.parse(data);
        const currentUser = {
          friends: parsedData.friends,
          sentFriendRequests: parsedData.sent_friend_requests,
          receivedFriendRequest: parsedData.received_friend_requests,
          blocked: parsedData.blocked,
          id: parsedData.id,
          fullName: parsedData.full_name,
          userName: parsedData.user_name,
          email: parsedData.email,
          biography: parsedData.biography,
          img: parsedData.profile_photo
        }
        setUser(currentUser);
      })
      .catch(error => {
        console.error('Error fetching friends list:', error);
      });
  }, [location, access_token, navigate]);

  console.log(me);
  console.log(user);

  const canSeeFriendRequest = () => {
    return (me.id !== user.id &&
      (me.sentFriendRequests.includes(user.userName) ||
      me.receivedFriendRequest.includes(user.userName)));
  }

  const canSeeAddFriend = () => {
    return (me.id !== user.id &&
      !me.friends.includes(user.userName) &&
      !me.blocked.includes(user.userName) &&
      !me.sentFriendRequests.includes(user.userName) &&
      !me.receivedFriendRequest.includes(user.userName));
  };

  const canSeeBlockFriend = () => {
    return (me.id !== user.id &&
      !me.blocked.includes(user.userName) &&
      !me.sentFriendRequests.includes(user.userName) &&
      !me.receivedFriendRequest.includes(user.userName));
  }

  const acceptFriendRequest = () => {
    fetch(PathConstants.BACKEND.FRIENDS, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({ userName: user.userName })
    })
    .then((response) => {
      navigate(location.pathname);
    });
  };

  const rejectFriendRequest = () => {
    fetch(PathConstants.BACKEND.FRIENDS, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({ userName: user.userName })
    })
    .then((response) => {
      navigate(location.pathname);
    });
  };

  const sendFriendRequest = () => {
    fetch(PathConstants.BACKEND.FRIENDS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({ userName: user.userName })
    })
    .then((response) => {
      navigate(location.pathname);
    });
  };

  const blockUserRequest = () => {
    console.log("w")
  };

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
          src={me.img === '' ? "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" : me.img}
          alt="ProfilePhoto"
          className="w-44 h-44 rounded-full"
        />
        <div className="flex flex-col">
          <div className="flex gap-x-5 items-center">
            <div className="flex gap-x-2 items-center">
              {user.userName} <Verify />
            </div>
            <button className="p-1 rounded-md text-sm bg-gray-200 text-black">
              {user.fullName}
            </button>
            <button className="p-1 rounded-md text-sm bg-gray-200 text-black">
              {user.email}
            </button>
            <div className="flex justify-center items-center bg-gray-200 p-1 rounded-md">
              <AddUser
                visible={canSeeAddFriend()}
                onClickMethod={canSeeAddFriend() ? sendFriendRequest : null} />
              <AcceptUser
                visible={canSeeFriendRequest()}
                onClickMethod={canSeeFriendRequest() ? acceptFriendRequest : null} />
              <RejectUser
                visible={canSeeFriendRequest()}
                onClickMethod={canSeeFriendRequest() ? rejectFriendRequest : null} />
              <BlockUser
                visible={canSeeBlockFriend()}
                onClickMethod={canSeeBlockFriend() ? blockUserRequest : null} />
            </div>
          </div>
          <p className="font-semibold mt-5">{user.biography}</p>
        </div>
      </div>
      <hr className="w-full h-1"></hr>
      <div className="flex flex-col  justify-center items-center mt-5 ">
        <h1 className="text-gray-500 text-xl my-4">Etkinlikler</h1>
        <div className="w-[800px] shadow p-4 rounded-md">
        {eventList && eventList.length > 0 && eventList.filter(event => event.createdBy === me.userName).map((event) => (
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
        </div>
      </div>
    </PrivateLayout>
  );
};

export default User;
