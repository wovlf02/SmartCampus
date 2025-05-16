import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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
import CreateChatRoomScreen from "./src/screens/community/CreateChatRoomScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const CommunityStack = createDrawerNavigator();


const CommunityNavigator = () => (
    <CommunityStack.Navigator screenOptions={{ headerShown: false }}>
        <CommunityStack.Screen name="PostList" component={PostListScreen} />
        <CommunityStack.Screen name="CreatePost" component={CreatePostScreen} />
        <CommunityStack.Screen name="PostDetail" component={PostDetailScreen} />
        <CommunityStack.Screen name="PostEdit" component={PostEditScreen} />
        <CommunityStack.Screen name="ChatRoomList" component={ChatRoomListScreen} />
        <CommunityStack.Screen name="ChatRoom" component={ChatRoomScreen} />
        <CommunityStack.Screen name="Friend" component={FriendScreen} />
        <CommunityStack.Screen name="CreateChatRoom" component={CreateChatRoomScreen} />
    </CommunityStack.Navigator>
);
// --- 하단 탭 ---
const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
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
                style={{
                    width: 24,
                    height: 24,
                    resizeMode: 'contain',
                    tintColor: focused ? '#007AFF' : undefined, // 선택 시만 컬러 적용
                }}
            />
        );
    },
    headerShown: false,
    tabBarShowLabel: true,
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: '#C0C0C0',
});

const MainTabNavigator = () => (
    <Tab.Navigator
        initialRouteName="길찾기"
        screenOptions={{ headerShown: false }}
        tabBar={({ state, descriptors, navigation }) => (
            <View style={styles.tabContainer}>
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;
                    const { options } = descriptors[route.key];
                    const iconMap = {
                        '길찾기': require('./src/assets/map.png'),
                        '건물 검색': require('./src/assets/search.png'),
                        '커뮤니티': require('./src/assets/community.png'),
                        '마이페이지': require('./src/assets/mypage.png'),
                    };

                    return (
                        <TouchableOpacity
                            key={route.name}
                            accessibilityRole="button"
                            onPress={() => navigation.navigate(route.name)}
                            style={[
                                styles.tabItem,
                                isFocused && styles.focusedTabItem,
                            ]}
                        >
                            <Image source={iconMap[route.name]} style={styles.icon} resizeMode="contain" />
                            <Text style={styles.label}>{route.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        )}
    >
        <Tab.Screen name="길찾기" component={MapMainScreen} />
        <Tab.Screen name="건물 검색" component={SearchMainScreen} />
        <Tab.Screen
            name="커뮤니티"
            component={CommunityNavigator}
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
        backgroundColor: '#E6F0FF', // 선택된 탭 배경색
    },
    icon: {
        width: 26,
        height: 26,
        marginBottom: 2,
    },
    label: {
        fontSize: 12,
        color: '#222', // 텍스트 색상 고정
    },
});
export default App;
