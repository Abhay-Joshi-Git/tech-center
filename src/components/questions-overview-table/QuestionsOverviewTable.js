import React, { Component } from 'react';
import './QuestionsOverviewTable.scss';
import QuestionOverviewRow from '../question-overview-row/QuestionOverviewRow';
import PreLoader from '../pre-loader/PreLoader';

class QuestionsOverviewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsDetialsList: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('props', props.questionsData);
    if (props.questionsData !== state.questionsData) {
      return {
        questionsDetialsList: props.questionsData.data
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.questionsData) {
  //     console.log('questions dtaa--', nextProps.questionsData)
  //     this.setState({
  //       questionsDetialsList: nextProps.questionsData.data
  //     });
  //   }
  // }
  onQuestionRowClicked = selectedQuestionObj => {
    console.log('question clicked -- ', selectedQuestionObj);
    this.props.onQuestionRowClicked(selectedQuestionObj);
  };

  render() {
    console.log('questionsDetialsList --', this.state.questionsDetialsList);
    const questionsDetailsItems = this.state.questionsDetialsList.map(questionItem => {
      console.log('quetsions item - ', questionItem.id);
      // return <span>123</span>
      return (
        <QuestionOverviewRow
          key={'question-row-item-' + questionItem.id}
          questionDetails={questionItem}
          onQuestionRowClicked={() => this.onQuestionRowClicked(questionItem)}
        />
      );
    });
    return questionsDetailsItems.length > 0 ? (
      <div className="quetions-section">
        <h3 className="text-left">Top Quetions : </h3>
        <div className="questions-overview-table-wrapper">
          <div className="row mx-0 p-0 questions-overview-table-header-row ">
            <div className="first-column p-4">Answers</div>
            <div className="other-columns p-4 text-left">Question</div>
          </div>
          <div className="row mx-0 content-wrapper">
            <div className="col">{questionsDetailsItems}</div>
          </div>
        </div>
      </div>
    ) : (
      <div className="questions-overview-table-wrapper mt-2">
        <PreLoader />
      </div>
    );
  }
}

export default QuestionsOverviewTable;
