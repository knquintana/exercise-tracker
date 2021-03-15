import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const {
  timeAgo,
} = require('../helpers');

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.activityName}</td>
    <td>{props.exercise.duration}</td>
    <td>{timeAgo(props.exercise.date)}</td>
    <td>{props.exercise.activeCalories}</td>
    <td>{props.exercise.totalCalories}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
     .then(response => {
       this.setState({ exercises: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }

  deleteExercise(id) {
    axios.delete(`http://localhost:5000/exercises/${id}`)
         .then(res => console.log(res.data));

      this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(exercise => {
      return <Exercise exercise={exercise} deleteExercise={this.deleteExercise} key={exercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Activity</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Active Calories</th>
              <th>Total Calories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}
