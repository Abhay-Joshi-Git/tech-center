import React, { Component } from 'react';
import { connect } from 'react-redux';
import './QuestionsPage.scss';
import QuetionsOverviewTable from '../../components/questions-overview-table/QuestionsOverviewTable';
// import { fetchQuestionsSummaryDataAPI } from './QuestionsPage_Service';
import QuestionsData from './QuestionsData.json';
import axios from 'axios';
class QuestionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsData: {
        data: []
      }
    };
  }

  componentDidMount() {
    // Fetch Questions list
    axios
      .get('/threads')
      .then(threads => {
        this.setState({
          questionsData: {
            data: threads.data.content.map((thread, i) => ({
              ...thread,
              tags: [],
              totalAnswers: i,
              postedBy: QuestionsData.data[i] ? QuestionsData.data[i].postedBy : 'John Doe'
            }))
          }
        });
      })
      .catch(error => {
        console.log('ERROR', error);
      });
  }

  askNewQuestion = () => {
    this.props.history.push({
      pathname: `/threads/new`
    });
  };

  onQuestionRowClicked = selectedQueObj => {
    localStorage.setItem('selectedQueId', selectedQueObj.id);
    // this.props.history.push({
    //   pathname: `/threads/${selectedQueObj.id}`
    // });
  };
  render() {
    return (
      <div className="container-fluid mx-0 p-0 question-page-container">
        <div className="row mx-0 p-4">
          <div className="d-flex w-100 justify-content-end">
            <button
              type="button"
              class="btn btn-primary new-question-button"
              onClick={this.askNewQuestion}
            >
              Ask a Question
            </button>
          </div>
          <div className="col-md-12">
            <QuetionsOverviewTable
              questionsData={this.state.questionsData}
              onQuestionRowClicked={this.onQuestionRowClicked}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // auth: state.auth,
    questionsData: state.questionsData
  };
};

export default connect(
  mapStateToProps
  // {
  //   fetchQuestionsData: fetchQuestionsDataAction
  // }
)(QuestionsPage);
