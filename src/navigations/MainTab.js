import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabRoutes } from "./routes";
import HomeScreen from "../screens/Main/HomeScreen";
import { screenWidth, vScale } from "../Normalization";
import CategoriScreen from "../screens/Main/CategoriScreen";
import LikeScreen from "../screens/Main/LikeScreen";
import MyProfileScreen from "../screens/Main/MyProfileScreen";
import { SIGNATURECOLOR, TERMSAF } from "../color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserContext } from "../contexts/UserContext";
import { useMainContext } from "../contexts/MainContext ";
import {
  requestMainProfileGet,
  requestMainReViewDatas,
  requestMainWishListGet,
} from "../Api/Main/MainApi";
import { useState } from "react";

const Tab = createBottomTabNavigator();

const getTabBarIcon = ({ focused, color, size, name }) => {
  return <MaterialCommunityIcons name={name} size={24} color={color} />;
};

const MainTab = () => {
  const {
    form,
    dispatch,
    setMainProfileData,
    handleTokenExpiry,
    handleSystemError,
  } = useMainContext();
  const { user } = useUserContext();

  const [wishListData, setWishListData] = useState([]);
  const [homeDats, setHomeDatas] = useState(null);

  const handleWishList = async () => {
    const { statusData, ...responseData } = await requestMainWishListGet(
      user.header,
      1
    );
    if (statusData === 200) {
      setWishListData(responseData);
    } else if (statusData === 400) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  const handleMainReViewList = async () => {
    const { statusData, ...responseData } = await requestMainReViewDatas(
      user.header
    );
    if (statusData === 200) {
      setHomeDatas(responseData);
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          position: "absolute", // 절대 위치로 설정
          bottom: form.isBtomY, // 아래에서부터의 거리 설정
          left: (screenWidth + 40) / 2, // 왼쪽 위치 설정
          marginLeft: -(screenWidth / 2),
          width: screenWidth - 40,
          alignSelf: "center", // 중앙 정렬 설정
          paddingHorizontal: 30,
          borderRadius: 10,
          height: vScale(60),
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: SIGNATURECOLOR,
        tabBarInactiveTintColor: TERMSAF,
      }}
    >
      <Tab.Screen
        listeners={({ navigation, route }) => ({
          tabPress: async (e) => {
            await handleMainReViewList();
          },
        })}
        name={MainTabRoutes.HomePage}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: "home" }),
        }}
      >
        {(props) => (
          <HomeScreen
            dispatch={dispatch}
            homeDatas={homeDats}
            setHomeDatas={setHomeDatas}
            {...props}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        listeners={({ navigation, route }) => ({})}
        name={MainTabRoutes.CategoriPage}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: "book" }),
        }}
      >
        {(props) => <CategoriScreen dispatch={dispatch} {...props} />}
      </Tab.Screen>

      <Tab.Screen
        listeners={({ navigation, route }) => ({
          tabPress: async (e) => {
            await handleWishList();
          },
        })}
        name={MainTabRoutes.LikePage}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: "heart" }),
        }}
      >
        {(props) => (
          <LikeScreen
            wishListData={wishListData}
            setWishListData={setWishListData}
            dispatch={dispatch}
            {...props}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        listeners={({ navigation, route }) => ({
          tabPress: async (e) => {
            const { statusData, ...responseData } = await requestMainProfileGet(
              user.header
            );
            if (statusData === 200) {
              setMainProfileData(responseData);
            } else if (statusData === 400) {
              handleTokenExpiry();
            } else {
              handleSystemError();
            }
          },
        })}
        name={MainTabRoutes.MyProfilePage}
        component={MyProfileScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: "account" }),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
