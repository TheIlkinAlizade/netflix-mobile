import { TextInput } from 'react-native'

const Input = ({ name, placeholder, value, setFormData,className,style,isSecure }) => {
    return (
        <TextInput placeholderTextColor={"#FFFFFFB2"} secureTextEntry={(name === "password" || name === "repeat_password") && isSecure ? true : false} defaultValue={value} onChangeText={(text) => {
            setFormData(prevState => ({ ...prevState, [name]: name === "email" ? text.toLowerCase() : text }))
        }} placeholder={placeholder} className={className} style={style} />
    )
}

export default Input