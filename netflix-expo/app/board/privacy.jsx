import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Vector from "../../assets/icons/Vector.svg";
import LeftArrow from "../../assets/icons/leftArrow.svg";
import Printer from "../../assets/icons/printer.svg";
import Close from '../../assets/icons/close.svg';
import ChevronLeft from '../../assets/icons/chevronLeft.svg';
import { useRouter } from "expo-router";

const Privacy = () => {
  const width = Dimensions.get("window").width;
  const router = useRouter();

  return (
    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
      <View style={{marginTop: 20, marginBottom: 10}} className="flex-row">
        <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft width={25} height={25} />
        </TouchableOpacity>
        <Vector
            width={95}
            height={25}
            style={{margin: "auto" }}
        />
      </View>
      <View
        style={{ width: width, marginLeft: -20 }}
        className="h-[5px] bg-[#787174]"
      ></View>

      <View style={{marginTop:20}} className="flex-row">
        <Text style={{width:'90%'}} className="font-manropeMedium font-medium text-[14px] leading-[19px] color-[#191B1E]">
            Netflix uses essential and performance & functionality cookies (why?).
            You can change (.your cookie preferences).
        </Text>
        <Close width={20} height={20} style={{position:"absolute",right:0}}/>
      </View>

      <View style={{padding:10,width:"70%",marginTop:20}} className="border-[1px] border-[#726F73]">
        <Text style={{color:"#726F73"}} className="font-manropeMedium font-medium text-[14px] leading-[19px]">Change your cookie preferences</Text>
      </View>

      <View className="flex-row" style={{ marginTop: 20 }}>
        <TouchableOpacity className="flex-row" onPress={() => {
            router.back();
        }}>
            <LeftArrow width={25} height={25} style={{ marginTop: 10 }} />
          <Text
            className="font-manropeMedium font-medium text-[20px] leading-[20px]"
            style={{ marginTop: 15, marginLeft: 10, color: "#E50A14" }}
          >
            Back to Help Home
          </Text>
        </TouchableOpacity>
        <View
          style={{ padding: 10, position: "absolute", right: 0 }}
          className="rounded-[4px] border-[1px] border-[#726F73]"
        >
          <Printer width={25} height={25} />
        </View>
      </View>

      <Text
        style={{ marginTop: 30 }}
        className="font-manropeExtraBold font-extrabold text-[32px] leading-[44px] color-[#000000]"
      >
        Privacy Statement
      </Text>
      <Text
        style={{ marginTop: 20 }}
        className="font-manropeMedium font-medium text-[16px] leading-[24px] color-[#000000]"
      >
        This Privacy Statement explains our practices, including your choices,
        regarding the collection, use, and disclosure of certain information,
        including your personal information in connection with the Netflix
        service.
      </Text>
      <Text className="mt-[15px] font-manropeExtraBold font-extrabold text-[20px] leading-[27px] color-[#000000]">
        Contacting Us
      </Text>
      <Text
        style={{ marginTop: 10 }}
        className="color-[#0000000] font-manropeMedium font-medium text-[16px] leading-[24px]"
      >
        If you have general questions about your account or how to contact
        customer service for assistance, please visit our online help center at
        <Text style={{ color: "#E50A14" }}> help.netflix.com.</Text> For
        questions specifically about this Privacy Statement, or our use of your
        personal information, cookies or similar technologies, please contact
        our Data Protection Officer/Privacy Office by email at{" "}
        <Text style={{ color: "#E50A14" }}>privacy@netflix.com.</Text>
      </Text>
    </View>
  );
};

export default Privacy;
