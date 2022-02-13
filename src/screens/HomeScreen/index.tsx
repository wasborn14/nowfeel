import {
  createContext,
  createContext as createContextSelector,
  useContext,
  useContextSelector,
} from 'use-context-selector';
import React, {Dispatch} from 'react';
import {useImmerReducer} from 'use-immer';
import {Action, HomeState, initialState, homeReducer} from './reducer/reducer';
import Home from './Home';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

const HomeContext = createContextSelector<HomeState>(initialState);

const HomeDispatchContext = createContext<Dispatch<Action> | void>(undefined);

export function useHomeState<T>(selector: (state: HomeState) => T): T {
  return useContextSelector(HomeContext, selector);
}

export function useHomeDispatch(): Dispatch<Action> {
  const context = useContext(HomeDispatchContext);
  if (context === undefined) {
    throw new Error();
  }
  return context;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeContainer: React.FC<Props> = ({navigation}) => {
  const [state, dispatch] = useImmerReducer(homeReducer, initialState);

  return (
    <HomeContext.Provider value={state}>
      <HomeDispatchContext.Provider value={dispatch}>
        <Home navigation={navigation} />
      </HomeDispatchContext.Provider>
    </HomeContext.Provider>
  );
};

export default HomeContainer;
