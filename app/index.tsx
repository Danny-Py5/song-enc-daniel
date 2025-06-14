import { View, SafeAreaView, Image } from "react-native";
import React from "react";
import CustomButton from "@/components/button";
import { router } from "expo-router";
import CustomText from "@/components/text";

export default function SplashScreen() {
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
          onPress={() => {
            router.push("/(tabs)");
          }}
          title="Get started"
          textStyle={{ color: "#032BB7" }}
          style={{ backgroundColor: "white", width: 300, marginTop: 30 }}
        />
      </View>
      <View>
        <CustomText style={{ color: "white", marginBottom: 10, opacity: 0.7, textAlign: 'center' }}>
          Uche Kenneth Udekwe
        </CustomText>
        <CustomText style={{ color: "white", marginBottom: 50, opacity: 0.7, fontSize: 12, textAlign: 'center' }}>
          Powered by Natal Cares
        </CustomText>
      </View>
    </SafeAreaView>
  );
}
