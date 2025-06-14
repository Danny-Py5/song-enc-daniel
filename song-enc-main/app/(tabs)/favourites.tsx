import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import ApLayout from "@/components/layout";
import CustomText from "@/components/text";
import SongItem from "@/modules/song/listItem";
import { useSongs } from "@/modules/song/context";

export default function TabTwoScreen() {
  const { favoriteSongs } = useSongs();
  return (
    <ApLayout>
      {/* <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 100,
        }}
      >
        <View
          style={{
            paddingBottom: 20,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 15,
            borderRadius: 5,
            elevation: 10,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            shadowColor: "#333333",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText
                style={{
                  backgroundColor: "#4569E7",
                  color: "white",
                  padding: 6,
                  borderRadius: 20,
                }}
              >
                01.
              </CustomText>
            </View>

            <View style={{ width: 200 }}>
              <CustomText
                style={{ fontWeight: "600", fontSize: 16, paddingBottom: 10 }}
              >
                Song Title
              </CustomText>
              <CustomText>Verse 01</CustomText>
              <CustomText>Lorem Ipsum Lorem ipsum jar fit blan...</CustomText>
            </View>
          </View>

          <MaterialIcons name="favorite" size={24} color="#D00C0C" />
        </View>
        <View
          style={{
            paddingBottom: 20,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 15,
            borderRadius: 5,
            elevation: 10,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            shadowColor: "#333333",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText
                style={{
                  backgroundColor: "#4569E7",
                  color: "white",
                  padding: 6,
                  borderRadius: 20,
                }}
              >
                01.
              </CustomText>
            </View>

            <View style={{ width: 200 }}>
              <CustomText
                style={{ fontWeight: "600", fontSize: 16, paddingBottom: 10 }}
              >
                Song Title
              </CustomText>
              <CustomText>Verse 01 Lorem Ipsum Lorem ipsum jar fit blan...</CustomText>
            </View>
          </View>

          <MaterialIcons name="favorite" size={24} color="#D00C0C" />
        </View>
        <View
          style={{
            paddingBottom: 20,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 15,
            borderRadius: 5,
            elevation: 10,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            shadowColor: "#333333",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText
                style={{
                  backgroundColor: "#4569E7",
                  color: "white",
                  padding: 6,
                  borderRadius: 20,
                }}
              >
                01.
              </CustomText>
            </View>

            <View style={{ width: 200 }}>
              <CustomText
                style={{ fontWeight: "600", fontSize: 16, paddingBottom: 10 }}
              >
                Song Title
              </CustomText>
              <CustomText>Verse 01 Lorem Ipsum Lorem ipsum jar fit blan...</CustomText>
            </View>
          </View>

          <MaterialIcons name="favorite" size={24} color="#D00C0C" />
        </View>
        <View
          style={{
            paddingBottom: 20,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 15,
            borderRadius: 5,
            elevation: 10,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            shadowColor: "#333333",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText
                style={{
                  backgroundColor: "#4569E7",
                  color: "white",
                  padding: 6,
                  borderRadius: 20,
                }}
              >
                01.
              </CustomText>
            </View>

            <View style={{ width: 200 }}>
              <CustomText
                style={{ fontWeight: "600", fontSize: 16, paddingBottom: 10 }}
              >
                Song Title
              </CustomText>
              <CustomText>Verse 01 Lorem Ipsum Lorem ipsum jar fit blan...</CustomText>
            </View>
          </View>

          <MaterialIcons name="favorite" size={24} color="#D00C0C" />
        </View>
        <View
          style={{
            paddingBottom: 20,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 15,
            borderRadius: 5,
            elevation: 10,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            shadowColor: "#333333",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText
                style={{
                  backgroundColor: "#4569E7",
                  color: "white",
                  padding: 6,
                  borderRadius: 20,
                }}
              >
                01.
              </CustomText>
            </View>

            <View style={{ width: 200 }}>
              <CustomText
                style={{ fontWeight: "600", fontSize: 16, paddingBottom: 10 }}
              >
                Song Title
              </CustomText>
              <CustomText>Verse 01 Lorem Ipsum Lorem ipsum jar fit blan...</CustomText>
            </View>
          </View>

          <MaterialIcons name="favorite" size={24} color="#D00C0C" />
        </View>
        <View
          style={{
            paddingBottom: 20,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 15,
            borderRadius: 5,
            elevation: 10,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            shadowColor: "#333333",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText
                style={{
                  backgroundColor: "#4569E7",
                  color: "white",
                  padding: 6,
                  borderRadius: 20,
                }}
              >
                01.
              </CustomText>
            </View>

            <View style={{ width: 200 }}>
              <CustomText
                style={{ fontWeight: "600", fontSize: 16, paddingBottom: 10 }}
              >
                Song Title
              </CustomText>
              <CustomText>Verse 01 Lorem Ipsum Lorem ipsum jar fit blan...</CustomText>
            </View>
          </View>

          <MaterialIcons name="favorite" size={24} color="#D00C0C" />
        </View>
        <View
          style={{
            paddingBottom: 20,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 15,
            borderRadius: 5,
            elevation: 10,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            shadowColor: "#333333",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText
                style={{
                  backgroundColor: "#4569E7",
                  color: "white",
                  padding: 6,
                  borderRadius: 20,
                }}
              >
                01.
              </CustomText>
            </View>

            <View style={{ width: 200 }}>
              <CustomText
                style={{ fontWeight: "600", fontSize: 16, paddingBottom: 10 }}
              >
                Song Title
              </CustomText>
              <CustomText>Verse 01 Lorem Ipsum Lorem ipsum jar fit blan...</CustomText>
            </View>
          </View>

          <MaterialIcons name="favorite" size={24} color="#D00C0C" />
        </View>
        <View
          style={{
            paddingBottom: 20,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 15,
            borderRadius: 5,
            elevation: 10,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            shadowColor: "#333333",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText
                style={{
                  backgroundColor: "#4569E7",
                  color: "white",
                  padding: 6,
                  borderRadius: 20,
                }}
              >
                01.
              </CustomText>
            </View>

            <View style={{ width: 200 }}>
              <CustomText
                style={{ fontWeight: "600", fontSize: 16, paddingBottom: 10 }}
              >
                Song Title
              </CustomText>
              <CustomText>Verse 01 Lorem Ipsum Lorem ipsum jar fit blan...</CustomText>
            </View>
          </View>

          <MaterialIcons name="favorite" size={24} color="#D00C0C" />
        </View>
        <View
          style={{
            paddingBottom: 20,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 15,
            borderRadius: 5,
            elevation: 10,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            shadowColor: "#333333",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText
                style={{
                  backgroundColor: "#4569E7",
                  color: "white",
                  padding: 6,
                  borderRadius: 20,
                }}
              >
                01.
              </CustomText>
            </View>

            <View style={{ width: 200 }}>
              <CustomText
                style={{ fontWeight: "600", fontSize: 16, paddingBottom: 10 }}
              >
                Song Title
              </CustomText>
              <CustomText>Verse 01 Lorem Ipsum Lorem ipsum jar fit blan...</CustomText>
            </View>
          </View>

          <MaterialIcons name="favorite" size={24} color="#D00C0C" />
        </View>
        <View
          style={{
            paddingBottom: 20,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 15,
            borderRadius: 5,
            elevation: 10,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            shadowColor: "#333333",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View>
              <CustomText
                style={{
                  backgroundColor: "#4569E7",
                  color: "white",
                  padding: 6,
                  borderRadius: 20,
                }}
              >
                01.
              </CustomText>
            </View>

            <View style={{ width: 200 }}>
              <CustomText
                style={{ fontWeight: "600", fontSize: 16, paddingBottom: 10 }}
              >
                Song Title
              </CustomText>
              <CustomText>last 01 Lorem Ipsum Lorem ipsum jar fit blan...</CustomText>
            </View>
          </View>

          <MaterialIcons name="favorite" size={24} color="#D00C0C" />
        </View>
      </ScrollView> */}
      

      <FlatList
        data={favoriteSongs}
        keyExtractor={(item) => item.id + item.englishTitle}
        renderItem={({ item }) => <SongItem {...item} />}
        initialNumToRender={20}
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 20,
          paddingBottom: 150,
          marginTop: 20
        }}
      />
    </ApLayout>
  );
}
