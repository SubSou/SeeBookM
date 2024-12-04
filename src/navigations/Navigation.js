import { useUserContext } from '../contexts/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { SignUpProvider } from '../contexts/SignUpContext';
import { MainProvider } from '../contexts/MainContext ';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const Navigation = () => {
  const { user } = useUserContext();

  return (
    <NavigationContainer>
      {user ? (
        <SignUpProvider>
          <ActionSheetProvider>
            <MainProvider>
              <MainStack />
            </MainProvider>
          </ActionSheetProvider>
        </SignUpProvider>
      ) : (
        <SignUpProvider>
          <AuthStack />
        </SignUpProvider>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
