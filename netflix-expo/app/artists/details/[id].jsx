import React, { act } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import LeftArrow2 from "../../../assets/icons/leftArrow2";
import { router } from "expo-router";
import UserIcon from "../../../assets/icons/userIcon.svg"

const { width } = Dimensions.get("window");

const getGenderText = (gender) => {
  if (gender === 1) return "Female";
  if (gender === 2) return "Male";
  return "Unknown";
};

const Details = () => {
  const { actorData } = useLocalSearchParams();
  const actor = JSON.parse(actorData);

  return (
    <ScrollView className="flex-1 bg-[#121212]">
      <TouchableOpacity className="mb-[10px]" onPress={() => router.back()}>
        <LeftArrow2 width={40} height={40} />
      </TouchableOpacity>
      <View className="relative w-full h-[250px] items-center">
        {actor.profile_path ? (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
            }}
            className="w-full h-full object-cover"
          />
        ) : 
        (
          <Image
            source={require(`../../../assets/images/UserBG.webp`)}
            className="w-full h-full object-cover"
          />
        )}


        <View className="absolute w-full h-full bg-black opacity-50" />
        {actor.profile_path ? (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
            }}
            className="w-[130px] h-[130px] rounded-full absolute bottom-[-60px] border-[3px] border-white"
          />
        ) : 
        (
          <UserIcon width={130} height={130} style={{borderRadius:100,position:"absolute",bottom:-60,borderWidth:3,borderColor:"white", resizeMode: "cover" }}  />
        )}
      </View>

      <View className="items-center mt-[70px] px-4">
        <Text className="text-[28px] font-bold text-white">{actor.name}</Text>
        <Text className="text-base text-[#aaa] mt-1">
          🎭 {actor.known_for_department}
        </Text>
      </View>

      <View className="bg-[#1e1e1e] mx-4 my-5 p-4 rounded-lg">
        <Text className="text-sm text-[#ccc] my-1">
          Original Name: {actor.original_name || actor.name}
        </Text>
        <Text className="text-sm text-[#ccc] my-1">
          Gender: {getGenderText(actor.gender)}
        </Text>
        <Text className="text-sm text-[#ccc] my-1">
          Popularity: {actor.popularity.toFixed(2)}
        </Text>
        <Text className="text-sm text-[#ccc] my-1">
          Adult Content: {actor.adult ? "Yes" : "No"}
        </Text>
      </View>

      <Text className="text-2xl font-bold text-white my-4 ml-4">
        🎬 Known Works
      </Text>
      <FlatList
        data={actor.known_for}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        renderItem={({ item }) => (
          <View className="bg-[#242424] rounded-lg p-2.5 mr-4 w-[200px]">
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              className="w-[180px] h-[270px] rounded-lg self-center"
            />
            <Text className="text-lg font-bold text-white mt-2 text-center">
              {item.original_title || item.name}
            </Text>
            {item.release_date && (
              <Text className="text-xs text-[#ffcc00] text-center mt-1">
                Release: {item.release_date}
              </Text>
            )}
            {item.first_air_date && (
              <Text className="text-xs text-[#ffcc00] text-center mt-1">
                Air Date: {item.first_air_date}
              </Text>
            )}
            <Text className="text-xs text-[#ffcc00] text-center mt-1">
              Rating: {item.vote_average} ({item.vote_count} votes)
            </Text>
            <Text className="text-xs text-[#ffcc00] text-center mt-1">
              Language: {item.original_language.toUpperCase()} - Popularity:{" "}
              {item.popularity.toFixed(1)}
            </Text>
            <Text
              numberOfLines={3}
              className="text-xs text-[#ddd] mt-1 text-justify"
            >
              {item.overview}
            </Text>
          </View>
        )}
      />

      <Text className="text-2xl font-bold text-white my-4 ml-4">
        📜 Description
      </Text>
      <Text className="text-sm text-[#ddd] text-justify mb-5 px-4">
        {actor.known_for?.[0]?.overview || "Description not available."}
      </Text>
    </ScrollView>
  );
};

export default Details;
