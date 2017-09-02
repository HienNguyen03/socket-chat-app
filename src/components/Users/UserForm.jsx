import React, {Component} from 'react';

class UserForm extends Component {
  onSubmit (e) {
    e.preventDefault();
    var name = this.refs.name.value.trim();
    this.props.setUser({name: name});
    this.props.emit('userJoined', {name: name});

    this.refs.name.value = '';
  }

  render () {
    return (
      <div>
        <h3>Chat Login</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" className="form-control" ref="name" placeholder="Choose a user name"/>
        </form>
      </div>
    );
  }
}

export default UserForm;
