import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import ApLayout from "@/components/layout";
import CustomText from "@/components/text";

export default function HomeScreen() {
  return (
    <ApLayout>
      <View style={{ flex: 1, display: "flex" }}>
        <View style={{ position: "relative", marginBottom: 30, marginTop: 30 }}>
          <View
            style={{
              position: "absolute",
              right: 25,
              zIndex: 50,
              top: 5,
              padding: 7,
              backgroundColor: "#9A9CA4",
              opacity: 0.6,
              borderRadius: 30,
            }}
          >
            <Image
              source={require("@/assets/images/search-icon.png")}
              style={{}}
            />
          </View>

          <TextInput
            onChange={() => {}}
            placeholder="Type to search"
            style={{
              width: "auto",
              backgroundColor: "white",
              paddingVertical: 10,
              marginHorizontal: 15,
              paddingHorizontal: 15,
              borderRadius: 8,
              height: 50
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#032BB7",
            marginHorizontal: 15,
            borderRadius: 10,
            paddingVertical: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={require("@/assets/images/splash-image.png")} />

          <CustomText
            style={{
              color: "white",
              fontSize: 18,
              paddingHorizontal: 40,
              textAlign: "center",
              paddingTop: 10,
              lineHeight: 21,
              fontWeight: "500",
              opacity: 0.9,
              // fontFamily:
            }}
          >
            “Songs have power to refresh the body, soul and spirit of men and
            above all, it draws us closer to God.”
          </CustomText>
        </View>
      </View>
    </ApLayout>
  );
}
