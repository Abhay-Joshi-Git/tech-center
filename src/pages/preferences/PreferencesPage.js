import React, { Component } from "react";
import { connect } from "react-redux";
import "./PreferencesPage.scss";
import FloatingLabelInputText from "../../components/floating-label-input-text/FloatingLabelInputText";
import DropDownCheckboxPanel from "../../components/drop-down-checkbox-panel/DropDownCheckboxPanel";
import PreferencesData from './PreferencesData.json'
class PreferencesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      selectedTopicOfInterest: [],
      topicsOfInterest: [],
      isUpdating: false,
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      isUpdatedSuccess: false
    };
  }

  componentDidMount() {
    // const userId = this.props.auth.data.id;
    // this.props.fetchUserPreferences(userId);
    // console.log('topic of interest: ', PreferencesData)
    this.setState({
      topicsOfInterest: PreferencesData.topicsOfInterest
    })
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.userProfile) {
  //     this.setState({
  //       isUpdating: nextProps.userProfile.isFetching,
  //       isUpdatedSuccess: nextProps.userProfile.isUpdatedSuccess ? true : false
  //     });
  //     // when update is done we need to navigate user to home page
  //     if (
  //       !nextProps.userProfile.isFetching &&
  //       nextProps.userProfile.isUpdatedSuccess
  //     ) {
  //       this.setState({
  //         isUpdatedSuccess: true
  //       });
  //       this.props.history.push("/");
  //     }
  //   }
  //   const userProfileData = nextProps.userProfile.data;
  //   if (userProfileData && userProfileData.preference && userProfileData.user) {
  //     this.setState({
  //       firstName: userProfileData.user.first_name
  //         ? userProfileData.user.first_name
  //         : "",
  //       lastName: userProfileData.user.last_name
  //         ? userProfileData.user.last_name
  //         : "",
  //       email: userProfileData.user.email ? userProfileData.user.email : "",
  //       topicsOfInterest: userProfileData.preference.topic_list
  //         ? userProfileData.preference.topic_list
  //         : [],
  //       selectedTopicOfInterest: userProfileData.preference.topic_list
  //         ? userProfileData.preference.topic_list.filter(item => item.selected)
  //         : []
  //     });
  //   }
  // }

  saveClicked = () => {
    // const {
    //   firstName,
    //   lastName,
    //   email,
    //   selectedTopicOfInterest
    // } = this.state;
    // const userProfileObj = {
    //   user: {
    //     id: this.props.auth.data.id,
    //     first_name: firstName,
    //     last_name: lastName,
    //     email
    //   },
    //   preference: {
    //     topic_list: selectedTopicOfInterest
    //   }
    // };

    // const userId = this.props.auth.data.id;
    // this.setState({
    //   isUpdating: true
    // });
    // this.props.updateUserProfileAction(userId, userProfileObj);
    this.props.history.push("/");
  };

  inputTextModified = (inputVal, modifiedInputField) => {
    switch (modifiedInputField) {
      case "firstName":
        this.setState({
          firstName: inputVal
        });
        break;
      case "lastName":
        this.setState({
          lastName: inputVal
        });
        break;
      case "email":
        this.setState({
          email: inputVal
        });
        break;
      default:
        break;
    }
  };

  validateField = (inputVal, modifiedInputField) => {
    let valid;
    switch (modifiedInputField) {
      case "firstName":
        valid = inputVal.length > 0 ? inputVal.match(/^[a-zA-Z0-9]*$/) : false;
        this.setState({
          firstNameError: valid ? false : true
        });
        break;
      case "lastName":
        valid = inputVal.length > 0 ? inputVal.match(/^[a-zA-Z0-9]*$/) : false;
        this.setState({
          lastNameError: valid ? false : true
        });
        break;
      case "email":
        valid =
          inputVal.length > 0
            ? inputVal.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
            : false;
        this.setState({
          emailError: valid ? false : true
        });
        break;
      default:
        break;
    }
  };

  onSelectionChanged = (selectionChangedFor, selectedLabels) => {
    switch (selectionChangedFor) {
      case "preferenceTopics":
        this.setState({
          selectedTopicOfInterest: selectedLabels.filter(item => item.selected)
        });
        break;
      default:
        break;
    }
  };
  

  onCancel = () => {
    this.props.history.push("/");
  };
  checkIfAnyMendatoryFieldIsInValid = () => {
    const {
      firstNameError,
      lastNameError,
      emailError,
      topicsOfInterest
    } = this.state;
    return (
      firstNameError ||
      lastNameError ||
      emailError ||
      topicsOfInterest.length < 1
    );
  };
  render() {
    const {
      firstName,
      lastName,
      email,
      topicsOfInterest,
      isUpdating
    } = this.state;

   
    const cancelBtnClassName = `${
      isUpdating
        ? "d-none"
        : "btn-orange-transperent col cursor-pointer"
    }`;
    const saveBtnClassName = `btn-orange-rounded ${
      this.checkIfAnyMendatoryFieldIsInValid() || isUpdating
        ? " btn-disabled"
        : ""
    }`;
    return (
      <div className="container-fluid mx-0 p-0 preferences-container">
        <header className="row mx-0 header-setup align-items-center">
          <div className="col text-center p-0">
              <span className="logo-text"> Setup Profile </span>
          </div>
        </header>
        <div className="pb-3">
          <div className="row mx-0 mt-5">
            <div className="label-color col-md-6 offset-md-3 fs-18">
              Set Preferences
            </div>
            <div className="col-md-6 offset-md-3 mt-2">
              <DropDownCheckboxPanel
                keyVal={"preferenceTopics"}
                labelsObj={topicsOfInterest}
                placeHolderText={"Select Topic of Interest"}
                onSelectionChanged={selectedLabels =>
                  this.onSelectionChanged("preferenceTopics", selectedLabels)
                }
              />
            </div>
          </div>
        </div>
        <footer className="row mx-0 pt-3 pb-3">
          {/* <div className="row mx-0 p-3 select-strategy-footer"> */}
          <div className="col-md-6 offset-md-3">
            <div className="row mx-0 p-0">
              <div className={cancelBtnClassName} onClick={this.onCancel}>
                {"Cancel"}
              </div>
              <div className="col p-0 text-right">
                <button className={saveBtnClassName} onClick={this.saveClicked}>
                  {!this.state.isUpdating ? "Save" : "Saving.."}
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // auth: state.auth,
    // userProfile: state.userProfile
  };
};

export default connect(
  mapStateToProps
  // {
  //   preferenceSetAction,
  //   fetchUserPreferences: fetchUserPreferencesAction,
  //   updateUserProfileAction: updateUserProfileAction
  // }
)(PreferencesPage);

// export default PreferencesPage;
