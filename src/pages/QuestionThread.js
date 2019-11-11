import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import Post from '../components/Post';
import './QuestionThread.scss';

export default class QuestionThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thread: {
        id: 1218928192,
        posts: [],
        title: 'How to integrate Redux in React applications?',
        acceptedAnswer: ''
      },
      updatedTitle: 'How to integrate Redux in React applications?',
      isEditable: false
    };
  }

  onHover = () => {
    this.refs.thread_title.style.display = 'inline-block';
  };

  onExit = () => {
    this.refs.thread_title.style.display = 'none';
  };

  renderIput() {
    const { thread, updatedTitle, isEditable } = this.state;
    return (
      <div className="thread-editable col-12">
        <div className="form-group">
          <textarea
            rows={3}
            type="text"
            value={updatedTitle}
            className="form-control"
            id={thread.id}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="btn-group thread-actions" role="group" aria-label="Basic example">
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

  render() {
    const { match } = this.props;
    const questionThreadId = match.params.questionId;
    const { thread, isEditable, updatedTitle } = this.state;

    return (
      <div className="thread container mt-3">
        {isEditable && this.renderIput()}
        {!isEditable && (
          <div
            className="thread-title-container d-inline-block"
            onMouseEnter={this.onHover}
            onMouseLeave={this.onExit}
          >
            <div
              className="thread-title text-left font-weight-bold d-inline-block"
              ref="thread_title"
            >
              {thread.title}
            </div>
            <div className="thread-action-icons" ref="thread_title">
              <div
                className="d-inline-block thread-action-icon"
                title="Edit question title"
                onClick={() => this.setState({ isEditable: true })}
              >
                <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
              </div>
            </div>
          </div>
        )}
        <hr></hr>
        <div className="post-question">
          <Post></Post>
        </div>

        <div className="post-answers">
          <div className="answer-count text-left">{'3 Answers'}</div>
          <hr className="bold-hr"></hr>
          <Post></Post>
          <Post></Post>
        </div>
      </div>
    );
  }
}
