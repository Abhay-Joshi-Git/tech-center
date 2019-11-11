import React from "react";
import { withRouter } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  componentDidCatch(error, info) {
    this.getPageNotFound();
  }
  getPageNotFound = () => {
    this.props.history.push({
      pathname: `/pageNotFound`
    });
  };

  render() {
    if (this.state.hasError) {
      return <h1>{"Page not found"}</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default withRouter(ErrorBoundary);
