import React from 'react';
import axios from 'axios';

class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      userName: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then(response => {
        console.log(response);
        this.setState({
          userName: response.data
        }) 
        // axios.get('https://api.github.com/users/rashmipoddar/followers')
        //   .then(followersResponse => {
        //     // console.log(followersResponse);
        //     followersResponse.data.forEach(follower => {
        //       axios.get(follower.url) 
        //         .then(followerData => {
        //           // console.log(followerData);
        //           this.setState({
        //             userFollowers: [...this.state.userFollowers, followerData.data]
        //           })
        //         })
        //         .catch(followerError => {
        //           console.log(followerError);
        //         })
        //     })
        //   })
        //   .catch(followersError => {
        //     console.log(followersError);
        //   }) 
      })
      .catch(error => {
        console.log('Error in getting data', error)
      })
    
  }

  // componentDidUpdate(prevState, prevProps) {
  //   axios.get(`https://api.github.com/users/${this.state.userName}`)
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log('Error in getting user data from search form ', error);
  //     })
  // }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type='username' 
          name='username' 
          placeholder='Username' 
          onChange={this.handleChange}
        />
        <button>Search</button>
      </form>  
    )
  }
}

export default Form;