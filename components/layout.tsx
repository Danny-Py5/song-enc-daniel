import { useSongs } from "@/modules/song/context";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
} from "react-native";

interface IProps {
  title?: string;
  children: any;
}

const ApLayout: React.FC<IProps> = ({ title, children }) => {
  const { width, height } = Dimensions.get("window");
  const { language, setAppLanguage } = useSongs();

  const [menuVisible, setMenuVisible] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const handleValueChange = (itemValue: "yoruba" | "english") => {
    setAppLanguage(itemValue);
  };

  const handleMenuOpen = () => {
    setMenuVisible(true);
    setFullScreen(false);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
    setFullScreen(false);
  };

  const handleMenuItemSelect = (page: string) => {
    setSelectedPage(page);
    setFullScreen(true);
  };

  const renderContent = () => {
    switch (selectedPage) {
      case "About EGS":
        return (
          <Text style={styles.modalText}>
            Encyclopedia Gospel Songs (EGS) is a dynamic App designed to inspire
            and uplift through a rich collection of Christian songs in various
            languages. Featuring Music Scores and Lyrics, it serves as a
            valuable resource for churches, choirs, and individuals seeking to
            glorify God through music. Whether for worship, devotion, or
            spiritual growth, the App unites believers worldwide in praise and
            celebration of God’s love.
          </Text>
        );
      case "Credits":
        return <Text style={styles.modalText}>Powered by Natal Cares</Text>;
      case "Contact Us":
        return (
          <Text style={styles.modalText}>
            23 Surulere Street continental Road Akure, Ondo State Nigeria
          </Text>
        );
      case "Updates":
        return <Text style={styles.modalText}>No Update yet</Text>;

      default:
        return (
          <Text style={styles.modalText}>Select a page to view content</Text>
        );
    }
  };

  return (
    <SafeAreaView style={{ height, width }}>
      <View
        style={{
          paddingTop: 40,
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 40,
          backgroundColor: "#032BB7",
        }}
      >
        <Ionicons
          name="menu-outline"
          size={30}
          color="white"
          onPress={handleMenuOpen}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <Picker
            selectedValue={language}
            onValueChange={handleValueChange}
            style={{
              backgroundColor: "white",
              width: 140,
              padding: 0,
              margin: 0,
              height: 50,
            }}
          >
            <Picker.Item label="English" value="english" />
            <Picker.Item label="Yoruba" value="yoruba" />
            {/* <Picker.Item label="Igbo" value="igbo" /> */}
          </Picker>
          <Ionicons name="settings-outline" size={24} color="white" />
        </View>
      </View>
      {children}

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleMenuClose}
      >
        {!fullScreen ? (
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={handleMenuClose}
          >
            <View style={styles.halfModal}>
              <Text
                style={styles.menuItem}
                onPress={() => handleMenuItemSelect("About EGS")}
              >
                About EGS
              </Text>
              <Text
                style={styles.menuItem}
                onPress={() => handleMenuItemSelect("Credits")}
              >
                Credits
              </Text>
              <Text
                style={styles.menuItem}
                onPress={() => handleMenuItemSelect("Contact Us")}
              >
                Contact Us
              </Text>
              <Text
                style={styles.menuItem}
                onPress={() => handleMenuItemSelect("Updates")}
              >
                Updates
              </Text>
              <Text
                style={styles.menuItem}
                onPress={() =>
                  Linking.openURL(
                    "https://smokelessbriqs.org/privacy-policy-for-encyclopedia-of-gospel-songs"
                  )
                }
              >
                Privacy Policy
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.fullScreenModal}>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#4569E7", fontSize: 18, fontWeight: "600" }}
              >
                {selectedPage}
              </Text>
              <View
                style={{
                  backgroundColor: "#4569E7",
                  padding: 7,
                  borderRadius: 5,
                }}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color="white"
                  onPress={handleMenuClose}
                />
              </View>
            </View>

            {renderContent()}
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  halfModal: {
    backgroundColor: "white",
    width: "50%",
    height: "100%",
    padding: 20,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 10,
    marginVertical: 10,
    fontWeight: "500",
    // borderBottomWidth: 1,
    // borderColor: "#ddd",
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: "white",
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 20,
    padding: 30,
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: "#032BB7",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  cancelText: {
    color: "white",
    fontSize: 16,
  },
  modalText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "justify",
  },
});

export default ApLayout;
