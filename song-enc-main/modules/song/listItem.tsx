import CustomText from "@/components/text";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Pressable, View } from "react-native";
import { useSongs } from "./context";

export interface ISong {
  id: string;
  index: number;
  englishTitle: string;
  yorubaTitle: string;
  english: ISongItem[];
  yoruba: ISongOptions[];
  igbo: ISongOptions[];
  addedToFavorite?: boolean;
  musicSheetUrl?: string
}

interface ISongOptions {
  title: string;
  items: ISongItem[];
}

interface ISongItem {
  title: string;
  lyrics: string;
}

export const SongItem: React.FC<ISong> = ({
  index,
  englishTitle,
  english,
  yoruba,
  igbo,
  id,
  yorubaTitle,
  addedToFavorite
}) => {
  const { toggleFavorite } = useSongs();

  const {language} = useSongs()
  return (
    <Link href={{ pathname: "/song", params: { id } }} asChild>
      <Pressable>
        <View
          style={{
            height: 120,
            paddingBottom: 20,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 15,
            borderRadius: 5,
            elevation: 10,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            shadowColor: "#333333",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View
              style={{
                backgroundColor: "#4569E7",
                height: 35,
                width: 35,
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomText style={{ color: "white" }}>
                {+id < 10 ? `0${id}.` : `${id}.`}
              </CustomText>
            </View>

            <View style={{ width: 200 }}>
              <CustomText
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                  paddingBottom: 10,
                }}
              >
                { language == 'english' ? englishTitle: yorubaTitle || 'Yoruba Title'}
              </CustomText>
              <CustomText>
                { language == 'english' ? english[0].title.toUpperCase(): yoruba[0]?.items[0]?.title?.toUpperCase()}
              </CustomText>
              <CustomText>
                { language == 'english' ? `${english[0].lyrics
                      .replace(/\n+/g, ", ")
                      .slice(0, 20)}...` : yoruba[0]?.items[0]?.lyrics
                  ? `${yoruba[0].items[0].lyrics
                      .replace(/\n+/g, ", ")
                      .slice(0, 20)}...`
                  : ""}
              </CustomText>
            </View>
          </View>
          <Pressable onPress={() => toggleFavorite(id)}>
            <MaterialIcons name={`${addedToFavorite == true ? 'favorite' : 'favorite-outline'}`} size={24} color={`${addedToFavorite == true ? '#D00C0C' : 'black'}`} />
          </Pressable>
        </View>
      </Pressable>
    </Link>
  );
};

export default SongItem;
