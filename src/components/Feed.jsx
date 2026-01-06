import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utilis/feedSlice'
import { BASE_URL } from '../utilis/constants'
import UserCard from './userCard'


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  // 👇 ADD THIS LINE HERE
  

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if(!feed) return null;
  if(feed.length <=0) return <h1 className='flex justify-center my-10'>No new users found</h1>

  return (
    feed &&(
    <div className='flex justify-center my-10'>
      <UserCard user={feed[0]}/>
    </div>
    )
  );

};


export default Feed