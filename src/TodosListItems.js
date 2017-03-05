import React from 'react';

export default class TodosListItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing : false
    };
  }

  renderTasksection() {
    const { task, isCompleted } = this.props;

    const taskStyle = {
      cursor : 'pointer',
      textDecoration : isCompleted ? 'line-through' : 'none'
    }
    if(this.state.isEditing) {
      return (
          <td>
            <form onSubmit={this.onSaveClick.bind(this)}>
              <input  type="text"
                      defaultValue={task}
                      ref="_editInput"
              />
            </form>
          </td>
      );
    }
    return (
        <td style={taskStyle}
            onClick={this.props.toggleTask.bind(this, task)}>
            <input type="checkbox"
                   checked = {isCompleted ? 'checked':''}
                   onChange = {this.handleChange.bind(this)}/> {task}
        </td>
    );
  }

  handleChange  () {
    // console.log('change');
  }

  renderActionSection() {
      if(this.state.isEditing == true) {
        return (
          <td>
            <button onClick={this.onSaveClick.bind(this)}>Save</button>
            <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
          </td>
        );
      }
      return (
        <td>
          <button onClick={this.onEditClick.bind(this)}>Edit</button>
          <button onClick={this.props.deleteTask.bind(this,this.props.task)}>Delete</button>
        </td>
      );
  }

  render() {
    return (
        <tr>
          {this.renderTasksection()}
          {this.renderActionSection()}
        </tr>
     );
  }

  onEditClick() {
    this.setState({isEditing:true});
  }
  onCancelClick() {
    this.setState({isEditing:false})
  }
  onSaveClick(event) {
    event.preventDefault();
    const oldTask = this.props.task;
    const newTask = this.refs._editInput.value;
    this.props.saveTask(oldTask, newTask);
    this.setState({isEditing:false});
    console.log(oldTask, newTask);
  }


}
