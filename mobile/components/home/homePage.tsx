import * as React from 'react';
import {Box, Button, Chip, Flex, HStack, VStack} from "@react-native-material/core";
import {useContext} from "react";
import {Page} from "../navigator/NavigatorProvider";
import NavigatorContext from "../navigator/NavigatorProvider";
import { BASE_URL } from "@env"
import axios from "axios";
import {StyleSheet} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const getAllProfileInfo = BASE_URL + 'api/user/all'
const logoutAPI = BASE_URL + 'api/auth/logout'


function HomePage(){
   const {changePage} = useContext(NavigatorContext)

    const logout = () => {
       axios.get(logoutAPI)
           .then(function (response) {
               console.log(response.data)
           }).catch(function (error) {
               console.log(error)
       })
    }

   return(
      <Flex fill style={homePageStyle.page}>
          <HStack style={homePageStyle.menuOnTop}>
              <MaterialCommunityIcons name="account-circle-outline" size={40} color='#7a44cf' style={{marginLeft:5}}/>
              <HStack spacing={5}>
                  <Chip label={'prevDay'} style={homePageStyle.sideChips} labelStyle={homePageStyle.text}/>
                  <Chip label={'today'} style={homePageStyle.middleChip} labelStyle={homePageStyle.text}/>
                  <Chip label={'nextDay'} style={homePageStyle.sideChips} labelStyle={homePageStyle.text}/>
              </HStack>
              <MaterialCommunityIcons name="calendar-search" size={40} color="#7a44cf" style={{marginRight:5}}/>
          </HStack>
          <Box style={homePageStyle.informationBox}>
              <VStack>
                  <HStack style={Object.assign({}, homePageStyle.informationRow, homePageStyle.informationUpperRow)}>
                      <Box style={{width: 30, height:30}}></Box>
                  </HStack>
                  <HStack style={Object.assign({}, homePageStyle.informationRow, homePageStyle.informationMiddleRow)}>

                  </HStack>
                  <HStack style={Object.assign({}, homePageStyle.informationRow, homePageStyle.informationLowerRow)}>

                  </HStack>
              </VStack>
          </Box>
          <Button title={'Logout'} onPress={() => {
              logout()
              changePage(Page.LOGIN)
          }}/>

      </Flex>
   )
}
export default HomePage;

const homePageStyle = StyleSheet.create({
    page: {
        backgroundColor: "#cbb9ff",
    },
    text: {
        color:"#FFF",
        textAlign: "center",
        textTransform: "capitalize"
    },
    sideChips: {
        width: 60,
        padding: 0,
        borderRadius:15,
        height:30,
        backgroundColor: '#7a44cf',
        alignItems: "center",
        justifyContent: "center"
    },
    middleChip: {
        width: 120,
        padding: 0,
        borderRadius:15,
        height:30,
        backgroundColor: '#7a44cf',
        alignItems: "center",
        justifyContent: "center"
    },
    menuOnTop: {
        justifyContent:"space-between",
        marginTop:30,
        flex: 0,
        alignItems: "center",
    },
    informationBox: {
        backgroundColor:'#7a44cf',
        width: '85%',
        alignSelf: "center",
        marginTop: '10%',
        borderRadius: 10
    },
    informationRow: {
        height: 60
    },
    informationUpperRow: {
        height: 35
    },
    informationMiddleRow: {
        height: 70
    },
    informationLowerRow: {
        height: 35
    }
})