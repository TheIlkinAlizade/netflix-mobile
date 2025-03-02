import { Text, View, FlatList, TouchableOpacity,Dimensions, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import Vector from "../../assets/icons/Vector.svg";
import Laptop from "../../assets/icons/laptop.svg";
import Download from "../../assets/icons/download.svg";
import Population from "../../assets/icons/population.svg";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Boarding from '../../components/Boarding'
const data = [
  {
    id: 1,
    title: "Watch on any device",
    description: "Stream on your phone, tablet, laptop and TV without playing more",
    icon: <Laptop width={265} height={250} />,
    weight: 'w-[320px]',
  },
  {
    id: 2,
    title: "3, 2, 1,... download!",
    description: "Always have something to Watch offline.",
    icon: <Download width={290} height={280} />,
    weight: 'w-[235px]',
  },
  {
    id: 3,
    title: "No pesky contracts. ",
    description: "cancel anytime",
    icon: <Population width={310} height={240} />,
    weight: 'w-[135px]',
  },
  {
    id: 4,
    title: "How do I watch?",
    description: "Members that subscribe to Netflix can watch here in the app",
    icon: null,
    weight: 'w-[340px]',
  },
];

const Board = () => {
  const [boardIndex,setBoardIndex] = useState(0);
  const width = Dimensions.get('window').width - 20;
  const lastIndex = 3;
  const router = useRouter();
  
  const bg = boardIndex === lastIndex ? require('../../assets/images/BG.png') : null;
  
  const finish = async() => {
    setBoardIndex(( prevState ) => prevState + 1);
    if(boardIndex == lastIndex){
      router.push('/auth/login');
      await AsyncStorage.setItem("first",'yes');
    }
  }

  return (
    <ImageBackground
      source={bg}
      style={{ backgroundColor: "#000000" }}
      className="w-full h-full justify-center items-center"
    >
      <View className="flex-row">
        <Vector width={130} height={40} style={{ marginTop: 40 }} />
        <TouchableOpacity onPress={() => {
          router.push("board/privacy");
        }}>
          <Text className="left-[65px] top-[51px] font-normal font-robotoRegular text-[14px] leading-[17px] color-[#FFFFFF]">
          Privacy
          </Text>
        </TouchableOpacity>
        <Text className="left-[75px] top-[51px] font-normal font-robotoRegular text-[14px] leading-[17px] color-[#FFFFFF]">
          Help
        </Text>
      </View>
      <FlatList
        scrollEnabled={false}
        data={data.filter((_, index) => index === boardIndex)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Boarding item={item} boardIndex={boardIndex} lastIndex={lastIndex} />
        )}
      />

      <View className="mb-[35px] items-center flex-row">
        {data.map((_,index) => (
          <View key={index} className={`rounded-[4px] w-[10px] h-[10px] ${index != 0 && 'ml-[20px]'} ${boardIndex === index ? 'bg-red-600' : 'bg-gray-300'}`}></View>
        ))}
      </View>

      <TouchableOpacity onPress={finish} style={{width:width}} className="bg-[#E50914] mb-[10px] mx-[10px] py-[10px] items-center">
        <Text className="font-robotoRegular font-extrabold text-[14px] leading-[16px] color-[#000000]">NEXT</Text>
      </TouchableOpacity>

    </ImageBackground>
  );
};

export default Board;
