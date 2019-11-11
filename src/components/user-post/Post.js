import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import { formatDistance, subDays } from 'date-fns';

import RichTextEditor from '../text-editor/RichTextEditor';
import { hashCode } from '../../utils';
import UserComment from '../user-comment/Comment';
import './Post.scss';

const data1 = `{"blocks":[{"key":"5ahok","text":"this is demo","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"30l8d","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8ch67","text":"import React from 'react';","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"455hj","text":"export default class App extends React.component {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"90q02","text":"  render() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c6058","text":"    return <div> Test </div>","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9kgvh","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5ive4","text":"}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"23vge","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a5od7","text":"please let me know.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`;

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
      questionData: '',
      post: this.props.post
    };
  }

  componentDidMount() {
    const { setEditableRef } = this.props;
    setEditableRef && setEditableRef(this.editorRef.current);
  }

  addNewComment = () => {
    const post = { ...this.state.post };
    this.state.post.comments.push({
      description: '',
      isEditable: true
    });
    this.setState({ post });
  };

  renderTags(post) {
    // TODO - Edit / Add tags to a question-post functonality
    if (post.tags.length) {
      return post.tags.map((tag, i) => {
        return (
          <span key={i} className="tag badge badge-secondary">
            {tag}
          </span>
        );
      });
    }
    return null;
  }
  renderPostComments(post) {
    if (post.comments.length) {
      return post.comments.map((comment, i) => {
        return <UserComment key={i} comment={comment}></UserComment>;
      });
    }
    return null;
  }

  onSubmit = () => {
    console.log(JSON.stringify(this.editorRef.current.getData()));
  };

  onUpdate = () => {
    this.setState({
      questionData: data1
    });
  };

  render() {
    const { post, questionData, isEditable } = this.state;
    const isPostEditable = this.props.newPost || isEditable;
    const postStatus = classNames({
      'post-status': true,
      accepted: post.accepted
    });
    const formattedDate = formatDistance(post.askedOn, new Date());
    return (
      <div className="post">
        <div className="d-flex">
          {post.type === 'answer' && (
            <div className={postStatus} title="mark as accepted">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          )}
          <div className="post-details flex-grow-1">
            <div className="row">
              <div className="col-sm post-description text-left">
                {/* <p>{post.description}</p> */}
                <div className="RichEditor-root">
                  <RichTextEditor
                    readOnly={!isPostEditable}
                    defaultValue={questionData}
                    key={hashCode(questionData)}
                    ref={this.editorRef}
                  />
                </div>
              </div>
            </div>
            {post.type === 'question' && (
              <div className="row">
                <div className="col-sm tags d-flex">{this.renderTags(post)}</div>
              </div>
            )}
            <div className="row">
              <div className="col-sm post-actions text-left">
                <button type="button" className="btn btn-link">
                  Edit
                </button>
                <button type="button" className="btn btn-link">
                  Delete
                </button>
              </div>
              <div className="col-sm d-flex justify-content-end text-right">
                <div className="user-info text-left">
                  <div className="timestamp">{`asked ${formattedDate} ago`}</div>
                  <div className="profile-info">
                    <div className="d-inline-block profile-pic">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="user-details d-inline-block">
                      <div className="user-name">{post.user.name}</div>
                      <div className="user-reputation">{post.user.reputation}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="row comments-section">{this.renderPostComments(post)}</div>
            <div className="new-comment">
              <button type="button" className="btn btn-link" onClick={this.addNewComment}>
                Add a comment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
