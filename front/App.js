import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, TouchableOpacity, View } from 'react-native';

import MapMainScreen from './src/screens/map/MapMainScreen';
import SearchMainScreen from './src/screens/search/SearchMainScreen';
import MyPageMainScreen from './src/screens/mypage/MyPageMainScreen';
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// --- 커뮤니티: 게시판 Stack ---
const BoardScreen = () => {
    const BoardStack = createStackNavigator();
    return (
        <BoardStack.Navigator screenOptions={{ headerShown: false }}>
            <BoardStack.Screen name="PostList" component={PostListScreen} />
            <BoardStack.Screen name="CreatePost" component={CreatePostScreen} />
            <BoardStack.Screen name="PostDetail" component={PostDetailScreen} />
            <BoardStack.Screen name="PostEdit" component={PostEditScreen} />
        </BoardStack.Navigator>
    );
};

// --- 커뮤니티: 채팅 Stack ---
const ChatScreen = () => {
    const ChatStack = createStackNavigator();
    return (
        <ChatStack.Navigator screenOptions={{ headerShown: false }}>
            <ChatStack.Screen name="ChatRoomList" component={ChatRoomListScreen} />
            <ChatStack.Screen name="ChatRoom" component={ChatRoomScreen} />
        </ChatStack.Navigator>
    );
};

// --- 커뮤니티: 친구관리 Stack ---
const FriendsScreen = () => {
    const FriendsStack = createStackNavigator();
    return (
        <FriendsStack.Navigator screenOptions={{ headerShown: false }}>
            <FriendsStack.Screen name="FriendList" component={FriendScreen} />
        </FriendsStack.Navigator>
    );
};

// --- Drawer 내부 화면들 ---
const DrawerNavigator = () => (
    <Drawer.Navigator screenOptions={{ drawerPosition: 'right', headerShown: false }}>
        <Drawer.Screen name="게시판" component={BoardScreen} />
        <Drawer.Screen name="채팅" component={ChatScreen} />
        <Drawer.Screen name="친구관리" component={FriendsScreen} />
    </Drawer.Navigator>
);

// --- 하단 탭 ---
const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, size }) => {
        let iconPath;
        switch (route.name) {
            case '길찾기':
                iconPath = require('./src/assets/map.png');
                break;
            case '건물 검색':
                iconPath = require('./src/assets/search.png');
                break;
            case '커뮤니티':
                iconPath = require('./src/assets/community.png');
                break;
            case '마이페이지':
                iconPath = require('./src/assets/mypage.png');
                break;
        }
        return (
            <Image
                source={iconPath}
                style={{ width: size, height: size, resizeMode: 'contain' }}
            />
        );
    },
    tabBarShowLabel: true,
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: '#C0C0C0',
});

const MainTabNavigator = ({ navigation }) => (
    <View style={{ flex: 1 }}>
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="길찾기" component={MapMainScreen} />
            <Tab.Screen name="건물 검색" component={SearchMainScreen} />
            <Tab.Screen
                name="커뮤니티"
                component={DrawerNavigator}
                options={{
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ padding: 10 }}>
                            <Image source={require('./src/assets/menu.png')} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen name="마이페이지" component={MyPageMainScreen} />
        </Tab.Navigator>
    </View>
);

// --- 최상단 Stack ---
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

export default App;
