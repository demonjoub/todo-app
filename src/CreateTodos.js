import React from 'react';
import _ from 'lodash';

export default class CreateTodos extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error:null
    };
  }

  renderError() {
    if(!this.state.error) {
      return null;
    }
    return <div style={{color:'red'}}>{this.state.error}</div>;
  }

  render() {
    return (
      <form onSubmit={this.handleCreate.bind(this)} >
        <input
              className="form-control"
              type="text"
              placeholder="Task . . . ?"
              ref="_createInput" />
        <input
          className="form-control"
          type="text"
          placeholder="Description"
          ref="_desc"/>
        <input
          className="form-control"
          type="datetime-local"
          ref="_date" />
        <button className="btn btn-primary form-control">Create</button>

        {this.renderError()}
      </form>
     );
  }

  handleCreate(event) {
    event.preventDefault();

    const createInput = this.refs._createInput;
    const task = createInput.value;
    const validateInput = this.validateInput(task);
    const _date = this.refs._date.value;
    const _desc = this.refs._desc.value;
    const validateDateInput = this.validateDateInput(_date);

    if(validateInput) {
      this.setState({error:validateInput});
      return;
    }
    if(validateDateInput) {
      this.setState({error:validateDateInput})
      return;
    }
    this.setState({error:null});
    this.props.createTask(task,_date,_desc);
    this.refs._createInput.value = "";
    this.refs._date.value = "";
    this.refs._desc.value = "";
  }
  validateDateInput(date) {
    if(!date) {
      return 'Please enter a date/time';
    }
    return null;
  }
  validateInput(task) {
    if(!task) {
      return 'Please enter a task.';
    }
    else {
      for(var i = 0 ; i < this.props.todos.length ; i++) {
        if(task == this.props.todos[i].task) {
            return 'Task already exists.';
        }
      }
      return null;
    }
  }
}
