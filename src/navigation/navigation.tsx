import * as React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {screenNames} from '../constants/navigationConstants';
import screens from '../screens';

const Stack = createStackNavigator();

const createScreen = (
  screenName: string,
  component: React.FC,
  options?: any,
) => <Stack.Screen name={screenName} component={component} options={options} />;

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={screenNames.productList}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {createScreen(screenNames.productList, screens.ProductList)}
      {createScreen(screenNames.cartListing, screens.CartListing)}
    </Stack.Navigator>
  );
};
export default StackNavigation;
