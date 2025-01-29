import React, { Component, ErrorInfo, ReactNode } from 'react';

// קומפוננטה ErrorBoundary
interface ErrorBoundaryProps {
  children: ReactNode; // הוספת טיפוס ל-children
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>; // הצגת הודעה או קומפוננטה מותאמת אישית במקרה של שגיאה
    }

    return this.props.children; // הצגת ה-children במקרה שאין שגיאה
  }
}

export default ErrorBoundary;
