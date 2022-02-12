import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from './SignUp';
import {NavigationContainer} from '@react-navigation/native';
import LoggedIn from './LoggedIn';

export type RootStackParamList = {
  SignUp: undefined;
  LoggedIn: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="SignUp">
        <RootStack.Screen name="SignUp" component={SignUp} />
        <RootStack.Screen name="LoggedIn" component={LoggedIn} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
