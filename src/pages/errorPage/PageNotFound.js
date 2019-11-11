import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ChoiceDialogModal from "../../components/choice-dialog-modal/ChoiceDialogModal";
import "./PageNotFound.scss";

class PageNotFound extends Component {
  navigateToHomePage = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="page-not-found-container">
        <ChoiceDialogModal
          showModal={true}
          modalWrapperClassName={"col-md-4 wrapper-not-found"}
        >
          <div className="dialog-modal-content-wrapper p-3">
            <div className="row mx-0 p-4">
              <span className="attention-icon mx-auto icon icon-attention-3" />
            </div>
            <div className="row mx-0 pt-3 pb-0 text-center ">
              <div className="col-md-12 note-text-main">{"Oops!"}</div>
            </div>
            <div className="row mx-0 text-center">
              <div className="col-md-12 fs-18 notify-text">
                {"Something is not right. We are looking into the issue."}
              </div>
            </div>

            <div className="row mx-0 p-5 text-center backtest-modal-footer">
              <div className={"col p-2 cursor-pointer"}>
                <button
                  className="btn-orange-transperent pl-3 pr-3 fs-16"
                  onClick={this.navigateToHomePage}
                >
                  {"Back to Home Page"}
                </button>
              </div>
            </div>
          </div>
        </ChoiceDialogModal>
      </div>
    );
  }
}

export default withRouter(PageNotFound);
