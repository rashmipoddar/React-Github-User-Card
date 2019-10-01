import React from 'react';
import image from '../images/github-logo.svg';

const UserCard = props => {
  // console.log(props);
  return (
    // <h1>User Card</h1>
    <div className='card'>
      <h1>Name: {props.user.name}</h1>
      <img src={props.user.avatar_url} alt={`${props.user.name} Photo`}/>
      <h2>Location: {props.user.location}</h2>
      {props.user.bio !== null ? <h2>Bio: {props.user.bio}</h2> : ''}
      <h2>Followers: {props.user.followers}</h2>
      <h2>Following: {props.user.following}</h2>
      <a href={props.user.html_url}><img className='logo' src={image} alt='Github Logo'/></a>
    </div>
  )
}

export default UserCard;