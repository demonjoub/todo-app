import React from 'react';
import _ from 'lodash';
import TodosList from './TodosList';
import CreateTodos from './CreateTodos';
import './App.css';

// const todos = [
//   {
//     task:'make React tutorial',
//     isCompleted: false,
//     dueDate: '2017-03-10T12:12',
//     desc: 'test1'
//   },
//   {
//     task: 'eat dinner',
//     isCompleted: true,
//     dueDate: '2017-03-11T15:12',
//     desc: 'test2'
//   }
// ];

var todos = JSON.parse(localStorage.getItem('todos_doto888')) || [];
console.log("localStorage", todos);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos,
    };
  }

  render() {
    return (
       <div className="todoListMain">
          <h1>React ToDos App</h1>
          <CreateTodos
              todos={this.state.todos}
              createTask={this.createTask.bind(this)} />



          <TodosList
              todos={this.state.todos}
              toggleTask={this.toggleTask.bind(this)}
              saveTask={this.saveTask.bind(this)}
              deleteTask={this.deleteTask.bind(this)}
              />
       </div>
     );
  }


  toggleTask(task) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === task);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    this.setState({todos:this.state.todos});
  }

  createTask(task, dueDate, desc) {
    console.log('create Task' , dueDate);
    this.state.todos.push({
      task,
      isCompleted:false,
      dueDate,
      desc
    });
    // console.log(this.state.todos);
    this.setState({ todos: this.state.todos});

    // save localStorage
    localStorage.setItem('todos_doto888', JSON.stringify(todos));

  }

  saveTask(oldTask, newTask, newDesc, newDate) {

    const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
    foundTodo.task = newTask;
    foundTodo.desc = newDesc;
    foundTodo.dueDate = newDate;
    this.setState({todos:this.state.todos});

    // save localStorage
    localStorage.setItem('todos_doto888', JSON.stringify(todos));

  }

  deleteTask(taskToDelete) {
    _.remove(this.state.todos, todo => todo.task === taskToDelete);
    this.setState({todos:this.state.todos});
    // save localStorage
    localStorage.setItem('todos_doto888', JSON.stringify(todos));
  }
}
