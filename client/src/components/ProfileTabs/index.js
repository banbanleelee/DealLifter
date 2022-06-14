import React from 'react';
import { Link, renderMatches } from 'react-router-dom';
import './tabs';
import tabs from './tabs';
import {useState} from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';


import PostedDeals from '../PostedDeals/index'
import SavedDeals from '../SavedDeals/index'
import Following from '../Following/index'
import Followers from '../Followers/index'

import { GET_USER_BY_USERNAME, GET_USER_BY_ID } from '../../utils/queries';

const ProfileTabs = () => {
  const [isShown, setIsShown] = useState(false);
  const [buttonState, setButtonState] = useState(1);

  const handleClick = (id) => {
    console.log(id);
    setIsShown(current => !current);
    setButtonState(id);
    };

    const { userName: userParam } = useParams();
    
    function GetUserName (name) {
      const {loading, data} = useQuery(GET_USER_BY_USERNAME, { variables: { userName: name }});
      const userId = data?.getUserByUserName._id || {};
      console.log(data);
      console.log(userId);

      return userId;
    }
    
    function GetUserByUserId (userId) {
      const {loading, data} = useQuery(GET_USER_BY_ID, { variables: { userId: userId }});
      const user = data?.getUserById || [];
      return user;
    }
  
  const userObj = GetUserByUserId(GetUserName(userParam));
  console.log(userObj);
  console.log(userObj.savedDeals)
  
  return (
    <div className="columns">
      <div className="column is-one-fifth">
        <nav className="panel">
          {tabs.map((tab) => (
            <a className="panel-block is-active" key={tab.id} onClick={ ()=>handleClick(tab.id)}>
              <span className="panel-icon">
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </span>
              {tab.name}
            </a>
          ))}
        </nav>
      </div>

      {/* <div>
        {GetUserName()}
      </div> */}

      <div className="column is-four-fifths" >
        {buttonState===1 ? (
          <PostedDeals postedDeals = {userObj.savedDeals} />
        ) : buttonState === 2 ? (
          <SavedDeals savedDeals = {userObj.savedDeals} />
        ) : buttonState === 3 ? (
          <Following favoriteTags = {userObj.favoriteTags} />
        ) : buttonState === 4 ? (
          <Following following = {userObj.following} />
        ) : buttonState === 5 ? (
          <Followers followers = {userObj.followers} />
        ) : 
              <p className="title is-align-self-stretch">
                Welcome!
              </p>
        }
      </div>
    </div>
  );
};

export default ProfileTabs;
