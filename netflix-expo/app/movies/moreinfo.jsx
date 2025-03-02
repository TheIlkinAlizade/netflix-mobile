import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, Linking, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import LeftArrow2 from "../../assets/icons/leftArrow2"

const IP_URL = Constants.expoConfig.extra.IP_URL;

const MoreInfo = () => {
  const [movie, setMovie] = useState(null);
  const { id, mediaType } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch(`${IP_URL}/${mediaType}/${id}/details`);
      const apiData = await response.json();
      setMovie(apiData.content);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#E50A14" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black">
      <TouchableOpacity onPress={() => router.back()}>
        <LeftArrow2 width={40} height={40} />
      </TouchableOpacity>
      <View className="relative">
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}` }}
          className="w-full h-96 opacity-60"
          resizeMode="stretch"
        />
        <View className="absolute inset-0 bg-black opacity-50"></View>
        <Text className="absolute bottom-6 left-4 text-white text-4xl font-bold">{movie.title}</Text>
      </View>

      <View className="px-4 py-6">
        <Text className="text-white text-center text-2xl font-bold">{movie.original_title}</Text>
        <Text className="text-gray-400 text-center">{movie.release_date?.split("-")[0]}</Text>
        <Text className="text-yellow-400 text-xl font-bold text-center mt-2">{movie.tagline}</Text>
      </View>

      <View className="flex-row flex-wrap justify-center mb-4">
        {movie.genres.map((genre) => (
          <Text key={genre.id} className="text-gray-300 bg-gray-800 px-3 py-1 rounded-lg mr-2 mb-2">
            {genre.name}
          </Text>
        ))}
      </View>

      <View className="p-4">
        {movie.overview ? (
          <Text className="text-gray-200 text-lg">{movie.overview}</Text>
        ) : (
          <Text className="text-gray-500 text-lg italic">There is no summary information available.</Text>
        )}
      </View>

      <View className="flex-row justify-center items-center mt-4 mb-4">
        <Text className="text-yellow-400 text-2xl font-bold">⭐ {movie.vote_average}</Text>
        <Text className="text-gray-400 text-lg ml-2">({movie.vote_count} votes)</Text>
      </View>

      <View className="p-4">
        <Text className="text-gray-300 text-lg">📍 Countries: {movie.production_countries.map((c) => c.name).join(", ")}</Text>
        <Text className="text-gray-300 text-lg">🗣️ Languages: {movie.spoken_languages.map((l) => l.english_name).join(", ")}</Text>
        <Text className="text-gray-300 text-lg">⌛ Duration: {movie.runtime} minutes</Text>
        <Text className="text-gray-300 text-lg">💰 Budget: ${movie.budget.toLocaleString()}</Text>
        <Text className="text-gray-300 text-lg">📈 Revenue: ${movie.revenue.toLocaleString()}</Text>
      </View>

      {movie.production_companies.length > 0 && (
        <View className="p-4">
          <Text className="text-white text-lg font-bold mb-2">🎬 Production Companies</Text>
          {movie.production_companies.map((company) => (
            <View key={company.id} className="flex-row items-center mb-2">
              {company.logo_path && (
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${company.logo_path}` }}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <Text className="text-gray-400 text-lg">{company.name}</Text>
            </View>
          ))}
        </View>
      )}

      {movie.imdb_id && (
        <TouchableOpacity onPress={() => Linking.openURL(`https://www.imdb.com/title/${movie.imdb_id}/`)} className="p-4">
          <Text className="text-blue-400 text-lg text-center">🔗 Open IMDb Page</Text>
        </TouchableOpacity>
      )}

      {movie.homepage && (
        <TouchableOpacity onPress={() => Linking.openURL(movie.homepage)} className="p-4">
          <Text className="text-blue-400 text-lg text-center">🌐 Visit Movie Official Website</Text>
        </TouchableOpacity>
      )}

      {movie.video && (
        <View className="p-4">
          <Button title="Watch Trailer" onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${movie.video}`)} />
        </View>
      )}
    </ScrollView>
  );
};

export default MoreInfo;
