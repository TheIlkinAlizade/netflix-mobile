import { Text, View, Dimensions, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import LeftArrow2 from "../../assets/icons/leftArrow2";

const IP_URL = Constants.expoConfig.extra.IP_URL;
const Base_Image_URL = Constants.expoConfig.extra.Base_Image_URL;

const MoreInfoTv = () => {
  const [data, setData] = useState({});
  const [seasons, setSeasons] = useState([]);
  const { id, mediaType } = useLocalSearchParams();
  const width = Dimensions.get('window').width;

  const getData = async () => {
    try {
      const response = await fetch(`${IP_URL}/${mediaType}/${id}/details`);
      const apiData = await response.json();
      setData(apiData.content);
      setSeasons(apiData.content.seasons);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView className='bg-[#1C1C1C] flex-1'>
      <TouchableOpacity onPress={() => router.back()}>
        <LeftArrow2 width={40} height={40} />
      </TouchableOpacity>
      <View className='m-[20px]'>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}` }}
          className='h-[300px] rounded-[10px]'
          style={{ width: width - 40}}
          resizeMode='stretch'
        />
        {data.name && (
        <View>
          <Text className='color-[#FFFFFF] text-[32px] font-bold my-[10px]'>
            {data.name}
          </Text>
          <Text className='color-[#B0B0B0] text-[16px] mb-[5px]'>
            {data.tagline}
          </Text>
        </View>
        )}
      </View>
 
      <View className='mx-[20px]'>
        <Text className='color-[#FFFFFF] text-[14px] leading-[24px] mb-[20px]'>
          {data.overview}
        </Text>
      </View>

      <View className='flex-row mb-[20px] ml-[20px]'>
        {data.genres && data.genres.map((genre, index) => (
          <View key={genre.id} className='bg-[#27272A] py-[8px] px-[15px] mr-[10px] rounded-[5px] mb-[10px]'>
            <Text className='color-[#FFFFFF] text-[12px]'>
              {genre.name}
            </Text>
          </View>
        ))}
      </View>

      <View className='flex-row mb-[20px] ml-[20px]'>
        {data.spoken_languages && data.spoken_languages.length > 0 && (
          <View className='mr-[20px]'>
            <Text className='color-[#B0B0B0] text-[14px]'>Languages</Text>
            {data.spoken_languages.map((language, index) => (
              <Text key={index} className='color-[#FFFFFF] text-[12px]'>
                {language.english_name}
              </Text>
            ))}
          </View>
        )}
        {data.production_countries && data.production_countries.length > 0 && (
          <View>
            <Text className='color-[#B0B0B0] text-[14px]'>Countries</Text>
            {data.production_countries.map((country, index) => (
              <Text className='color-[#FFFFFF] text-[12px]' key={index}>
                {country.name}
              </Text>
            ))}
          </View>
        )}
      </View>

      <View className='ml-[20px] mb-[20px]'>
        <Text className='color-[#B0B0B0] text-[14px]'>Rating</Text>
        <Text className='color-[#FFFFFF] text-[18px]'>
          {data.vote_average ? data.vote_average.toFixed(1) : 'N/A'} / 10 
        </Text>
        <Text className='color-white mt-[5px]'>Vote Count: {data.vote_count}</Text>
      </View>

      <Text className='ml-[20px] mb-[20px] color-white'>Popularity: {data.popularity}</Text>
      <Text className='ml-[20px] mb-[0px] color-white'>First Air date: {data.first_air_date}</Text>
      <Text className='ml-[20px] mb-[20px] color-white'>Last Air date: {data.last_air_date}</Text>
  
      {data.production_companies && (
        <View className='ml-[20px] mb-[20px]'>
          <Text className='color-[#B0B0B0] text-[14px]'>Production Companies</Text>
          {data.production_companies.map((company, index) => (
            <Text key={index} className='text-[12px] color-[#FFFFFF]'>
              {company.name}
            </Text>
          ))}
        </View>
      )}

      <View className='ml-[20px] mb-[20px]'>
        {data.budget && (
          <Text className='color-[#B0B0B0] text-[14px]'>Budget: ${data.budget.toLocaleString()}</Text>
        )}
        {data.revenue && (
          <Text className='color-[#B0B0B0] text-[14px]'>Revenue: ${data.revenue.toLocaleString()}</Text>
        )}
      </View>

      <Text className='color-[#FFFFFF] text-[20px] ml-[20px] mb-[10px]'>
        Seasons
      </Text>
      {seasons && seasons.map((season, index) => (
        <View key={season.id} className='mb-[20px] flex-row items-start justify-between'>
          <Image
            source={{ uri: `${Base_Image_URL}${season.poster_path}` }}
            style={{
              width: width * 0.45,
              height: 250,
              borderRadius: 10,
              marginRight: 15,
              marginLeft:5
            }}
            resizeMode="stretch"
          />
          <View className='flex-1'>
            <Text className='color-[#FFFFFF] text-[16px] mb-[5px]'>
              Season {season.season_number} - {season.name}
            </Text>
            <Text className='color-[#FFFFFF] text-[14px]'>
              {season.overview}
            </Text>
          </View>
        </View>
      ))}

      <Text className='color-[#B0B0B0] text-[12px] mb-[20px] text-center'>
        Powered by {data.networks && data.networks[0].name}
      </Text>
    </ScrollView>
  );
};

export default MoreInfoTv;
