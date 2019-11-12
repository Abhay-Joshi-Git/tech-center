import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

// import axios from 'axios';

import Post from '../../components/user-post/Post';
import './QuestionThread.scss';

export default class QuestionThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postRefs: [],
      thread: {
        id: 1218928192,
        posts: [
          {
            id: 3131313,
            user: {
              id: 12121131,
              name: 'user X',
              email: 'awdhoot.lele@synerzip.com',
              reputation: 144
            },
            accepted: false,
            createdAt: new Date(),
            description: `{"blocks":[{"key":"5ahok","text":"this is demo","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"30l8d","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8ch67","text":"import React from 'react';","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"455hj","text":"export default class App extends React.component {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"90q02","text":"  render() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c6058","text":"    return <div> Test </div>","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9kgvh","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5ive4","text":"}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"23vge","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a5od7","text":"please let me know.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
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
        updatedTitle: 'How to integrate Redux in React applications?',
        acceptedAnswer: ''
      },
      isEditable: false,
      isNewQuestion: false
    };
  }

  createPostRefs = () => {
    const { thread } = this.state;
    const postRefs = thread.posts.map(post => React.createRef());
    this.setState({
      postRefs
    });
  };

  createNewThread() {
    const newThread = {
      title: 'New Question',
      updatedTitle: 'New Question',
      posts: [
        {
          tags: [],
          comments: [],
          description: `{"blocks":[{"key":"5ahok","text":"this is demo","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"30l8d","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8ch67","text":"import React from 'react';","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"455hj","text":"export default class App extends React.component {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"90q02","text":"  render() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c6058","text":"    return <div> Test </div>","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9kgvh","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5ive4","text":"}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"23vge","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a5od7","text":"please let me know.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          isEditable: true,
          type: 'question'
        }
      ]
    };
    this.setState({
      thread: newThread,
      isEditable: true,
      isNewQuestion: true
    });
  }

  componentDidMount() {
    const { match } = this.props;
    if (match) {
      const questionThreadId = match.params.questionId;
      if (questionThreadId === 'new') {
        this.createNewThread();
        this.createPostRefs();
      } else {
        // API call to get thread details using threadId
        // this.createPostRefs()
      }
    }
  }

  handleInputChange = event => {
    const value = event.target.value;

    // keeping updated title outside thread obj, coz when we update the title,
    //  we dont want to set the entire thread state with posts again
    this.setState({
      thread: { ...this.state.thread, updatedTitle: value }
    });
  };

  onHover = () => {
    this.refs.thread_title.style.display = 'inline-block';
  };

  onExit = () => {
    this.refs.thread_title.style.display = 'none';
  };

  getPostsData() {
    const { thread, postRefs } = this.state;
    const posts = thread.posts.map((post, index) => {
      const postRef = postRefs[index];
      if (postRef && postRef.current) {
        return postRef.current.getPostData();
      }
      return {};
    });
    console.log('POSTS -> ', posts);
  }

  askNewQuestion = () => {
    // POST thread API here
    console.log('Updated thread', this.state.thread);
    const newThread = {
      posts: this.getPostsData()
    };
  };

  renderIput() {
    const { thread } = this.state;
    return (
      <div className="thread-editable col-12">
        <form
          className="form-group"
          onSubmit={() =>
            this.setState({
              isEditable: false,
              thread: { ...this.state.thread, title: thread.updatedTitle }
            })
          }
        >
          <textarea
            rows={3}
            type="text"
            value={thread.updatedTitle}
            className="form-control"
            id={thread.id}
            onChange={this.handleInputChange}
            required
          />
          <div className="btn-group thread-actions" role="group" aria-label="Basic example">
            <button type="submit" className="btn btn-link">
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
        </form>
      </div>
    );
  }

  renderQuestionPost = (post, postRef) => {
    if (post) {
      return (
        <div className="post-question">
          <Post isEditable={post.isEditable} ref={postRef} post={post}></Post>
          <button
            type="button"
            className="btn btn-primary new-question-button"
            onClick={this.askNewQuestion}
          >
            Post new question
          </button>
        </div>
      );
    }
  };
  renderAnswerPosts = posts => {
    const { postRefs, isNewQuestion } = this.state;
    return (
      !isNewQuestion && (
        <div className="post-answers">
          <div className="answer-count text-left">{`${posts.length} Answers`}</div>
          <hr className="bold-hr"></hr>
          {posts.map((post, index) => {
            return <Post post={post} ref={postRefs[index + 1]}></Post>;
          })}
        </div>
      )
    );
  };

  render() {
    const { thread, isEditable, postRefs } = this.state;
    const questionPost = thread.posts.filter(post => post.type === 'question')[0];
    const answerPosts = thread.posts.filter(post => post.type === 'answer');

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
        {this.renderQuestionPost(questionPost, postRefs[0])}
        {this.renderAnswerPosts(answerPosts)}
      </div>
    );
  }
}
