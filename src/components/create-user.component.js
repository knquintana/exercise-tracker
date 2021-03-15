import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: '',
      weight: 0,
      height: 0,
      birthday: new Date(),
      gender: '',
      genderOptions: []
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      genderOptions: ['Male', 'Female'],
      gender: 'Female',
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeHeight(e) {
    this.setState({
      height: e.target.value
    });
  }

  onChangeWeight(e) {
    this.setState({
      weight: e.target.value
    });
  }

  onChangeBirthday(birthday) {
    this.setState({
      birthday: birthday
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    
    const newUser = {
      username: this.state.username,
      weight: this.state.weight,
      height: this.state.height,
      birthday: this.state.birthday,
      gender: this.state.gender
    };

    axios.post('http://localhost:5000/users', newUser)
         .then(res => console.log(res.data));
    
    // this.setState({
    //   username: ''
    // })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <label>Date of Birth: </label>
            <div>
              <DatePicker
                selected={this.state.birthday}
                onChange={this.onChangeBirthday}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Weight (in lbs): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.weight}
                onChange={this.onChangeWeight}
                />
          </div>
          <div className="form-group">
            <label>Height (in inches): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.height}
                onChange={this.onChangeHeight}
                />
          </div>
          <div className="form-group">
            <label>Gender: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.gender}
              onChange={this.onChangeGender}>
                {
                  this.state.genderOptions.map(function(gender) {
                    return <option
                      key={gender}
                      value={gender}>{gender}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
