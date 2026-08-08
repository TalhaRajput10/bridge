import { Component } from "react";
import { captureAppError } from "../lib/telemetry.js";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    captureAppError(error, {
      source: "react-error-boundary",
      componentStack: info.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <main id="main-content" className="app-error-state">
          <p>BRIDGE CST hit a temporary problem.</p>
          <h1>Your progress is safe.</h1>
          <p>Refresh the page to continue. The error has been recorded for review.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Refresh BRIDGE CST
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
