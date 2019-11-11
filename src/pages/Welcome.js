import React from 'react';

import './Welcome.scss';

export default class Welcome extends React.Component {
  render() {
    return (
      <div className="row h-100 welcome-page">
        <div className="col-sm d-flex align-items-center justify-content-center">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Ask a question</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            </div>
          </div>
        </div>
        <div className="col-sm d-flex align-items-center justify-content-center">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Mentor</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
