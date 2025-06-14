import { AntDesign, Feather, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

interface IconProps{
    color: string
}

export const icons = {
  index: (props: IconProps) => <AntDesign name="home" size={26} {...props} />,
  favourites: (props: IconProps) => <MaterialIcons name="favorite-border" size={26} {...props} />,
  search: (props: IconProps) =><MaterialCommunityIcons name="playlist-music-outline" size={26} {...props} />,
  song: (props: IconProps) =><MaterialCommunityIcons name="playlist-music-outline" size={26} {...props} />,
};
