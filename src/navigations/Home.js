import React, { useContext, useEffect } from "react";
import { ThemeContext } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChannelList, Profile } from "../screens";
import { MaterialIcons } from "@expo/vector-icons";

const TabIcon = ({ name, focused }) => {
  const theme = useContext(ThemeContext);
  return (
    <MaterialIcons
      name={name}
      size={26}
      color={focused ? theme.tabBtnActive : theme.tabBtnInactive}
    />
  );
};

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false, // 탭 네비게이터의 헤더는 숨기고
      })}
      screenListeners={({ route }) => ({
        state: () => {
          // 스택 네비게이터의 헤더 타이틀을 업데이트
          navigation.setOptions({
            headerTitle: route.name,
          });
        },
      })}
    >
      <Tab.Screen
        name="List"
        component={ChannelList}
        options={{
          tabBarIcon: ({ focused }) =>
            TabIcon({
              name: focused ? "chat-bubble" : "chat-bubble-outline",
              focused,
            }),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            TabIcon({
              name: focused ? "person" : "person-outline",
              focused,
            }),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
