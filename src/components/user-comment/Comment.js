import React from 'react';

import './Comment.scss';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.comment,
      isEditable: false,
      updatedComment: this.props.comment.description
    };
  }

  handleInputChange = event => {
    const value = event.target.value;
    this.setState = {
      updatedComment: value
    };
  };

  renderIput() {
    return (
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
  render() {
    const { match } = this.props;
    const questionThreadId = match.params.questionId;
    const { thread } = this.state;

    return <div className="user-comment"></div>;
  }
}
