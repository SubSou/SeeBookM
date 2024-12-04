import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthRoutes } from "./routes";
import InitScreen from "../screens/Auth/InitScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import { WHITE } from "../color";
import TermsOfAuthScreen from "../screens/Auth/TermsOfAuthScreen";
import SignScreen from "../screens/Auth/SignScreen";
import FindEmailScreen from "../screens/Auth/FindEmailScreen";
import KakaoIntegrationSignUp from "../screens/Auth/KakaoIntegrationSignUp";
import KakaoWebView from "../screens/Auth/KakaoWebView";
import PasswordChangeVerificationScreen from "../screens/Auth/PasswordChangeVerificationScreen";
import PasswordChangeScreen from "../screens/Auth/PasswordChangeScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: WHITE },
      }}
      initialRouteName={AuthRoutes.InitPage}
    >
      <Stack.Screen name={AuthRoutes.InitPage} component={InitScreen} />
      <Stack.Screen name={AuthRoutes.LoginPage} component={LoginScreen} />
      <Stack.Screen name={AuthRoutes.TermsPage} component={TermsOfAuthScreen} />
      <Stack.Screen name={AuthRoutes.SignPage} component={SignScreen} />
      <Stack.Screen
        name={AuthRoutes.FindEmailPage}
        component={FindEmailScreen}
      />
      <Stack.Screen
        name={AuthRoutes.PasswordChangeVerificationPage}
        component={PasswordChangeVerificationScreen}
      />
      <Stack.Screen
        name={AuthRoutes.PasswordChagnePage}
        component={PasswordChangeScreen}
      />
      <Stack.Screen
        name={AuthRoutes.KakaoIntegrationPage}
        component={KakaoIntegrationSignUp}
      />
      <Stack.Screen
        name={AuthRoutes.KakaoWebViewPage}
        component={KakaoWebView}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
