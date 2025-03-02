import { Text, View } from 'react-native'
import React from 'react'
import Logo from "../../assets/icons/logo.svg"
import Login from "../auth/login"
import Register from "../auth/register"
import Movies from '../movies'
import { ScrollView } from 'react-native-gesture-handler'
import Board from '../board/index'

const index = () => {

    return (
        <View>
            <Movies />
            {/* <Board /> */}
            {/* <Login /> */}
            {/* <Register /> */}
        </View>
    )

}

export default index