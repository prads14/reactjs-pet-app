import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("there is the error in the component", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          There is a error in the component. Please{" "}
          <Link to="/">click here</Link> to go back to homePage.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
