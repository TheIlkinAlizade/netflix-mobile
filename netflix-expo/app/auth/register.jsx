import { Text, View,Platform, TouchableOpacity } from "react-native";
import React from "react";
import Vector from "../../assets/icons/Vector.svg";
import Input from '../../components/Input/Input'
import { useState } from "react";
import { useRouter } from "expo-router";
import Constants from 'expo-constants';
import Show from "../../assets/icons/show.svg";
import Hide from "../../assets/icons/hide.svg";

const IP_URL = Constants.expoConfig.extra.IP_URL;

const Register = () => {
  const[formData,setFromData] = useState({});
  const [isSecure,setIssecure] = useState(true);
  const os = Platform.OS;
  const router = useRouter();

  const register = async() => {
    try{
      const response = await fetch(`${IP_URL}/auth/signup`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          "Accept":  "application/json"
        },
        body: JSON.stringify(formData),
      });

      if(response.ok)
      {
        router.push("/auth/login");
      }
    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <View style={{backgroundColor:'#161616',padding:'20'}} className="h-full w-full">
      <Vector width={89} height={24} />
      <Text style={{fontWeight:700,lineHeight:37.5}} className="mt-[200px] color-white text-[32px] font-robotoRegular" >Sign Up</Text>
      <Input name='username' setFormData={setFromData} value={formData?.username} placeholder='Username' style={{backgroundColor:'#161616',fontWeight:400,lineHeight:24}} className={`mt-[30px] text-[#FFFFFFB2] text-[16px] border-[1px] font-robotoRegular rounded-[12px] border-[#808080B2] pl-4 bg-white ${os === 'ios' && "py-4"}`} />
      <Input name='email' setFormData={setFromData} value={formData?.email} placeholder='Email' style={{backgroundColor:'#161616',fontWeight:400,lineHeight:24}} className={`mt-[15px] text-[#FFFFFFB2] text-[16px] border-[1px] font-robotoRegular rounded-[12px] border-[#808080B2] pl-4 bg-white ${os === 'ios' && "py-4"}`} />
      <View>
        <Input isSecure={isSecure} name='password' setFormData={setFromData} value={formData?.password} placeholder='Password' style={{backgroundColor:'#161616',fontWeight:400,lineHeight:24}} className={`mt-[15px] text-[#FFFFFFB2] text-[16px] border-[1px] font-robotoRegular rounded-[12px] border-[#808080B2] pl-4 bg-white ${os === 'ios' && "py-4"}`} />
        <TouchableOpacity className="absolute right-[5] top-[30]" TouchableOpacity onPress={() => setIssecure(!isSecure)}>
          {isSecure ? (<Show height={30} width={30} stroke="white" fill="white" />) : (<Hide height={30} width={30} fill="white" />)}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={register} className='mt-[25px] bg-[#E50914] rounded-[4px] items-center'>
          <Text className='my-[11px] color-[#FFFFFF] font-medium font-robotoRegular text-[16px] leading-[16px]'>Sign Up</Text>
      </TouchableOpacity>
      <View className="justify-center items-center">
        <Text className='mt-[25px] color-[#FFFFFFB2] font-robotoRegular font-normal text-[16px] leading-[19px]'>Already have an  to Netflix? </Text>
        <TouchableOpacity onPress={() => {
          router.push('auth/login');
        }}>
          <Text className='mt-[25px] color-[#FFFFFF] font-robotoRegular font-medium text-[16px] leading-[19px]'>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
