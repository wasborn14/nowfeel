import React, {Dispatch, useRef} from 'react';
import {
  createContext,
  createContext as createContextSelector,
  useContext,
  useContextSelector,
} from 'use-context-selector';
import {useImmerReducer} from 'use-immer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/LoginScreen/Login';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import Home from './screens/HomeScreen/Home';
import Register from './screens/RegisterScreen/Register';
import {Action, appReducer, AppState, initialState} from './appReducer';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppContext = createContextSelector<AppState>(initialState);

const AppDispatchContext = createContext<Dispatch<Action> | void>(undefined);

export function useAppState<T>(selector: (state: AppState) => T): T {
  return useContextSelector(AppContext, selector);
}

export function useAppDispatch(): Dispatch<Action> {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error();
  }
  return context;
}

const App = () => {
  const [state, dispatch] = useImmerReducer(appReducer, initialState);
  const navigationRef = useRef<NavigationContainerRef<{}>>(null);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <NavigationContainer ref={navigationRef}>
          <RootStack.Navigator initialRouteName="Login">
            <RootStack.Screen name="Login" component={Login} />
            <RootStack.Screen name="Home" component={Home} />
            <RootStack.Screen name="Register" component={Register} />
          </RootStack.Navigator>
        </NavigationContainer>
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
