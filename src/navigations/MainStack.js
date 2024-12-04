import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthRoutes, MainRoutes, MainStackRoutes } from './routes';
import MainTab from './MainTab';
import CameraScreen from '../screens/Main/CameraScreen';
import SearchScreen from '../screens/Main/SearchScreen';
import SearchDetailScreen from '../screens/Main/SearchDetailScreen';
import CommentWriteScreen from '../screens/Main/CommentWriteScreen';
import NoticePage from '../screens/Main/NoticePage';
import FAQPage from '../Components/Independent/Main/FAQPage';
import CustomerInquiryPage from '../Components/Independent/Main/CustomerInquiryPage';
import TermsPage from '../Components/Independent/Main/TermsPage';
import LogoutPage from '../Components/Independent/Main/LogoutPage';
import DeleteAccountPage from '../Components/Independent/Main/DeleteAccountPage';
import PasswordChangeVerificationScreen from '../screens/Auth/PasswordChangeVerificationScreen';
import PasswordChangeScreen from '../screens/Auth/PasswordChangeScreen';
import FindEmailScreen from '../screens/Auth/FindEmailScreen';
import ProfileSettingPage from '../Components/Independent/Main/ProfileSettingPage';
import ImagePickerScreen from '../screens/Main/ImagePickerScreen';
import TheirReviewsScreen from '../screens/Main/TheirReviewsScreen';
import ReportScreen from '../screens/Main/ReportScreen';
import PasswordVerification from '../Components/Independent/Main/PasswordVerification';
import ProfileEditOptions from '../Components/Independent/Main/ProfileEditOptions';
import ProfileNickNameChangePage from '../Components/Independent/Main/ProfileNickNameChangePage';
import ProfilePasswordChangePage from '../Components/Independent/Main/ProfilePasswordChangePage';
import CategoriDetailSceen from '../screens/Main/CategoriDetailSceen';
import LatestReviewDetailScreen from '../screens/Main/LatestReviewDetailScreen';
import MyReviewScreen from '../screens/Main/MyReviewScreen';

import CustomerEditScreen from '../screens/Main/CustomerEditScreen';
import CustomerListScreen from '../screens/Main/CustomerListScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={MainStackRoutes.MainTab}
    >
      <Stack.Screen name={MainStackRoutes.MainTab} component={MainTab} />
      <Stack.Screen
        name={MainStackRoutes.SearchPage}
        component={SearchScreen}
      />
      <Stack.Screen
        name={MainStackRoutes.CameraPage}
        component={CameraScreen}
      />

      <Stack.Screen
        name={MainStackRoutes.DetailPage}
        component={SearchDetailScreen}
      />
      <Stack.Screen
        name={MainStackRoutes.CommentWritePage}
        component={CommentWriteScreen}
      />
      <Stack.Screen name={MainStackRoutes.NoticePage} component={NoticePage} />
      <Stack.Screen
        name={MainStackRoutes.ReviewPage}
        component={MyReviewScreen}
      />
      <Stack.Screen name={MainStackRoutes.FAQPage} component={FAQPage} />
      <Stack.Screen
        name={MainStackRoutes.CustomerInquiryPage}
        component={CustomerInquiryPage}
      />
      <Stack.Screen name={MainStackRoutes.TermsPage} component={TermsPage} />
      <Stack.Screen name={MainStackRoutes.LogoutPage} component={LogoutPage} />
      <Stack.Screen
        name={MainStackRoutes.DeleteAccountPage}
        component={DeleteAccountPage}
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
        name={AuthRoutes.FindEmailPage}
        component={FindEmailScreen}
      />
      <Stack.Screen
        name={MainStackRoutes.ProfileSettingPage}
        component={ProfileSettingPage}
      />
      <Stack.Screen
        name={MainStackRoutes.ImagePickerPage}
        component={ImagePickerScreen}
      />
      <Stack.Screen
        name={MainStackRoutes.TheirReViewPage}
        component={TheirReviewsScreen}
      />
      <Stack.Screen
        name={MainStackRoutes.ReportPage}
        component={ReportScreen}
      />
      <Stack.Screen
        name={MainStackRoutes.PasswordVerificationPage}
        component={PasswordVerification}
      />
      <Stack.Screen
        name={MainStackRoutes.ProfileEditOptionsPage}
        component={ProfileEditOptions}
      />
      <Stack.Screen
        name={MainStackRoutes.ProfileNickNameChangePage}
        component={ProfileNickNameChangePage}
      />
      <Stack.Screen
        name={MainStackRoutes.ProfilePasswordChangePage}
        component={ProfilePasswordChangePage}
      />
      <Stack.Screen
        name={MainStackRoutes.LatestReviewDetailPage}
        component={LatestReviewDetailScreen}
      />
      <Stack.Screen
        name={MainStackRoutes.CategoriDetailPage}
        component={CategoriDetailSceen}
      />
      <Stack.Screen
        name={MainStackRoutes.CustomerEditScreen}
        component={CustomerEditScreen}
      />
      <Stack.Screen
        name={MainStackRoutes.CustomerListScreen}
        component={CustomerListScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
