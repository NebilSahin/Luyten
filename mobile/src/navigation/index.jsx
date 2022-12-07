import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Home from '../screens/home';
import Search from '../screens/search';
import Profile from '../screens/profile';
import Auth from '../screens/auth';
// import AuthorDetailScreen from 'src/screens/author_detail';
// import MangaDetailScreen from 'src/screens/manga_detail';
// import CharacterDetailScreen from 'src/screens/character_detail';
// import Onboarding from 'src/screens/onboarding';
import {BottomBarParamList, RootStackParamList} from './types';
import {RootState} from 'src/redux/AppStore';
// import ChapterSelectModal from 'src/modals/ChapterSelectModal';
// import ThemeSelectModal from 'src/modals/ThemeSelectModal';
// import LanguageSelectModal from 'src/modals/LanguageSelectModal';
// import DeleteDataWarnModal from 'src/modals/DeleteDataWarnModal';
import {THEME} from '../shared/Constant';
import * as Animatable from 'react-native-animatable';
import {themeSelector} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

const THEME_CONFIG = require('../theme/themes.json');

const AppStack = createStackNavigator();
const BottomBar = createBottomTabNavigator();

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    activeIcon: 'home-variant',
    inActiveIcon: 'home-variant-outline',
    component: Home,
  },
  {
    route: 'Search',
    label: 'Search',
    activeIcon: 'feature-search',
    inActiveIcon: 'feature-search-outline',
    component: Search,
  },
    {
      route: 'Notification',
      label: 'Notification',
      activeIcon: 'bell',
      inActiveIcon: 'bell-outline',
      component: Search,
    },
  {
    route: 'Profile',
    label: 'Profile',
    activeIcon: 'account-box',
    inActiveIcon: 'account-box-outline',
    component: Profile,
  },
];

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const THEME = themeSelector();

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: {scale: 2},
        0.2: {scale: 2.8},
        1: {scale: 2.5},
      });
    } else {
      viewRef.current.animate({0: {scale: 2.5}, 1: {scale: 2}});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.buttonContainer}>
      <Animatable.View
        ref={viewRef}
        duration={600}
        style={styles.buttonContainer}>
        <MCIIcon
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={
            focused
              ? THEME_CONFIG[THEME].primary
              : THEME_CONFIG[THEME].secondaryDarkFaint
          }
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

function BottomBarNav() {
  //   const language = useSelector((state) => state.user.language);
  const THEME = themeSelector();
  const session = useSelector(state => state.sessionState);
  const navigation = useNavigation();
  return (
    <BottomBar.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 100,
          position: 'absolute',
          backgroundColor: THEME_CONFIG[THEME].background,
        },
        headerBackgroundContainerStyle: {
          backgroundColor: THEME_CONFIG[THEME].screenBackground,
        },
        headerStyle: {
          elevation: 0,
          backgroundColor: THEME_CONFIG[THEME].background,
        },
        headerTitleStyle: {
          color: THEME_CONFIG[THEME].text,
        },
      }}>
      {TabArr.map((item, index) => {
        return (
          <BottomBar.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </BottomBar.Navigator>
  );
}

function AppNav() {
  const sessionIsActive = useSelector(state => state.userSession.isActive);

  //   const store = useRef(undefined);
  //   const queryClient = useRef(undefined);

  //   useEffect(() => {
  //     store.current = store;
  //     queryClient.current = queryClient;
  //     setIsLoading(false);
  //   }, []);

  //   if (isLoading) {
  //     // setTimeout(() => {
  //     //   setIsLoading(false);
  //     // }, 1000);
  //     return <Loading isAppReady={!isLoading} />;
  //   }

  return (
    <AppStack.Navigator
      initialRouteName={sessionIsActive ? 'BarNav' : 'AuthNav'}
      screenOptions={{
        headerShown: false,
      }}>
      {sessionIsActive ? (
        <AppStack.Screen
          name="BarNav"
          component={BottomBarNav}
          options={{
            animationTypeForReplace: sessionIsActive ? 'pop' : 'push',
          }}
        />
      ) : (
        <AppStack.Screen name="AuthNav" component={Auth} />
      )}

      {/* <AppStack.Screen name="category" component={Category} />
      <AppStack.Screen name="author_detail" component={AuthorDetailScreen} />
      <AppStack.Screen name="manga_detail" component={MangaDetailScreen} />
      <AppStack.Screen
        name="character_detail"
        component={CharacterDetailScreen}
      /> */}
      {/* <AppStack.Group
        screenOptions={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}>
        <AppStack.Screen
          name="chapter_selection_modal"
          component={ChapterSelectModal}
        />
        <AppStack.Screen
          name="theme_selection_modal"
          component={ThemeSelectModal}
        />
        <AppStack.Screen
          name="language_selection_modal"
          component={LanguageSelectModal}
        />
        <AppStack.Screen
          name="delete_data_warn_modal"
          component={DeleteDataWarnModal}
        />
      </AppStack.Group> */}
    </AppStack.Navigator>
  );
}

export default AppNav;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
