import React from 'react';

import './Comment.scss';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: this.props.comment,
      isEditable: true,
      updatedComment: this.props.comment && this.props.comment.description
    };
  }

  handleInputChange = event => {
    const value = event.target.value;
    this.setState = {
      updatedComment: value
    };
  };

  renderIput() {
    const { comment, updatedComment, isEditable } = this.state;
    console.log('HELLOasasa', updatedComment);
    return (
      <div className="comment-editable col-12">
        <div className="form-group">
          <input
            value={updatedComment}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder=""
            onChange={this.handleInputChange}
          />
        </div>
        <div className="btn-group comment-actions" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-link">
            Done
          </button>
          <button type="button" className="btn btn-link">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  renderComment = comment => {
    return (
      <div className="col-12 text-left comment-box">
        <div className="d-inline-block">{`${comment.description} - `} </div>
        <button type="button p-0 comment-user" className="btn-link">
          {comment.user.name}
        </button>
        <div className="d-inline-block comment-timestamp">{'Posted 1 hours ago'}</div>
        <hr></hr>
      </div>
    );
  };
  render() {
    const { match } = this.props;
    const { comment, updatedComment, isEditable } = this.state;

    return (
      <div className="user-comment col-12">
        {isEditable && this.renderIput()}
        {!isEditable && this.renderComment(comment)}
      </div>
    );
  }
}
