import _ from 'lodash';
import React from 'react';
import TodosListHeader from './TodosListHeader';
import TodosListItems from './TodosListItems';
export default class TodosList extends React.Component {
  renderItem() {
    const props = _.omit(this.props, 'todos');

    return _.map(this.props.todos, (todo, index) =>
    <TodosListItems key = {index}{...todo} {...props}/>);
  }

  render() {
    return (
      <table className="table table-filter">
        <TodosListHeader />
        <tbody className="table active">
          {this.renderItem()}
        </tbody>
      </table>
     );
  }
}
