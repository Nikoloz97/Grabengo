import { colors } from "@/constants/Colors";
import { BaseToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        fontFamily: "DMSans_600SemiBold",
        backgroundColor: colors.colors.primary,
        borderLeftWidth: 0,
        borderRadius: 12,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 9999,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        flex: 1,
      }}
      // header
      text1Style={{
        fontSize: 20,
        fontWeight: "600",
        color: colors.colors.text,
      }}
      // text
      text2Style={{
        fontSize: 14,
        color: colors.colors.text,
        marginTop: 2,
        flexWrap: "wrap",
        numberOfLines: 0,
      }}
      text1NumberOfLines={0} // Remove line limit for text1
      text2NumberOfLines={0} // Remove line limit for text2
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={{
        fontFamily: "DMSans_600SemiBold",
        backgroundColor: colors.colors.notification,
        borderLeftWidth: 0,
        borderRadius: 12,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 9999,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        flex: 1,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        color: colors.colors.text,
        flexWrap: "wrap",
        numberOfLines: 0,
      }}
      text2Style={{
        fontSize: 14,
        color: colors.colors.text,
        marginTop: 2,
        flexWrap: "wrap",
        numberOfLines: 0,
      }}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  ),
};
