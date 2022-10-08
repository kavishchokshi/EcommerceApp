import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import StackNavigation from './src/navigation/navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';

const App = () => {
  const {persistor, store} = configureStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
