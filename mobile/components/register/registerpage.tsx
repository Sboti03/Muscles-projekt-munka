import {Button, Divider, Flex, HStack, IconButton, Text, TextInput, VStack} from "@react-native-material/core";
import {StyleSheet, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React, {useContext, useState} from "react";
import NavigatorContext, {Page} from "../navigator/NavigatorProvider";
import {loginPageStyle} from "../loginPage";
import Ripple from 'react-native-material-ripple';
import axios from "axios";
import {BASE_URL} from "@env";
// @ts-ignore
import SwitchSelector from "react-native-switch-selector";
import { LinearGradient } from 'expo-linear-gradient';


const registerAPI = BASE_URL + 'api/auth/register'

export default function RegisterPage() {
    const {changePage} = useContext(NavigatorContext)
    const [isCoach, setIsCoach] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [firstPassword, setFirstPassword] = useState<string>('')
    const [secondPassword, setSecondPassword] = useState<string>('')
    const [warning, setWarning] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(true)


    const isPasswordEqual = () => {
        return firstPassword === secondPassword
    }
    const register = () => {
       if (!isPasswordEqual()) {
           setWarning('Passwords should be the same')
       } else {
           setWarning('')
           axios.post(registerAPI, {email: email, password: firstPassword, isCoach: isCoach})
               .then(function (response) {
                   console.log(response.data)
                   changePage(Page.NAMEFORM)
               })
               .catch(function (error) {
                   console.log(error)
               })
       }

    }

   return(
       <LinearGradient  colors={['#efe8fd', '#865eff']}
                        style={{width: '100%', flex: 1, alignItems: "center"}}>
       <Flex fill >

           <Text style={registerStyles.title}>
               Register Page
           </Text>
          <VStack style={registerStyles.container} spacing={15}>
              <SwitchSelector
                  initial={1}
                  style={{width: 300}}
                  onPress={(value: boolean) => {
                      setIsCoach(value)
                      console.log(value.valueOf())
                  }}
                  textColor={'#7a44cf'} //'#7a44cf'
                  selectedColor={'#FFF'}
                  buttonColor={'#7a44cf'}
                  borderColor={'#7a44cf'}
                  hasPadding
                  animationDuration={250}
                  options={[
                      { label: "Coach", value: true },
                      { label: 'Normal', value: false }
                  ]}
              />

              <TextInput style={registerStyles.inputBox}
                         onChangeText={(text) => { setEmail(text) } }
                         trailing={<MaterialCommunityIcons name="email" size={24} color="#684dd1" />}
                         placeholder={"email"}
                         inputStyle={registerStyles.input}
                         inputContainerStyle={registerStyles.inputContainer}
                         placeholderTextColor={'#ebd8fc'}
                         leadingContainerStyle={{alignSelf: 'center'}}
                         trailingContainerStyle={{alignSelf: 'center'}}
              />
              <TextInput style={registerStyles.inputBox}
                         onChangeText={(text) => { setFirstPassword(text) } }
                         leading={<MaterialCommunityIcons name="key" size={24} color="#684dd1" />}
                         secureTextEntry={visible}
                         inputStyle={registerStyles.input}
                         inputContainerStyle={registerStyles.inputContainer}
                         placeholderTextColor={'#ebd8fc'}
                         trailing={
                             <IconButton
                                 icon={visible?<MaterialCommunityIcons name="eye-off" size={24} color="#684dd1" />: <MaterialCommunityIcons name="eye" size={24} color="#684dd1" />}
                                 onPress={() => setVisible(!visible)}
                             />
                         }
                         leadingContainerStyle={{alignSelf: 'center'}}
                         trailingContainerStyle={{alignSelf: 'center'}}
                         placeholder={"password"}
              />
              <TextInput style={registerStyles.inputBox}
                         onChangeText={(text) => { setSecondPassword(text) } }
                         leading={<MaterialCommunityIcons name="key" size={24} color="#684dd1" />}
                         secureTextEntry={visible}
                         inputStyle={registerStyles.input}
                         inputContainerStyle={registerStyles.inputContainer}
                         placeholderTextColor={'#ebd8fc'}
                         trailing={
                             <IconButton
                                 icon={visible?<MaterialCommunityIcons name="eye-off" size={24} color="#684dd1" />: <MaterialCommunityIcons name="eye" size={24} color="#684dd1" />}
                                 onPress={() => setVisible(!visible)}
                             />
                         }
                         leadingContainerStyle={{alignSelf: 'center'}}
                         trailingContainerStyle={{alignSelf: 'center'}}
                         placeholder={"password"}
                         helperText={warning}
              />
              <HStack style={{width: '100%' , justifyContent: 'space-between'}}>
                  <Ripple onPress={ () => { changePage(Page.LOGIN) } }
                          style={registerStyles.pressable}
                  >
                      <Text style={registerStyles.text}>
                          Login
                      </Text>
                  </Ripple>
                  <Button title={'Register'}
                          onPress={() => {register()} }
                          style={registerStyles.registerButton}
                  />
              </HStack>
          </VStack>
      </Flex>
       </LinearGradient>
   )
}
const registerStyles = StyleSheet.create({
    page: {


    },
    container: {
        flex: 1,
        alignSelf: "center",
        width: 300,
        justifyContent: "center",
        marginBottom: 70,
    },
    input: {
        color: '#e6daff',
        paddingLeft: 14,
    },
    inputBox: {
        width: 300,
        height: 70,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 0,
        borderColor: '#FFF',
    },
    inputContainer: {
        backgroundColor: '#aa8dff',
        borderRadius: 30,
        flexGrow: 1
    },
    title: {
        textAlign: "center",
        fontFamily: 'serif',
        marginTop: 80,
        fontSize: 50,
        color: '#FFF'
    },
    text: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textShadowColor: '#FFF',
        textShadowRadius: 2,
        textShadowOffset: {width: 2, height: 20}

    },

    pressable: {
        justifyContent: 'center',
        marginLeft: 20,
        // borderColor: '#FFF',
        // borderWidth: 1,
        // borderRadius: 10,
        // borderBottomWidth: 2,
        // borderRightWidth: 2,

    },
    registerButton: {
        backgroundColor: '#7a44cf'
    }
})


