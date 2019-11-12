import React, { Component } from 'react';
import './QuestionOverviewRow.scss';
import LabelSelectable from '../label-selectable/LabelSelectable';
import { formatDistance } from 'date-fns';

class QuestionOverviewRow extends Component {
  // constructor(props) {
  //   super(props);
  // }

  onQuestionRowClicked = e => {
    this.props.onQuestionRowClicked();
  };

  tagClicked = tagName => {
    console.log('tagName clicked -- ', tagName);
  };
  render() {
    const { questionDetails } = this.props;

    const formattedDate =
      questionDetails && formatDistance(new Date(questionDetails.createdAt), new Date());

    const questionTags = questionDetails.tags.map((item, index) => {
      return (
        <LabelSelectable
          key={'selectable-label-' + index}
          displayLabel={item}
          onClick={this.tagClicked}
        />
      );
    });
    return questionDetails && questionDetails.id ? (
      <div
        key={'question-row-key-' + questionDetails.id}
        className="row question-overview-row align-items-center pt-3 pb-3 cursor-pointer "
        onClick={this.onQuestionRowClicked}
      >
        <span className="first-column pl-4">{questionDetails.totalAnswers}</span>
        <span className="other-columns pl-4 text-left">
          <span className="row pb-3">
            <span className="col">{questionDetails.title}</span>
          </span>
          <span className="row ">
            <span className="col-sm-9">{questionTags}</span>
            <span className="col-sm-3 posted-by">
              <div className="row">Posted By: {questionDetails.postedBy}</div>
              <div className="row">{`Last updated: ${formattedDate} ago`} </div>
            </span>
          </span>
        </span>
      </div>
    ) : null;
  }
}

export default QuestionOverviewRow;
