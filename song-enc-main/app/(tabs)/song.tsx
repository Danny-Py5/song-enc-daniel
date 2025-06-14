import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Text,
  Button,
  Platform,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Slider from "@react-native-community/slider";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import CustomText from "@/components/text";
import { useSongs } from "@/modules/song/context";
import ApLayout from "@/components/layout";
import { ISong } from "@/modules/song/listItem";
import Pdf from "react-native-pdf";
import * as Sharing from "expo-sharing";

import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as Linking from "expo-linking";

interface SongLyricsProps {
  fontSize: number;
  song: ISong | null;
}

const SongLyrics: React.FC<SongLyricsProps> = ({ fontSize, song }) => {
  const { language } = useSongs();

  const lyricsArray =
    language === "yoruba" ? song?.yoruba[0].items : song?.english;
  return (
    <>
      <Text style = {{paddingHorizontal: 20, paddingTop: 20, fontWeight: '600'}}>
        SONG: {language == "english" ? song?.englishTitle : song?.yorubaTitle || ""}
      </Text>
      <ScrollView
        style={{
          backgroundColor: "white",
          opacity: 0.75,
          margin: 20,
          padding: 10,
          marginBottom: 80,
          paddingBottom: 50,
        }}
      >
        {lyricsArray?.map((item, i) => {
          return (
            <View style={{ marginBottom: 20 }} key={item?.title}>
              <CustomText style={[{ fontWeight: 700 }, { fontSize }]}>
                {item?.title.toString().toLocaleUpperCase()}:
              </CustomText>
              <CustomText style={[{ fontSize }]}>{item?.lyrics}</CustomText>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const MusicSheet: React.FC<{ song: ISong | null }> = ({ song }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!song?.musicSheetUrl) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ textAlign: "center" }}>No scoresheet found.</Text>
      </View>
    );
  }

  const downloadAndOpenPDF = async (pdfUrl: string, fileName: string) => {
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    // Check if file exists
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      console.log("File already downloaded, opening...");
      return openPDF(fileUri);
    }

    // Download file
    try {
      setIsDownloading(true);
      const { uri } = await FileSystem.downloadAsync(pdfUrl, fileUri);
      console.log("File downloaded to:", uri);
      setIsDownloading(false);
      openPDF(uri);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setIsDownloading(false);
    }
  };

  const openPDF = async (fileUri: string) => {
    try {
      if (Platform.OS === "android") {
        // Convert file:// URI to content:// URI
        const contentUri = await FileSystem.getContentUriAsync(fileUri);
        console.log("Content URI:", contentUri);

        // Open the PDF using IntentLauncher
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: contentUri,
          type: "application/pdf",
          flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
        });
      } else if (Platform.OS === "ios") {
        // Open the file using Linking on iOS
        await Linking.openURL(fileUri);
      } else {
        console.log("Unsupported platform for opening PDF.");
      }
    } catch (error) {
      console.error("Error opening PDF:", error);
    }
  };

  if (!song?.musicSheetUrl) {
    return (
      <View
        style={{
          ...styles.container,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{}}>No scoresheet found.</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { justifyContent: "center", marginHorizontal: 10 },
      ]}
    >
      <Button
        title={isDownloading ? "Downloading..." : "Download & Open PDF"}
        onPress={() =>
          downloadAndOpenPDF(
            song.musicSheetUrl as string,
            `${song?.englishTitle}_sheet.pdf`
          )
        }
        disabled={isDownloading}
      />
    </View>
  );
};

const initialLayout = { width: Dimensions.get("window").width };

const SongScreen: React.FC = () => {
  const [fontSize, setFontSize] = useState<number>(16);
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: "lyrics", title: "Song Lyrics" },
    { key: "musicSheet", title: "Music Sheet" },
  ]);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));

  const params = useLocalSearchParams();
  const { id } = params;

  const { getSongById } = useSongs();
  const song = getSongById(id as string);

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "lyrics":
        return <SongLyrics fontSize={fontSize} song={song} />;
      case "musicSheet":
        return <MusicSheet song={song} />;
      default:
        return null;
    }
  };

  return (
    <ApLayout>
      <View style={{ flex: 1, position: "relative" }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: "#032BB7" }}
              style={{
                backgroundColor: "white",
                marginHorizontal: 20,
                marginTop: 30,
              }}
              labelStyle={{ color: "#032BB7", fontWeight: "bold" }}
            />
          )}
        />
        {index === 0 && (
          <View
            style={{
              position: "absolute",
              bottom: 200,
              right: 30,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              borderRadius: 30,
              padding: 10,
            }}
          >
            <MaterialIcons
              name="zoom-in"
              size={30}
              color="black"
              onPress={increaseFontSize}
            />
            <MaterialIcons
              name="zoom-out"
              size={30}
              color="black"
              onPress={decreaseFontSize}
            />
          </View>
        )}
      </View>
    </ApLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#032BB7",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  picker: {
    backgroundColor: "white",
    width: 140,
    height: 30,
  },
  sliderContainer: {
    padding: 16,
    marginBottom: 50,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  sliderLabel: {
    textAlign: "center",
    color: "#032BB7",
    fontWeight: "bold",
    marginBottom: 8,
  },
  zoomControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    width: "70%",
  },
});

export default SongScreen;
