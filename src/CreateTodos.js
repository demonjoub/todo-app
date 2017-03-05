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
      <form onSubmit={this.handleCreate.bind(this)} className="header">
        <input
              type="text"
              placeholder="Enter task?"
              ref="_createInput" />
        <button>Create</button>
        {this.renderError()}
      </form>
     );
  }

  handleCreate(event) {
    event.preventDefault();

    const createInput = this.refs._createInput;
    const task = createInput.value;
    const validateInput = this.validateInput(task);

    if(validateInput) {
      this.setState({error:validateInput});
      return;
    }
    this.setState({error:null});
    this.props.createTask(task);
    this.refs._createInput.value = "";
  }

  validateInput(task) {
    console.log(task);
    console.log(this.props.todos)
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
