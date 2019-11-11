import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Comment.scss';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: this.props.comment,
      isEditable: false,
      updatedComment: this.props.comment && this.props.comment.description
    };
  }

  onHover = () => {
    this.refs.comment_action.style.display = 'inline-block';
  };

  onExit = () => {
    this.refs.comment_action.style.display = 'none';
  };

  handleInputChange = event => {
    const value = event.target.value;

    this.setState({
      updatedComment: value
    });
  };

  renderIput() {
    const { comment, updatedComment, isEditable } = this.state;
    return (
      <div className="comment-editable col-12">
        <div className="form-group">
          <input
            type="text"
            value={updatedComment}
            className="form-control"
            id={comment.id}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="btn-group comment-actions" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => this.setState({ isEditable: false })}
          >
            Done
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => this.setState({ isEditable: false })}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  renderComment = comment => {
    return (
      <div
        onMouseEnter={this.onHover}
        onMouseLeave={this.onExit}
        className="col-12 text-left comment-box"
      >
        <div className="d-inline-block">{`${comment.description} - `} </div>
        <button type="button p-0 comment-user" className="btn-link">
          {comment.user.name}
        </button>
        <div className="d-inline-block comment-timestamp">{'Posted 1 hours ago'}</div>
        <div className="comment-action-icons" ref="comment_action">
          <div
            className="d-inline-block comment-action-icon"
            title="Edit comment"
            onClick={() => this.setState({ isEditable: true })}
          >
            <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
          </div>
          <div className="d-inline-block comment-action-icon" title="Delete comment">
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </div>
        </div>
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
