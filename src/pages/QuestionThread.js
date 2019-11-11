import React from 'react';
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
      }
    };
  }
  render() {
    const { match } = this.props;
    const questionThreadId = match.params.questionId;
    const { thread } = this.state;

    return (
      <div className="thread p-2 mt-3">
        <div className="thread-tite text-left font-weight-bold">{thread.title}</div>
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
        <hr></hr>
      </div>
    );
  }
}
