import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import { formatDistance, subDays } from 'date-fns';

import RichTextEditor from '../text-editor/RichTextEditor';
import { hashCode } from '../../utils';
import UserComment from '../user-comment/Comment';
import './Post.scss';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
      post: this.props.post,
      isEditable: this.props.isEditable
    };
  }

  componentDidMount() {
    const { setEditableRef } = this.props;
    setEditableRef && setEditableRef(this.editorRef.current);
  }
  getPostData = () => {
    return {
      description: JSON.stringify(this.editorRef.current.getData()),
      tags: ['JS', 'CSS', 'HTML']
    };
  };

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

  onUpdate = () => {};

  renderPostDescription = () => {
    const { isEditable, post } = this.state;

    return (
      <div className="row">
        <div className="col-sm post-description text-left">
          <div className="RichEditor-root">
            <RichTextEditor
              readOnly={!isEditable}
              defaultValue={post.description}
              key={hashCode(post.description)}
              ref={this.editorRef}
            />
          </div>
        </div>
      </div>
    );
  };

  renderUserDetails = post => {
    const formattedDate = post.createdAt && formatDistance(post.createdAt, new Date());
    return post.user ? (
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
    ) : null;
  };

  render() {
    const { post } = this.state;
    const postStatus = classNames({
      'post-status': true,
      accepted: post.accepted
    });

    return (
      <div className="post">
        <div className="d-flex">
          {post.type === 'answer' && (
            <div className={postStatus} title="mark as accepted">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          )}
          <div className="post-details flex-grow-1">
            {this.renderPostDescription()}
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
              {this.renderUserDetails(post)}
            </div>
            <hr></hr>
            <div className="row comments-section">{this.renderPostComments(post)}</div>
            {post.createdAt && (
              <div className="new-comment">
                <button type="button" className="btn btn-link" onClick={this.addNewComment}>
                  Add a comment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
