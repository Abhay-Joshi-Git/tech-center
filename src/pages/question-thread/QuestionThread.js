import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

// import axios from 'axios';

import Post from '../../components/user-post/Post';
import './QuestionThread.scss';

export default class QuestionThread extends React.Component {
  constructor(props) {
    super(props);
    this.editableRef = null;
    this.state = {
      thread: {
        id: 1218928192,
        posts: [
          {
            is: 3131313,
            user: {
              is: 12121131,
              name: 'user X',
              email: 'awdhoot.lele@synerzip.com',
              reputation: 144
            },
            accepted: false,
            askedOn: new Date(),
            description: 'How to integrate redux in the react app',
            comments: [
              {
                id: 212122,
                description:
                  'Some comment askjals asa saskalskalsk alsalskals kalska alsk aslk la sklas',
                user: {
                  id: 218931313,
                  email: 'asd@gmail.com',
                  name: 'user X',
                  reputation: 144
                }
              },
              {
                id: 2121128122,
                description: 'Some comment 2',
                user: {
                  id: 218931313,
                  email: 'asd@gmail.com',
                  name: 'user X',
                  reputation: 144
                }
              }
            ],
            votes: [
              {
                id: 1928192812,
                type: 'up',
                user: {
                  id: 102112,
                  email: 'asdsds@gmail.com',
                  name: 'user X',
                  reputation: 144
                }
              }
            ],
            type: 'answer',
            tags: ['Javascript', 'React', 'Redux']
          }
        ],
        title: 'How to integrate Redux in React applications?',
        acceptedAnswer: ''
      },
      updatedTitle: 'How to integrate Redux in React applications?',
      isEditable: false,
      isNewQuestion: false
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match) {
      const questionThreadId = match.params.questionId;
      if (questionThreadId === 'new') {
        this.setState({
          isEditable: true,
          isNewQuestion: true
        });
      }
    }
  }

  handleInputChange = event => {
    const value = event.target.value;

    this.setState({
      updatedTitle: value
    });
  };

  onHover = () => {
    this.refs.thread_title.style.display = 'inline-block';
  };

  onExit = () => {
    this.refs.thread_title.style.display = 'none';
  };

  askNewQuestion = () => {
    // POST thread
    console.log('Updated thread', this.state.thread, this.state.updatedTitle);
    if (this.editableRef) {
      console.log('Editable ref Data', this.editableRef.getData());
    }
    const newThread = {
      title: this.state.updatedTitle,
      posts: [
        {
          description: JSON.stringify(this.editableRef.getData())
        }
      ]
    };
    // TODO - API integration for new thread
    // axios({
    //   method: 'post',
    //   url: 'https://evening-temple-27295.herokuapp.com/threads',
    //   data: {}
    // });
  };
  setEditableRef = ref => {
    this.editableRef = ref;
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
    const { thread, isEditable, updatedTitle, isNewQuestion } = this.state;
    // TODO - Find a better way to send the editable ref from post -> questionThread (maybe redux)
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
          <Post
            setEditableRef={this.setEditableRef}
            isEditable={isNewQuestion}
            type="question"
            post={thread.posts[0]}
            newPost
          ></Post>
          <button
            type="button"
            className="btn btn-primary new-question-button"
            onClick={this.askNewQuestion}
          >
            Post new question
          </button>
        </div>

        <div className="post-answers">
          <div className="answer-count text-left">{'3 Answers'}</div>
          <hr className="bold-hr"></hr>
          <Post post={thread.posts[0]}></Post>
          <Post post={thread.posts[0]}></Post>
        </div>
      </div>
    );
  }
}
