import {Button, IconButton, Text, TextInput, VStack} from "@react-native-material/core";
import {View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React, {useContext, useState} from "react";
import NavigatorContext, {Page} from "../navigator/NavigatorProvider";
import {loginPageStyle} from "../loginPage";
import Ripple from 'react-native-material-ripple';
import axios from "axios";
import {BASE_URL} from "@env";
import SwitchSelector from "react-native-switch-selector";



const registerAPI = BASE_URL + 'api/auth/register'

export default function RegisterPage() {
    const {changePage} = useContext(NavigatorContext)
    const [isCoach, setIsCoach] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [firstPassword, setFirstPassword] = useState<string>('')
    const [secondPassword, setSecondPassword] = useState<string>('')
    const [warning, setWarning] = useState<string>('')


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
                   changePage(Page.HOME)
               })
               .catch(function (error) {
                   console.log(error)
               })
       }

    }

   return(
       <View style={loginPageStyle.loginForm}>
          <VStack style={loginPageStyle.vStack}>
              <Text style={loginPageStyle.text}>
                Register Page
              </Text>
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
                      { label: "Coach", value: true }, //images.feminino = require('./path_to/assets/img/feminino.png')
                      { label: 'Normal', value: false } //images.masculino = require('./path_to/assets/img/masculino.png')
                  ]}
              />

              <TextInput style={loginPageStyle.input}
                        onChangeText={(text) => { setEmail(text) } }
                        trailing={<MaterialCommunityIcons name="email" size={24} color="#684dd1" />}
                        placeholder={"email"}
              />
              <TextInput style={loginPageStyle.input}
                        onChangeText={(text) => { setFirstPassword(text) } }
                        leading={<MaterialCommunityIcons name="key" size={24} color="#684dd1" />}
                        trailing={
                           <IconButton
                               icon={<MaterialCommunityIcons name="eye" size={24} color="#684dd1" />}
                           />
                        }
                        placeholder={"password"}
              />
              <TextInput style={loginPageStyle.input}
                         onChangeText={(text) => { setSecondPassword(text) } }
                         leading={<MaterialCommunityIcons name="key" size={24} color="#684dd1" />}
                         trailing={
                           <IconButton
                               icon={<MaterialCommunityIcons name="eye" size={24} color="#684dd1" />}
                           />
                        }
                         placeholder={"password"}
                         helperText={warning}
              />
              <Button title={'Register'}
                    onPress={() => {register()} }
                    style={loginPageStyle.button}
              />
              <Ripple onPress={ () => { changePage(Page.LOGIN) } }>
                <Text style={loginPageStyle.text}>
                   Login
                </Text>
              </Ripple>
              <Ripple onPress={ () => { changePage(Page.HOME) } }>
                  <Text style={loginPageStyle.text}>
                      HomePage
                  </Text>
              </Ripple>
              <Text>
                  {firstPassword}
                  {' ' + secondPassword}
                  {isCoach}
              </Text>
          </VStack>
      </View>
   )
}


