import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Vector from "../../assets/icons/Vector.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrendingTVShows from "../../components/tvShows/TrendingTVShows";
import TrendingMovies from "../../components/movies/TrendingMovies";
import { router } from "expo-router";
import Constants from 'expo-constants';

const IP_URL = Constants.expoConfig.extra.IP_URL;
const Base_Image_URL = Constants.expoConfig.extra.Base_Image_URL;

const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width - 40;
  const [path, setPath] = useState("");

  const getTrendingMovies = async () => {
    try {
      const response = await fetch(
        `${IP_URL}/movie/trending`
      );

      if (response.ok) {
        const datas = await response.json();
        setTrendingMovies(datas.content);
        setPath(datas.content[0].poster_path);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTrendingTVShows = async () => {
    try {
      const response = await fetch(
        `${IP_URL}/tv/trending`
      );

      if (response.ok) {
        const datas = await response.json();
        setTrendingTVShows(datas.content);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // AsyncStorage.removeItem('token');
    // AsyncStorage.removeItem('first');
    getTrendingMovies();
    getTrendingTVShows();
  }, []);

  return (
    <ScrollView contentContainerStyle={{paddingBottom:20}} className={`bg-[#000000] p-[20px]`}>
      <Vector width={90} height={25} />
      <ImageBackground
        source={{ uri: `${Base_Image_URL}${path}` }}
        style={{ width: width}}
        className={`mt-[30px] h-[470px] rounded-[10px]`}
      >
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/movies/details/[id]",
              params: {
                id: trendingMovies[0].id,
                mediaType: trendingMovies[0].media_type,
                start: "start",
              },
            })
          }
          style={{
            position: "absolute",
            width: (width - 30) / 2,
            left: 10,
            bottom: 25,
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            paddingTop: 15,
            paddingBottom: 15,
          }}
        >
          <Text className="font-poppinsRegular font-bold text-[16px] leading-[24px] color-[#000000]">
            Play
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/movies/moreinfo",
              params: {
                id: trendingMovies[0].id,
                mediaType: trendingMovies[0].media_type,
            }})
          }}
          style={{
            position: "absolute",
            width: (width - 30) / 2,
            right: 10,
            bottom: 25,
            borderRadius: 4,
            backgroundColor: "#515451",
            alignItems: "center",
            paddingTop: 15,
            paddingBottom: 15,
          }}
        >
          <Text className="font-poppinsRegular font-bold text-[16px] leading-[24px] color-[#FFFFFF]">
            Movie Page
          </Text>
        </TouchableOpacity>
      </ImageBackground>

      <Text className="font-robotoRegular font-normal text-[20px] leading-[32px] color-[#FFFFFF] mt-[15px]">
        Popular Movies
      </Text>

      <FlatList
        data={trendingMovies}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 50 }}
        renderItem={({ item, index }) => (
          <TrendingMovies item={item} index={index} />
        )}
      />

      <Text className="mt-[30px] font-robotoRegular font-normal text-[20px] leading-[32px] color-[#FFFFFF]">
        Recent TV Shows
      </Text>

      <FlatList
        data={trendingTVShows}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 20,marginBottom:50}}
        renderItem={({ item, index }) => (
          <TrendingTVShows item={item} index={index} />
        )}
      />
    </ScrollView>
  );
};

export default Movies;
