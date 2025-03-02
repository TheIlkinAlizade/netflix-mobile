import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Boarding = ({item,boardIndex,lastIndex}) => {
  return (
    <View className={`mt-[70px] items-center`}>
      {item.icon}
      <Text
        className={`${
          boardIndex == lastIndex ? "mt-[280px]" : "mt-[15px]"
        } font-robotoRegular font-bold text-[24px] leading-[28px] color-[#FFFFFF]`}
      >
        {item.title}
      </Text>
      <Text
        className={`${item.weight} text-center mt-[20px] font-robotoRegular font-normal text-[20px] leading-[23px] color-[#CCCCCC]`}
      >
        {item.description}
      </Text>
    </View>
  );
};

export default Boarding;

const styles = StyleSheet.create({});
