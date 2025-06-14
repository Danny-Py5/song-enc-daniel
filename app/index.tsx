import { View, SafeAreaView, Image } from "react-native";
import React, { useEffect } from "react";
import CustomButton from "@/components/button";
import { router } from "expo-router";
import CustomText from "@/components/text";

export default function SplashScreen() {
  useEffect(() => {
    function getRandomDelay() {
      const delays = [1000, 2000, 3000];
      const randomIndex = Math.floor(Math.random() * delays.length);
      return delays[randomIndex];
    }
    const timer = setTimeout(() => {
      router.push("/(tabs)");
    }, getRandomDelay()); // Navigate after a random delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 200,
        backgroundColor: "#032BB7",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image source={require("@/assets/images/splash-image.png")} />
        <CustomButton
          // onPress={() => {
          //   router.push("/(tabs)");
          // }}
          title="Getting Started"
          textStyle={{ color: "#032BB7" }}
          style={{ backgroundColor: "transparent", width: 300, marginTop: 30 }}
        />
      </View>
      <View>
        <CustomText
          style={{
            color: "white",
            marginBottom: 10,
            opacity: 0.7,
            textAlign: "center",
          }}
        >
          Uche Kenneth Udekwe
        </CustomText>
        <CustomText
          style={{
            color: "white",
            marginBottom: 50,
            opacity: 0.7,
            fontSize: 12,
            textAlign: "center",
          }}
        >
          Powered by Natal Cares
        </CustomText>
      </View>
    </SafeAreaView>
  );
}
