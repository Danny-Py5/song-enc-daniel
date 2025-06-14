import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../../components/navigation/TabBar";

const _layout = () => {
  return (
    <Tabs 
    tabBar={(props) => <TabBar {...props} />}
    
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="song"
        options={{
          headerShown: false,
          // href: null,
        }}
      />
    </Tabs>
  );
};

export default _layout;
