import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { useSongs } from "../../modules/song/context";
import ApLayout from "@/components/layout";
import CustomText from "@/components/text";
import SongItem from "@/modules/song/listItem";

export default function SearchScreen() {
  const { width } = Dimensions.get("window");
  const [query, setQuery] = useState("");
  const { filteredSongs, searchSongs } = useSongs();

  const handleSearch = (text: string) => {
    setQuery(text);
    searchSongs(text);
  };

  return (
    <ApLayout>
      <>
        <View style={{ position: "relative", marginTop: 30,}}>
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
            <Image source={require("@/assets/images/search-icon.png")} />
          </View>

          <TextInput
            onChangeText={handleSearch}
            placeholder="Type to search"
            value={query}
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
        <CustomText
          style={{
            textAlign: "center",
            marginTop: 15,
            fontWeight: "500",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontWeight: "800" }}>
            Search Results: {filteredSongs.length}
          </Text>
          results found
        </CustomText>

        <FlatList
          data={filteredSongs}
          keyExtractor={(item) => item.id + item.englishTitle}
          renderItem={({ item }) => <SongItem {...item} />}
          initialNumToRender={20}
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: 20,
            paddingBottom: 150,
          }}
        />
      </>
    </ApLayout>
  );
}
