import {Button, Flex, HStack, IconButton, Text, TextInput, VStack} from "@react-native-material/core";
import React, {useContext, useEffect, useState} from "react";
import NavigatorContext, {Page} from "./navigator/NavigatorProvider";
import {StyleSheet, View} from "react-native";
import {BASE_URL} from "@env";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Ripple from "react-native-material-ripple";
import AuthContext from "./auth/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import PageHistoryContext from "./PageHistory/PageHistoryProvider";

const loginAPI: string = BASE_URL + 'api/auth/login'
export default function LoginPage() {
    const {changePage} = useContext(NavigatorContext)
    const {login, setUser} = useContext(AuthContext)
    const {addPage, deleteLastPage, pageHistory} = useContext(PageHistoryContext)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(true)

    useEffect(() => {
        console.log('Page History LoginPage')
        console.log(pageHistory)
    }, [])

    return (
        <LinearGradient  colors={['#efe8fd', '#865eff']}
                         style={{width: '100%', flex: 1, alignItems: "center"}}>
        <Flex fill>
            <Text style={loginPageStyle.title}>
                Login Page
            </Text>
            <VStack style={loginPageStyle.vStack}>
                <TextInput style={loginPageStyle.inputBox}
                           onChangeText={ (text) => { setEmail(text) } }
                           trailing={<MaterialCommunityIcons name="email" size={24} color="#684dd1" />}
                           placeholder={"email"}
                />
                <TextInput style={loginPageStyle.inputBox}
                           onChangeText={ (text) => { setPassword(text) } }
                           leading={<MaterialCommunityIcons name="key" size={24} color="#684dd1" />}
                           secureTextEntry={visible}
                           trailing={
                                <IconButton
                                    icon={visible?<MaterialCommunityIcons name="eye-off" size={24} color="#684dd1" />: <MaterialCommunityIcons name="eye" size={24} color="#684dd1" />}
                                    onPress={() => setVisible(!visible)}
                                />
                            }
                           placeholder={"password"}
                />
                <HStack style={{width: '100%' , justifyContent: 'space-between'}}>
                    <Ripple onPress={()=> {
                        changePage(Page.REGISTER)
                        deleteLastPage()
                        addPage(Page.REGISTER)

                    }} >
                        <Text style={loginPageStyle.text}>
                            Register
                        </Text>
                    </Ripple>
                    <Button title={'Login'}
                            onPress={() => {
                                login(email, password)
                            } }
                            style={loginPageStyle.button}
                    />
                </HStack>
            </VStack>
        </Flex>
        </LinearGradient>
            )

}

export const loginPageStyle = StyleSheet.create({
    page: {
        backgroundColor: '#cbb9ff',

    },
    loginForm: {
        backgroundColor: '#cbb9ff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center"
    },
    inputBox: {
        width: 300,
        height: 70,
    },
    vStack: {
        flex: 1,
        alignSelf: "center",
        width: 300,
        justifyContent: "center",
        marginBottom: 70,
    },
    title: {
        textAlign: "center",
        fontFamily: 'serif',
        marginTop: 80,
        fontSize: 50,
        color: '#FFF'
    },
    text: {
      textTransform: "capitalize"
    },
    button: {

    }
})
