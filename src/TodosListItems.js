import React from 'react';

export default class TodosListItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing : false
    };
  }

  renderTasksection() {
    
    const { task, isCompleted, dueDate , desc} = this.props;

    const taskStyle = {
      cursor : 'pointer',
      textDecoration : isCompleted ? 'line-through' : 'none'
    }
    if(this.state.isEditing) {
      return (
          <td>
            <form onSubmit={this.onSaveClick.bind(this)}>
              <div>
              <input  type="text"
                      defaultValue={task}
                      ref="_editInput"
              />
              </div>
              <div>
              <input  type="text"
                      defaultValue={this.props.desc}
                      ref="_editDesc"
              />
              </div>
              <div>
              <input  type="datetime-local"
                      defaultValue={this.props.dueDate}
                      ref="_editDate"
              />
              </div>
            </form>
          </td>
      );
    }
    return (
        <td style={taskStyle}
            onClick={this.props.toggleTask.bind(this, task)}>
            <p className="task_title">
              <strong>
                {task}
              </strong>
            </p>
            <p className="task_desc">
              {this.props.desc}
            </p>
            <p className="task_date">
              {this.formatDate(dueDate)}
            </p>
        </td>
    );
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var _time = "";
    for(var i = 0 ; i < date.length; i++) {
      if(date[i] == 'T' || date[i] == 't') {
        _time = date.substring(i+1, date.length);
      }
    }

    var d = new Date(date);
    var year = d.getFullYear();
    var day = d.getDate();
    var monthIndex = d.getMonth();
    var format = day + ' ' + monthNames[monthIndex] + ' ' + year;
    var tday = new Date();
    var flag = false;
    if(d.setHours(0,0,0,0) == tday.setHours(0,0,0,0)) {
        flag = true;
    }
    return (flag?'Today':format) + ' ' + _time;
  }

  handleChange  () {
    // console.log('change');
  }

  renderActionSection() {
      if(this.state.isEditing == true) {
        return (
          <td>
            <button
              className="btn btn-primary"
              onClick={this.onSaveClick.bind(this)}>Save</button>
            <button
              className="btn btn-danger"
              onClick={this.onCancelClick.bind(this)}>Cancel</button>
          </td>
        );
      }
      return (
        <td>
          <button
            className="btn btn-primary"
            onClick={this.onEditClick.bind(this)}>Edit</button>
          <button
            className="btn btn-danger"
            onClick={this.props.deleteTask.bind(this,this.props.task)}>Delete</button>
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
    const _editDesc = this.refs._editDesc.value;
    const _editDate = this.refs._editDate.value;
    this.props.saveTask(oldTask, newTask,_editDesc,_editDate);
    this.setState({isEditing:false});

  }


}
