import React, { useMemo } from 'react';
import './i18n';
import { useTranslation } from 'react-i18next';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import MapMainScreen from './src/screens/map/MapMainScreen';
import SearchMainScreen from './src/screens/search/SearchMainScreen';
import MyPageMainScreen from './src/screens/mypage/MyPageScreen';
import ProfileEditScreen from './src/screens/mypage/ProfileEditScreen';

import IntroScreen from './src/screens/IntroScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import FindAccountScreen from './src/screens/auth/FindAccountScreen';
import ResetPasswordScreen from './src/screens/auth/ResetPasswordScreen';
import UniversitySearchScreen from './src/screens/auth/UniversitySearchScreen';

import PostListScreen from './src/screens/community/PostListScreen';
import CreatePostScreen from './src/screens/community/CreatePostScreen';
import PostDetailScreen from './src/screens/community/PostDetailScreen';
import PostEditScreen from './src/screens/community/PostEditScreen';
import ChatRoomListScreen from './src/screens/community/ChatRoomListScreen';
import ChatRoomScreen from './src/screens/community/ChatRoomScreen';
import FriendScreen from './src/screens/community/FriendScreen';
import CreateChatRoomScreen from './src/screens/community/CreateChatRoomScreen';

import ChangePasswordScreen from './src/screens/mypage/ChangePasswordScreen';
import EditProfileImageScreen from './src/screens/mypage/EditProfileImageScreen';
import EditNicknameScreen from './src/screens/mypage/EditNicknameScreen';
import EditEmailScreen from './src/screens/mypage/EditEmailScreen';
import EditUsernameScreen from './src/screens/mypage/EditUsernameScreen';
import EditUniversityScreen from './src/screens/mypage/EditUniversityScreen';
import UniversitySelectScreen from './src/screens/mypage/UniversitySelectScreen';
import WithdrawalScreen from './src/screens/mypage/WithdrawalScreen';
import TimetableEditScreen from './src/screens/mypage/TimetableEditScreen';
import TimetableDeleteScreen from './src/screens/mypage/TimetableDeleteScreen';
import CorpusInputScreen from './src/screens/mypage/CorpusInputScreen';
import ChangeLanguageScreen from './src/screens/mypage/ChangeLanguageScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const MyPageStack = createStackNavigator();

const CommunityNavigator = () => (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="PostList" component={PostListScreen} />
        <Drawer.Screen name="CreatePost" component={CreatePostScreen} />
        <Drawer.Screen name="PostDetail" component={PostDetailScreen} />
        <Drawer.Screen name="PostEdit" component={PostEditScreen} />
        <Drawer.Screen name="ChatRoomList" component={ChatRoomListScreen} />
        <Drawer.Screen name="ChatRoom" component={ChatRoomScreen} />
        <Drawer.Screen name="Friend" component={FriendScreen} />
        <Drawer.Screen name="CreateChatRoom" component={CreateChatRoomScreen} />
    </Drawer.Navigator>
);

const MyPageNavigator = () => (
    <MyPageStack.Navigator screenOptions={{ headerShown: false }}>
        <MyPageStack.Screen name="MyPageMain" component={MyPageMainScreen} />
        <MyPageStack.Screen name="ProfileEdit" component={ProfileEditScreen} />
        <MyPageStack.Screen name="TimetableEdit" component={TimetableEditScreen} />
        <MyPageStack.Screen name="TimetableDelete" component={TimetableDeleteScreen} />
        <MyPageStack.Screen name="CorpusInput" component={CorpusInputScreen} />
        <MyPageStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <MyPageStack.Screen name="EditProfileImage" component={EditProfileImageScreen} />
        <MyPageStack.Screen name="EditNickname" component={EditNicknameScreen} />
        <MyPageStack.Screen name="EditEmail" component={EditEmailScreen} />
        <MyPageStack.Screen name="EditUsername" component={EditUsernameScreen} />
        <MyPageStack.Screen name="EditUniversity" component={EditUniversityScreen} />
        <MyPageStack.Screen name="UniversitySelect" component={UniversitySelectScreen} />
        <MyPageStack.Screen name="Withdrawal" component={WithdrawalScreen} />
        <MyPageStack.Screen name="ChangeLanguage" component={ChangeLanguageScreen} />
    </MyPageStack.Navigator>
);

const MainTabNavigator = () => {
    const { t } = useTranslation();

    const routes = useMemo(() => [
        { key: 'Map', label: t('tabs.map'), component: MapMainScreen, icon: require('./src/assets/map.png') },
        { key: 'Search', label: t('tabs.search'), component: SearchMainScreen, icon: require('./src/assets/search.png') },
        { key: 'Community', label: t('tabs.community'), component: CommunityNavigator, icon: require('./src/assets/community.png') },
        { key: 'MyPage', label: t('tabs.mypage'), component: MyPageNavigator, icon: require('./src/assets/mypage.png') },
    ], [t]);

    return (
        <Tab.Navigator
            initialRouteName="Map"
            screenOptions={{ headerShown: false }}
            tabBar={({ state, navigation }) => (
                <View style={styles.tabContainer}>
                    {state.routes.map((route, index) => {
                        const isFocused = state.index === index;
                        const currentRoute = routes.find(r => r.key === route.name);

                        return (
                            <TouchableOpacity
                                key={route.key || route.name}
                                onPress={() => navigation.navigate(route.name)}
                                style={[styles.tabItem, isFocused && styles.focusedTabItem]}
                            >
                                <Image
                                    source={currentRoute?.icon}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                                <Text style={styles.label}>{currentRoute?.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        >
            {routes.map(({ key, component }) => (
                <Tab.Screen key={key} name={key} component={component} />
            ))}
        </Tab.Navigator>
    );
};

const App = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="FindAccount" component={FindAccountScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="UniversitySearch" component={UniversitySearchScreen} />
            <Stack.Screen name="Main" component={MainTabNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
);

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        height: 64,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    focusedTabItem: {
        backgroundColor: '#E6F0FF',
    },
    icon: {
        width: 26,
        height: 26,
        marginBottom: 2,
    },
    label: {
        fontSize: 12,
        color: '#222',
    },
});

export default App;
