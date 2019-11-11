import React from 'react';
import Post from '../components/Post';

export default class QuestionThread extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { match } = this.props;
    const questionThreadId = match.params.questionId;

    return (
      <div>
        Question Thread {questionThreadId}
        <hr></hr>
        <Post></Post>
      </div>
    );
  }
}
