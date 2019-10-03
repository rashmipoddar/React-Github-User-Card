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
    this.props.handleSearchSubmit(this.state.userName);
    this.setState({
      userName: ''
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
          value={this.state.userName}
          onChange={this.handleChange}
        />
        <button>Search</button>
      </form>  
    )
  }
}

export default Form;