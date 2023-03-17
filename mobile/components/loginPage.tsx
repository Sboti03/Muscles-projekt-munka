import {Button, IconButton, Text, TextInput, VStack} from "@react-native-material/core";
import React, {useContext, useState} from "react";
import NavigatorContext, {Page} from "./navigator/NavigatorProvider";
import {StyleSheet, View} from "react-native";
import {BASE_URL} from "@env";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Ripple from "react-native-material-ripple";
import AuthContext from "./auth/AuthContext";

const loginAPI: string = BASE_URL + 'api/auth/login'
export default function LoginPage() {
    const {changePage} = useContext(NavigatorContext)
    const {login, setUser} = useContext(AuthContext)
    const [email, setEmail] = useState<string>('email')
    const [password, setPassword] = useState<string>('password')



    return (
        <View style={loginPageStyle.loginForm}>
            <VStack style={loginPageStyle.vStack}>
                <Text style={loginPageStyle.text}>
                    Login Page
                </Text>
                <TextInput style={loginPageStyle.input}
                           onChangeText={ (text) => { setEmail(text) } }
                           trailing={<MaterialCommunityIcons name="email" size={24} color="#684dd1" />}
                           placeholder={"email"}
                />
                <TextInput style={loginPageStyle.input}
                           onChangeText={ (text) => { setPassword(text) } }
                           leading={<MaterialCommunityIcons name="key" size={24} color="#684dd1" />}
                           trailing={
                                <IconButton
                                    icon={<MaterialCommunityIcons name="eye" size={24} color="#684dd1" />}
                                />
                            }
                           placeholder={"password"}
                />

                <Button title={'Login'}
                        onPress={() => {
                            login(email, password)
                        } }
                        style={loginPageStyle.button}
                />
                <Ripple onPress={()=>changePage(Page.REGISTER)} >
                    <Text style={loginPageStyle.text}>
                        Register
                    </Text>
                </Ripple>
                <Ripple onPress={ () => { changePage(Page.HOME) } }>
                    <Text style={loginPageStyle.text}>
                        HomePage
                    </Text>
                </Ripple>
                <Ripple onPress={ () => { changePage(Page.NAME) } }>
                    <Text style={loginPageStyle.text}>
                        Profile Form
                    </Text>
                </Ripple>
            </VStack>
        </View>)

}

export const loginPageStyle = StyleSheet.create({
    loginForm: {
        backgroundColor: '#cbb9ff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center"
    },
    input: {
        width: 300,
        height: 70,
        margin: 20,
    },
    vStack: {
        alignItems: "center",
    },
    text: {
      textTransform: "capitalize"
    },
    button: {
        margin: 20,
    }
})
