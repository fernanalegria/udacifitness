import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { colors } from '../views/styles';
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'UdaciFitness:notifications';

export const isBetween = (num, x, y) => {
  if (num >= x && num <= y) {
    return true;
  }

  return false;
};

export const calculateDirection = heading => {
  let direction = '';

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North';
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East';
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East';
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East';
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South';
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West';
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West';
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West';
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North';
  } else {
    direction = 'Calculating';
  }

  return direction;
};

export const timeToString = (time = Date.now()) => {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split('T')[0];
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  }
});

export const getMetricMetaInfo = metric => {
  const info = {
    run: {
      displayName: 'Run',
      max: 50,
      unit: 'miles',
      step: 1,
      order: 1,
      type: 'steppers',
      getIcon: () => (
        <View style={[styles.iconContainer, { backgroundColor: colors.red }]}>
          <MaterialIcons name="directions-run" color="white" size={35} />
        </View>
      )
    },
    bike: {
      displayName: 'Bike',
      max: 100,
      unit: 'miles',
      step: 1,
      order: 2,
      type: 'steppers',
      getIcon: () => (
        <View
          style={[styles.iconContainer, { backgroundColor: colors.orange }]}
        >
          <MaterialCommunityIcons name="bike" color="white" size={35} />
        </View>
      )
    },
    swim: {
      displayName: 'Swim',
      max: 9900,
      unit: 'meters',
      step: 100,
      order: 3,
      type: 'steppers',
      getIcon: () => (
        <View style={[styles.iconContainer, { backgroundColor: colors.blue }]}>
          <MaterialCommunityIcons name="swim" color="white" size={35} />
        </View>
      )
    },
    sleep: {
      displayName: 'Sleep',
      max: 24,
      unit: 'hours',
      step: 1,
      order: 4,
      type: 'slider',
      getIcon: () => (
        <View
          style={[styles.iconContainer, { backgroundColor: colors.lightPurp }]}
        >
          <FontAwesome name="bed" color="white" size={35} />
        </View>
      )
    },
    eat: {
      displayName: 'Eat',
      max: 10,
      unit: 'rating',
      step: 1,
      order: 5,
      type: 'slider',
      getIcon: () => (
        <View style={[styles.iconContainer, { backgroundColor: colors.pink }]}>
          <MaterialCommunityIcons name="food" color="white" size={35} />
        </View>
      )
    }
  };

  return metric ? info[metric] : info;
};

export const getDailyReminderValue = () => ({
  today: "👋 Don't forget to log your data today!"
});

export const formatDate = date => {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  return `${day}/${month}/${year}`;
};

export const clearLocalNotifications = () =>
  AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );

const createNotification = () => ({
  title: 'Log your stats!',
  body: "👋 Don't forget to log your stats today!",
  ios: {
    sound: true
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true
  }
});

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (!data) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);
            const options = {
              time: tomorrow,
              repeat: 'day'
            };
            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              options
            );

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(options));
          }
        });
      }
    });
};
