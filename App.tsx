import ErrorBoundary from './App/container/common/errorBound/ErrorBoundary';
import PortfolioScreen from './App/container/portfolio/screens/PortfolioScreen';
const App = () => {
  return (
    <ErrorBoundary>
      <PortfolioScreen />
    </ErrorBoundary>
  );
};

export default App;
