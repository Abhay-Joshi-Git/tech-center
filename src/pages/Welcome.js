import React from 'react';

import './Welcome.scss';

export default class Welcome extends React.Component {
  render() {
    return (
      <div class="row h-100 welcome-page">
        <div class="col-sm d-flex align-items-center justify-content-center">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Ask a question</h5>
              <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            </div>
          </div>
        </div>
        <div class="col-sm d-flex align-items-center justify-content-center">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Mentor</h5>
              <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
