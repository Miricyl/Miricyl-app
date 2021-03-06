import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import joyReducer from './store/reducers/joyItems';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const rootReducer = combineReducers({
    joy: joyReducer
  });
  
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));



  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
