import { Text, View, TextInput, FlatList,Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Search from "../../assets/icons/search.svg";
import { useState } from "react";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import UserIcon from "../../assets/icons/userIcon.svg"

const IP_URL = Constants.expoConfig.extra.IP_URL;
const Base_Image_URL = Constants.expoConfig.extra.Base_Image_URL;

const Index = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
  
    if (search.length < 3) {
      setMovies([]);
      setTvShows([]);
      setActors([]);
      controller.abort();
      return;
    }
  
    getActors(controller.signal);
    getTvShows(controller.signal);
    getMovies(controller.signal);
  
    return () => {
      controller.abort();
    };
  }, [search]);
  
  const getMovies = async (signal) => {
    try {
      if (search.length < 3) {
        setMovies([]);
        return;
      }
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${IP_URL}/search/movie/:${search}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal,
      });
  
      setMovies([]);
  
      if (response.ok) {
        const data = await response.json();
        setMovies(data.content);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  };
  
  const getTvShows = async (signal) => {
    try {
      if (search.length < 3) {
        setTvShows([]);
        return;
      }
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${IP_URL}/search/tv/:${search}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal,
      });
  
      setTvShows([]);
  
      if (response.ok) {
        const data = await response.json();
        setTvShows(data.content);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  };
  
  const getActors = async (signal) => {
    try {
      if (search.length < 3) {
        setActors([]);
        return;
      }
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${IP_URL}/search/person/:${search}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal,
      });
  
      setActors([]);
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.content);
        setActors(data.content);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{paddingBottom:20}} className="bg-[#000000] h-full">
      <View className="px-[20px]">
        <View className="mt-[20px]">
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#FFFFFFB2"
            style={{ borderColor: "#808080B2", borderWidth: 3 }}
            className="pr-[40px] font-robotoRegular pl-[20px] rounded-[12px] text-[#FFFFFFB2] font-normal text-[14px] leading-[24px] bg-[#161616B2] py-[10px]"
            placeholder="Search for shows, movies or artists..."
          />

          <Search
            width={20}
            height={20}
            style={{ position: "absolute", right: 20, marginTop: 15 }}
          />
        </View>

        {actors.length != 0 && (<Text className="mt-[40px] text-[20px] leading-[32px] font-robotoRegular font-normal color-[#FFFFFF]">Artists</Text>)}

        <FlatList
          data={actors}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 15, marginBottom: 0 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => router.push({
              pathname: "/artists/details/[id]",
              params: {
                actorData: JSON.stringify(item),
              }
              })} className={`${index != 0 && "ml-[20px]"}`}>
              {item.profile_path ? (

                <Image
                source={{ uri: `${Base_Image_URL}${item.profile_path}` }}
                style={{ width: 60, height: 60,margin:'auto',borderRadius:100 }}
                contentFit="cover"
                transition={500}
                />
              ) : 
              (
                <UserIcon width={60} height={60} style={{margin:'auto',borderRadius:100}} />
              )}
              <Text className="color-[#FFFFFF] text-center mt-[10px] text-[15px] leading-[15px] font-normal font-robotoRegular">{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        {movies.length != 0 && (<Text className="mt-[40px] text-[20px] leading-[32px] font-robotoRegular font-normal color-[#FFFFFF]">Movies</Text>)}

        <FlatList
          data={movies}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 15 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => router.push({
              pathname: "/movies/details/[id]",
              params: {
                id: item.id,
                mediaType: "movie",
                start: "",
              },
            })}>
              <Image
                source={{ uri: `${Base_Image_URL}${item.poster_path}` }}
                style={{ width: 120, height: 180, marginLeft: index != 0 && 20 }}
                contentFit="cover"
                transition={500}
              />
            </TouchableOpacity>
          )}
        />

        {tvShows.length != 0 && (<Text className="mt-[40px] text-[20px] leading-[32px] font-robotoRegular font-normal color-[#FFFFFF]">Tv Shows</Text>)}
        
        <FlatList
          data={tvShows}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 15, marginBottom: 0 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => router.push({
              pathname: "/movies/details/[id]",
              params: {
                id: tvShows[0].id,
                mediaType: "tv",
                start: "",
              },
            })}>
              <Image
                source={{ uri: `${Base_Image_URL}${item.poster_path}` }}
                style={{ width: 120, height: 180, marginLeft:index != 0 && 20 }}
                contentFit="cover"
                transition={500}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Index;
