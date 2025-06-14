import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text style={[styles.defaultFont, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: "Montserrat_400Regular",
  },
});

export default CustomText;
