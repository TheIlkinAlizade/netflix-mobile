import { Text, View,Platform, TouchableOpacity } from "react-native";
import React from "react";
import Vector from "../../assets/icons/Vector.svg";
import Input from '../../components/Input/Input'
import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants'
import Show from "../../assets/icons/show.svg";
import Hide from "../../assets/icons/hide.svg";

const IP_URL = Constants.expoConfig.extra.IP_URL;

const Login = () => {
  const[formData,setFromData] = useState({});
  const os = Platform.OS;
  const router = useRouter();
  const [isSecure,setIssecure] = useState(true);

  const login = async () => {
    try {
      const response = await fetch(
        `${IP_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("token", data.token);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{backgroundColor:'#161616',padding:'20'}} className="h-full w-full" >
      <Vector width={89} height={24}/>
      <Text style={{fontWeight:700,lineHeight:37.5}} className="mt-[200px] color-white text-[32px] font-robotoRegular" >Sign In</Text>
      <Input name='email' setFormData={setFromData} value={formData?.email} placeholder='Email' style={{backgroundColor:'#161616',fontWeight:400,lineHeight:24}} className={`mt-[30px] text-[#FFFFFFB2] text-[16px] border-[1px] font-robotoRegular rounded-[12px] border-[#808080B2] pl-4 bg-white ${os === 'ios' && "py-4"}`} />
      <View>
        <Input isSecure={isSecure} name='password' setFormData={setFromData} value={formData?.password} placeholder='Password' style={{backgroundColor:'#161616',fontWeight:400,lineHeight:24}} className={`mt-[15px] text-[#FFFFFFB2] text-[16px] border-[1px] font-robotoRegular rounded-[12px] border-[#808080B2] pl-4 bg-white ${os === 'ios' && "py-4"}`} />
        <TouchableOpacity className="absolute right-[5] top-[30]" TouchableOpacity onPress={() => setIssecure(!isSecure)}>
          {isSecure ? (<Show height={30} width={30} stroke="white" fill="white" />) : (<Hide height={30} width={30} fill="white" />)}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={login} style={{backgroundColor:'#ff0000'}} className='mt-[25px] bg-[#E50914] rounded-[4px] items-center'>
        <Text className='my-[11px] color-[#FFFFFF] font-medium font-robotoRegular text-[16px] leading-[16px]'>Sign In</Text>
      </TouchableOpacity>
      <View className='flex-row justify-center'>
        <Text className='mt-[25px] color-[#FFFFFFB2] font-robotoRegular font-normal text-[16px] leading-[19px]'>Don't have an account?</Text>
        <TouchableOpacity onPress={() => {
          router.push('auth/register');
        }}>
          <Text className='mt-[25px] ml-[5px] color-[#FFFFFF] font-robotoRegular font-medium text-[16px] leading-[19px]'>Sign up!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
