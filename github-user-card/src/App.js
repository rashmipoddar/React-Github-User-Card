import React from 'react';
import axios from 'axios';

import UserCard from './components/UserCard';

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {

  //   }
  // }

  // We can just declare state like this without the constructor function if we do not have to declare some props or do explicit binding.

  state = {
    user: {},
    userFollowers: []
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/rashmipoddar')
      .then(response => {
        // console.log(response);
        this.setState({
          user: response.data
        }) 
      })
        .then(res => {
          axios.get('https://api.github.com/users/rashmipoddar/followers')
            .then(followersResponse => {
              console.log(followersResponse);
              followersResponse.data.forEach(follower => {
                axios.get(follower.url) 
                  .then(followerData => {
                    console.log(followerData);
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
        .catch(err => {
          console.log('Error in getting follower data ', err);
        })
      .catch(error => {
        console.log('Error in getting data', error)
      })
  }

  render() {
    return (
      <div> 
        <h1>Github User Card</h1>
        <UserCard user={this.state.user}/>
        {this.state.userFollowers.map(userFollower => {
          return(
            <UserCard user={userFollower} />
          )
        })}
      </div>
    );
  }
  
}

export default App;
