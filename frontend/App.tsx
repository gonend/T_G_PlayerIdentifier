/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';

import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  LogBox,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Login from './Components/Login/Login';
import {I_userProfileObject} from './Interfaces/I_userProfileObject';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Stack = createStackNavigator();

export const UserContext = React.createContext<{
  userProfileObject: I_userProfileObject;
  setUserProfileObject: Function | null;
}>({
  userProfileObject: {
    id: -1,
    userId: -1,
    firstName: '',
    mobilePhone: '',
    imgUrl: '',
    address: '',
    rewardPoint: -1,
    user_AppRole: '',
    lat: '-1',
    lng: '-1',
  },
  setUserProfileObject: null,
});

const App = (props: {children: any}) => {
  // const value = React.useContext(UserContext);
  const [userProfileTemp, setUserProfileTemp] = useState<I_userProfileObject>({
    id: -1,
    userId: -1,
    firstName: '',
    mobilePhone: '',
    imgUrl: '',
    address: '',
    rewardPoint: -1,
    user_AppRole: '',
    lat: '-1',
    lng: '-1',
  });

  return (
    <UserContext.Provider
      value={{
        userProfileObject: userProfileTemp,
        setUserProfileObject: setUserProfileTemp,
      }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
