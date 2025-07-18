import { FirebaseError } from "firebase/app";
import Toast from "react-native-toast-message";

export const deriveErrorMessage = (error: unknown, defaultMessage?: string) => {
  let message: string = "";

  if (error instanceof FirebaseError) {
    if (error.code) {
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "This email is already in use.";
          break;
        case "auth/invalid-email":
          message = "The email address is invalid.";
          break;
        case "auth/weak-password":
          message = "The password is too weak.";
          break;
        case "auth/requires-recent-login":
          message =
            "For security reasons, please sign in again before deleting your account.";
          break;
        default:
          message = defaultMessage ? defaultMessage : "Something went wrong";
          break;
      }
    }
  }

  return message;
};

export const successToast = (customText?: string) => {
  Toast.show({
    type: "success",
    text1: "Success",
    text2: customText ? customText : "",
  });
};

export const errorToast = (error: unknown | null, defaultMessage?: string) => {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: error ? deriveErrorMessage(error, defaultMessage) : defaultMessage,
  });
};
