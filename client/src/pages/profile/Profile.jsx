import React,{ useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import useRedirectLoggedOutUser from '../../customeHook/useRedirectLoggedOutUser';
import { SET_NAME, SET_USER } from '../../redux/features/auth/authSlice';
import { getUserProfile } from '../../services/authServices';


const Profile = () => {

    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();

    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('Getting User...');
        setIsLoading(true);

        async function getUserData() {
            const data = await getUserProfile();
            console.log(data);

            setProfile(data);
            setIsLoading(false);

            await dispatch(SET_USER(data));
            await dispatch(SET_NAME(data.name));
        }
        getUserData();  
    }, [dispatch])

  return (
    <div>
      {isLoading && <Loader/>}
      {profile && 
      <div className='bg-gray-400 inline-block p-4 rounded-lg'>
        <span className='text-2xl'>
          <p>
            <b>Name : </b> {profile.name}
          </p>
          <hr/>
          <p>
            <b>Email : </b> {profile.email}
          </p>
          <hr/>
          <p>
            <b>Phone : </b> {profile.phone}
          </p>
          <hr/>
          <p>
            <b>Bio : </b> {profile.bio}
          </p>
          <hr/>
        </span>
      </div>
      }
    </div>
  )
}

export default Profile;
