import React from 'react';
import { connect } from 'react-redux';

import { addTodo, ADD_TODO } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button type="button" onClick={() => this.props.dispatch(addTodo('Task 1'))}>
          Add
        </button>
        <div>TODOS -> </div>
        <div>
          <ul>
            {' '}
            {this.props.todos.map(todo => (
              <li>{todo.text}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};
export default connect(mapStateToProps)(Login);
