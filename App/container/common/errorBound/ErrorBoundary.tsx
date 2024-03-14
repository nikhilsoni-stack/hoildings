import React, {Component, ErrorInfo} from 'react';
import {Text, View} from 'react-native';

interface ErrorBoundaryState {
  hasError: boolean;
}
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    //console.error('Error:', error, errorInfo);
    this.setState({hasError: true});
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Something went wrong!</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
