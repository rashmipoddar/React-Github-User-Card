import React from 'react';
import axios from 'axios';

import Form from './components/Form';
import UserCard from './components/UserCard';
import './App.css';

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {

  //   }
  // }

  // We can just declare state like this without the constructor function if we do not have to declare some props or do explicit binding.

  state = {
    user: {},
    userFollowers: [],
    userName: ''
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/rashmipoddar')
      .then(response => {
        // console.log(response);
        this.setState({
          user: response.data
        }) 
        axios.get('https://api.github.com/users/rashmipoddar/followers')
          .then(followersResponse => {
            // console.log(followersResponse);
            followersResponse.data.forEach(follower => {
              axios.get(follower.url) 
                .then(followerData => {
                  // console.log(followerData);
                  this.setState({
                    userFollowers: [...this.state.userFollowers, followerData.data]
                  })
                })
                .catch(followerError => {
                  console.log(followerError);
                })
            })
          })
          .catch(followersError => {
            console.log(followersError);
          }) 
      })
      .catch(error => {
        console.log('Error in getting data', error)
      })
  }

  render() {
    return (
      <div className='container'> 
        <Form user={this.state.user}/>
        <h1>Github User Card</h1>
        <UserCard user={this.state.user}/>
        <h1>Followers</h1>
        {this.state.userFollowers.map(userFollower => {
          return(
            <UserCard user={userFollower} key={userFollower.id} />
          )
        })}
      </div>
    );
  }
  
}

export default App;
