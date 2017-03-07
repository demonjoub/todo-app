import React from 'react';

export default class TodosListHeader extends React.Component {
  render() {
    return (
      <thead className="theHeader">
        <tr className="active">
          <th>Task</th>
          <th>Action</th>
        </tr>
      </thead>
     );
  }
}
