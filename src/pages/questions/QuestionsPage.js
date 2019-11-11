import React, { Component } from "react";
import { connect } from "react-redux";
import "./QuestionsPage.scss";
import QuetionsOverviewTable from '../../components/questions-overview-table/QuestionsOverviewTable';
// import { fetchQuestionsSummaryDataAPI } from './QuestionsPage_Service';
import QuestionsData from './QuestionsData.json'
class QuestionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsData: QuestionsData
    };
  }

  componentDidMount() {
    // const userId = this.props.auth.data.id;
    // fetchQuestionsSummaryDataAPI().then(res => res.data);
  }

  // componentWillReceiveProps(nextProps) {
  //   // if (
  //   //   nextProps.questionsData.data &&
  //   //   nextProps.questionsData.data.values
  //   // ) {
  //   //   this.setState({
  //   //     questionsData: nextProps.questionsData.data
  //   //   });
  //   // }
  //   if (localStorage.getItem("selectedQueId") === null) {
  //     localStorage.setItem("selectedQueId", -1);
  //   }
  // }
  onQuestionRowClicked = selectedQueObj => {
    localStorage.setItem("selectedQueId", selectedQueObj.id);
    this.props.history.push({
      pathname: `/threads/${
        selectedQueObj.id
      }`
    });
  };
  render() {
    return (
      <div className="container-fluid mx-0 p-0 question-page-container">
        <div className="row mx-0 p-4">
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
