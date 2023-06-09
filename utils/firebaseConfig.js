import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

// Configure Expo to use FCM
export const configureFCM = () => {
  if (Constants.isDevice) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    Notifications.createChannelAndroidAsync("default", {
      name: "Default",
      sound: true,
    });
  }
};

export const getDevicePushToken = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return null;
  }

  const {
    data: { token },
  } = await Notifications.getExpoPushTokenAsync();
  return token;
};

export const setupNotifications = async () => {
  configureFCM();
  const token = await getDevicePushToken();
  console.log("Device push token:", token);
};

export default FIREBASE_SERVER_KEY;
