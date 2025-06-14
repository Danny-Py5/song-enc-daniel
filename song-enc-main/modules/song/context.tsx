import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // for local storage in React Native
import songs from "../../songs.json";
import { ISong } from "./listItem";

interface SongsContextProps {
  filteredSongs: ISong[];
  favoriteSongs: ISong[];
  language: "yoruba" | "english";
  searchSongs: (query: string) => void;
  getSongById: (id: string) => ISong | null;
  toggleFavorite: (id: string) => void;
  setAppLanguage: (language: "yoruba" | "english") => void;
}

interface SongsProviderProps {
  children: ReactNode;
}

const SongsContext = createContext<SongsContextProps | undefined>(undefined);

export const SongsProvider: React.FC<SongsProviderProps> = ({ children }) => {
  const [filteredSongs, setFilteredSongs] = useState<ISong[]>(songs);
  const [favoriteSongs, setFavoriteSongs] = useState<ISong[]>([]);
  const [language, setLanguage] = useState<"yoruba" | "english">("yoruba");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  useEffect(() => {
    // Load favorites from local storage when app starts
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        const favoritesSet = new Set<string>(
          JSON.parse(storedFavorites) as string[]
        );
        setFavorites(favoritesSet);
        updateFavoriteSongs(favoritesSet);
      }
    };
    loadFavorites();
  }, []);

  const updateFavoritesStorage = async (favoritesSet: Set<string>) => {
    await AsyncStorage.setItem(
      "favorites",
      JSON.stringify(Array.from(favoritesSet))
    );
  };

  const setAppLanguage = async (language: "yoruba" | "english") => {
    setLanguage(language);
  };

  const updateFilteredSongs = () => {
    const updatedSongs = songs.map((song) => ({
      ...song,
      addedToFavorite: favorites.has(song.id),
    }));
    setFilteredSongs(updatedSongs);
  };

  const updateFavoriteSongs = (favoritesSet: Set<string>) => {
    const updatedFavoriteSongs = songs
      .filter((song) => favoritesSet.has(song.id))
      .map((song) => ({
        ...song,
        addedToFavorite: true,
      }));
    setFavoriteSongs(updatedFavoriteSongs);
  };

  const toggleFavorite = (id: string) => {
    const updatedFavorites = new Set(favorites);
    if (updatedFavorites.has(id)) {
      updatedFavorites.delete(id); // Remove if already a favorite
    } else {
      updatedFavorites.add(id); // Add if not a favorite
    }
    setFavorites(updatedFavorites);
    updateFavoritesStorage(updatedFavorites);
    updateFilteredSongs();
    updateFavoriteSongs(updatedFavorites);
  };

  const searchSongs = (query: string) => {
    const results =
      language === "yoruba"
        ? songs
            .map((song) => ({
              ...song,
              addedToFavorite: favorites.has(song.id),
            }))
            .filter((song) =>
              song.yorubaTitle.toLowerCase().includes(query.toLowerCase())
            )
        : songs
            .map((song) => ({
              ...song,
              addedToFavorite: favorites.has(song.id),
            }))
            .filter((song) =>
              song.englishTitle.toLowerCase().includes(query.toLowerCase())
            );
    setFilteredSongs(results);
  };

  const getSongById = (id: string): ISong | null => {
    const song = songs.find((song) => song.id === id);
    if (!song) return null;
    return {
      ...song,
      addedToFavorite: favorites.has(song.id),
    };
  };

  // Update filtered and favorite songs when favorites change
  useEffect(() => {
    updateFilteredSongs();
    updateFavoriteSongs(favorites);
  }, [favorites]);

  return (
    <SongsContext.Provider
      value={{
        filteredSongs,
        favoriteSongs,
        language,
        searchSongs,
        getSongById,
        toggleFavorite,
        setAppLanguage,
      }}
    >
      {children}
    </SongsContext.Provider>
  );
};

export const useSongs = (): SongsContextProps => {
  const context = useContext(SongsContext);
  if (!context) throw new Error("useSongs must be used within a SongsProvider");
  return context;
};
