import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import RichTextEditor from './text-editor/RichTextEditor';

import { hashCode } from '../utils';

import './Post.scss';
import UserComment from './user-comment/Comment';

const data1 = `{"blocks":[{"key":"5ahok","text":"this is demo","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"30l8d","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8ch67","text":"import React from 'react';","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"455hj","text":"export default class App extends React.component {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"90q02","text":"  render() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c6058","text":"    return <div> Test </div>","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9kgvh","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5ive4","text":"}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"23vge","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a5od7","text":"please let me know.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`;

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
      questionData: '',
      post: {
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
        type: 'question',
        tags: ['Javascript', 'React', 'Redux']
      }
    };
  }
  renderTags(post) {
    if (post.tags.length) {
      return post.tags.map(tag => {
        return <span className="tag badge badge-secondary">{tag}</span>;
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
  render() {
    const { post, questionData } = this.state;
    const postStatus = classNames({
      'post-status': true,
      accepted: post.accepted
    });
    return (
      <div className="post">
        <div className="d-flex">
          <div className={postStatus} title="mark as accepted">
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="post-details flex-grow-1">
            <div className="row">
              <div className="col-sm post-description text-left">
                {/* <p>{post.description}</p> */}
                <div className="RichEditor-root">
                  <RichTextEditor
                    readOnly={false}
                    defaultValue={questionData}
                    key={hashCode(questionData)}
                    ref={this.editorRef}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm tags d-flex">{this.renderTags(post)}</div>
            </div>
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
                  <div className="timestamp">{'asked 2 hours ago'}</div>
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
          </div>
        </div>
      </div>
    );
  }
}
