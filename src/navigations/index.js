import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "./Auth";
import Main from "./Main";
import { UserContext, ProgressContext } from "../contexts";
import { Spinner } from "../components";

const Stack = createStackNavigator();

const Navigation = () => {
  const { user } = useContext(UserContext);
  const { inProgress } = useContext(ProgressContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user.uid ? (
          <Stack.Screen name="Main" component={Main} />
        ) : (
          <Stack.Screen name="Auth" component={Auth} />
        )}
      </Stack.Navigator>
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
