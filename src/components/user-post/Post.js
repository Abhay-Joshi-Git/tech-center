import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import { formatDistance, subDays } from 'date-fns';

import RichTextEditor from '../text-editor/RichTextEditor';
import { hashCode } from '../../utils';
import UserComment from '../user-comment/Comment';
import './Post.scss';
import DropDownCheckboxPanel from '../drop-down-checkbox-panel/DropDownCheckboxPanel';
import PreferencesData from '../../pages/preferences/PreferencesData.json';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
      post: this.props.post,
      isEditable: this.props.isEditable,
      topicsOfInterest: [],
      selectedTopicOfInterest: []
    };
  }

  componentDidMount() {
    const { setEditableRef } = this.props;
    setEditableRef && setEditableRef(this.editorRef.current);

    this.setState({
      topicsOfInterest: this.getTags(PreferencesData.topicsOfInterest)
    });
  }

  getTags = (topicsOfInterestRecieved) => {
    const {post} = this.state;
    const tagsWithSelectedTags = topicsOfInterestRecieved.map(tag => {
      post.tags.map((preSelectedTag) => {
        if(tag.label === preSelectedTag) {
          tag.selected = true
        };
      });
      return tag;
    });
    return tagsWithSelectedTags;
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

  onSelectionChanged = (selectionChangedFor, selectedLabels) => {
    switch (selectionChangedFor) {
      case "question_tags":

        this.setState({
          selectedTopicOfInterest: selectedLabels.filter(item => item.selected)
        });
        break;
      default:
        break;
    }
  };

  renderTags() {
    // TODO - Edit / Add tags to a question-post functonality
    const { topicsOfInterest, isEditable } = this.state;

    const isPostEditable = this.props.newPost || isEditable;

    return (
      <DropDownCheckboxPanel
          keyVal={"question_tags"}
          disabledView={!isPostEditable}
          labelsObj={topicsOfInterest}
          placeHolderText={"Select Tags"}
          onSelectionChanged={selectedLabels =>
            this.onSelectionChanged("question_tags", selectedLabels)
          }
      />
    );
  }
  renderPostComments(post) {
    if (post.comments.length) {
      return post.comments.map((comment, i) => {
        return <UserComment key={i} comment={comment}></UserComment>;
      });
    }
    return null;
  }

  onEditPostClicked = () => {
    this.setState({
      isEditable: true
    })
  }

  onDeletePostClicked = () => {
    // TODO: delete post need to implement
    this.setState({
      isEditable: false
    });
  }

  onPostEditDone = () => {
    // TODO: post edit done API integration done
    this.setState({
      isEditable: false
    });
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
                {/* <p>{post.description}</p> */}
                <div>
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
                <div className="col">
                  {this.renderTags()}
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-sm post-actions text-left">
                { !isEditable ? <button type="button" className="btn btn-link"
                  onClick={this.onEditPostClicked}>
                  Edit
                </button> :
                <button type="button" className="btn btn-link"
                  onClick={this.onPostEditDone}>
                  Done
                </button>}
                <button type="button" className="btn btn-link"
                  onClick={this.onDeletePostClicked}>
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
