import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { icons } from "../../assets/icons";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type IconNames = "index" | "favourites" | "search" | "song";

interface IProps {
  isFocused: boolean;
  routeName: IconNames;
  color: string;
  label: string;

  onPress: () => void;
  onLongPress: () => void;
}

const TabBarButton = (props: IProps) => {
  const { isFocused, label, routeName, color } = props;

  console.log(props);

  return props.routeName == "song" ? null : (
    <Pressable {...props} style={styles.container}>
      <View
        style={{
          width: "auto",
          backgroundColor: isFocused ? "#4569E7" : "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: isFocused ? 5 : 0,
          borderRadius: 30,
          minWidth: isFocused ? 110 : "auto",
        }}
      >
        <Animated.View style={{}}>
          {icons[routeName]({
            color,
          })}
        </Animated.View>

        <Animated.Text
          style={[
            {
              color,
              fontSize: 11,
            },
          ]}
        >
          {label}
        </Animated.Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});

export default TabBarButton;
