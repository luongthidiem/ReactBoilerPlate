import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // Khi có lỗi xảy ra trong component con
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  // Log lỗi ra console (hoặc gửi server)
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught by ErrorBoundary:", error, errorInfo);
  }

  // Reset state lỗi để thử lại
  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="flex flex-col items-center justify-center h-screen p-6 bg-red-50 text-red-700">
          <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
          <p className="mb-4">There was an error rendering this part of the app.</p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
