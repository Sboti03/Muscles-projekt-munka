import * as React from 'react';
import {Box, Button, Chip, Flex, HStack, Text, VStack} from "@react-native-material/core";
import {useContext} from "react";
import {Page} from "../navigator/NavigatorProvider";
import NavigatorContext from "../navigator/NavigatorProvider";
import { BASE_URL } from "@env"
import axios from "axios";
import {StyleSheet} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as Progress from 'react-native-progress';
import AuthContext from "../auth/AuthContext";
import createFood from "../food/createFood";
import CreateMealHistory from "../mealHistory/createMealHistory";
import {UnitsEnum} from "../food/food";
import {err} from "react-native-svg/lib/typescript/xml";

const getAllProfileInfo = BASE_URL + 'api/user/all'
const getAllGoalData = BASE_URL + 'api/goals'
const profileCreate = BASE_URL + 'api/profile/create'
const profileGet = BASE_URL + 'api/profile'
const getMealHistoryData = BASE_URL + 'api/meal-history/data?date=2023-03-10'
const createFoodApi = BASE_URL + 'api/food'
const createMealHistoryApi = BASE_URL + 'api/meal-history/create'


function HomePage(){
   const {changePage} = useContext(NavigatorContext)
    const {logout} = useContext(AuthContext)
    
    const postFood = () => {
        axios.post(createFoodApi, {name: 'Chicken breast',
            kcal: 165,
            carbohydrate: 0,
            fiber: 0,
            protein: 31,
            unit: "GRAM",
            perUnit: 100,
            sugar: 0,
            saturatedFat: 1,
            polyunsaturatedFat: 0.75,
            monounsaturatedFat: 1.25,
            fat: 3.58})
            .then(function (response) {
                console.log(response.data)
            }).catch(function (error) {
            console.log(error)
            console.log('alma')
        })
    }
    const getData = () => {
       axios.get(profileGet)
           .then(function (response) {
               console.log(response.data)
           })
           .catch(function (error) {
               console.log(error)
        })
    }
    const createMealHistory = () => {
        axios.post(createFoodApi, CreateMealHistory())
            .then(function (response) {
                console.log(response.data)
            }).catch(function (error) {
            console.log(error)
            console.log('alma')
        })
    }
    const createProfile = () => {
       axios.post(profileCreate, {firstName: 'Csanad', lastName: 'Kormos', birthDay: '2000-05-30', height:175})
           .then(function (response) {
               console.log(response.data)
           })
           .catch(function (error) {
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
                      <Box style={{width: 30, height:30, backgroundColor:'white', borderRadius: 10,}}></Box>
                  </HStack>
                  <HStack style={Object.assign({}, homePageStyle.informationRow, homePageStyle.informationMiddleRow)}>
                      <VStack>
                          <Text style={Object.assign({}, homePageStyle.text, homePageStyle.informationMiddleRowNumber)}>0</Text>
                          <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationMiddleRowText)}>Eaten</Text>
                      </VStack>
                      <VStack>
                          <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationMiddleRowNumber)}>1750</Text>
                          <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationMiddleRowText)}>Remaining</Text>
                      </VStack>
                      <Box style={{width: '10%'}}></Box>
                  </HStack>
                  <HStack style={Object.assign({}, homePageStyle.informationRow, homePageStyle.informationLowerRow)}>
                      <VStack style={{justifyContent: "center", alignItems:'center'}}>
                          <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowText)}>Carbohydrate</Text>
                          <Progress.Bar progress={0.3} width={90} height={3} color={'#FFF'} borderWidth={0} unfilledColor={'#8a66cc'}/>
                          <HStack>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>0</Text>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>/</Text>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>123</Text>
                          </HStack>
                      </VStack>
                      <VStack style={{justifyContent: "center", alignItems:'center'}}>
                          <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowText)}>Protein</Text>
                          <Progress.Bar progress={0.3} width={90} height={3} color={'#FFF'} borderWidth={0} unfilledColor={'#8a66cc'}/>
                          <HStack>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>50</Text>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>/</Text>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>100</Text>
                          </HStack>
                      </VStack>
                      <VStack style={{justifyContent: "center", alignItems:'center'}}>
                          <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowText)}>Fat</Text>
                          <Progress.Bar progress={0.3} width={90} height={3} color={'#FFF'} borderWidth={0} unfilledColor={'#8a66cc'}/>
                          <HStack>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>20</Text>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>/</Text>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>40</Text>
                          </HStack>
                      </VStack>
                  </HStack>
              </VStack>
          </Box>
          <Button title={'getData'} onPress={() => {
              getData()
          }
          }/>
          <Button title={'createProfile'} onPress={() => {
              createProfile()
          }
          }/>
          <Button title={'Logout'} onPress={() => {
              logout()
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
        height: 45,
        borderRadius: 10,
        flexDirection:"row",
        justifyContent:"flex-end"
    },
    informationMiddleRow: {
        height: 70,
        justifyContent: "space-evenly",
    },
    informationLowerRow: {
        height: 55,
        justifyContent:"space-evenly"
    },
    informationLowerRowText: {
        fontSize:13,
    },
    informationLowerRowNumbers: {
        fontSize:10,
        textAlign:"center"
    },
    informationMiddleRowText: {
        fontSize:24,
        textAlign:"center"
    },
    informationMiddleRowNumber: {
        fontSize:24,
        textAlign:"center"
    },

})