/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  AppState,
  Button,
} from 'react-native';

import HomeHeader from './myComponents/HomeHeader';
import Article from './myComponents/Article';

import faker from 'faker';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    //notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: Platform.OS === 'ios',
});
PushNotification.createChannel(
  {
    channelId: 'channel-id', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const App: () => React$Node = () => {
  const [data, setData] = useState([]);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    //API CALL using fetch(), but here faking data
    const temp = [];
    for (let i = 0; i < 12; i++) {
      temp.push({
        id: faker.random.uuid(),
        title: faker.commerce.productName(),
        subtitle: faker.commerce.department(),
        desc:
          faker.commerce.productDescription() +
          faker.commerce.productDescription(),
        image: faker.image.image(),
      });
    }
    setData(temp);

    // detect if user puts app in background
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      // clean up
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      console.log('App has come to the foreground!');
      PushNotification.cancelAllLocalNotifications();
    } else if (nextAppState === 'background' || nextAppState === 'inactive') {
      console.log('App has come to the background!');
      scheduleNotification();
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };

  const scheduleNotification = () => {
    PushNotification.localNotificationSchedule({
      smallIcon: 'ic_notification',
      channelId: 'channel-id', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
      title: 'Hey come back!', // (optional)
      message: 'Check out our amazing store!', // (required)
      date: new Date(Date.now() + 5 * 1000),
    });
  };

  return (
    <>
      <StatusBar backgroundColor={'black'} />
      <SafeAreaView style={styles.container}>
        <HomeHeader style={styles.homeHeader} />
        {/* <Button
          title="test"
          onPress={() => {
            PushNotification.getScheduledLocalNotifications((array) => {
              console.log(array);
            });
          }}
        /> */}
        <FlatList
          data={data}
          renderItem={({item}) => {
            console.log(item);
            return (
              <TouchableOpacity
                style={styles.row}
                onPress={() => {
                  // navigate to item screen if it's set up
                  // navigation.navigate("ItemScreen", {item});
                  console.log('Tapped on: ', JSON.stringify(item?.title));
                }}>
                <Article data={item} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  homeHeader: {height: 80, margin: 8},
  body: {
    backgroundColor: 'pink',
    flex: 5,
  },
  row: {
    height: 132,
  },
});

export default App;
