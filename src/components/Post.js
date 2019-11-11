import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';

import './Post.scss';
export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        return <span class="tag badge badge-secondary">{tag}</span>;
      });
    }
    return null;
  }
  renderPostComments(post) {
    if (post.comments.length) {
      return post.comments.map(comment => {
        return (
          <div className="col-12 text-left user-comment">
            <div className="d-inline-block">{`${comment.description} - `} </div>
            <button type="button p-0 comment-user" className="btn-link">
              {comment.user.name}
            </button>
            <div className="d-inline-block comment-timestamp">{'Posted 1 hours ago'}</div>
            <hr></hr>
          </div>
        );
      });
    }
    return null;
  }
  render() {
    const { post } = this.state;
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
                <p>{post.description}</p>
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
