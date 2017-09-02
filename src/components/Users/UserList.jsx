import React, {Component} from 'react';

class UserList extends Component {
  render () {
    let {users} = this.props;
    return (
      <div>
        <h3>Users ({users.length})</h3>
        <ul className="list-group">
          {users.map((user, index) => {
            return <li className="list-group-item" key={index}>{user.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default UserList;
