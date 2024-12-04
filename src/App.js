import { LogBox } from 'react-native';
import { UserProvider } from './contexts/UserContext';
import Navigation from './navigations/Navigation';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  // 특정 경고 무시
  LogBox.ignoreLogs([
    'Warning: Rating: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',

    'Encountered an error loading page',
  ]);

  return (
    <UserProvider>
      <StatusBar style="dark" />
      <Navigation />
    </UserProvider>
  );
};

export default App;
