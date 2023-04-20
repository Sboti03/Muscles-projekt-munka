import * as React from 'react';
import {useContext, useEffect, useRef, useState} from 'react';
import {Box, Chip, Flex, HStack, IconButton, Text, VStack} from "@react-native-material/core";
import NavigatorContext, {Page} from "../navigator/NavigatorProvider";
import {BASE_URL} from "@env"
import axios from "axios";
import {
    DrawerLayoutAndroid, ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableWithoutFeedback
} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as Progress from 'react-native-progress';
import SideBarContent from "../sidebar/SideBarContent";
import MealHistoryContext from "../mealHistory/mealHistoryContext";
import ProfileContext, {ProfileResponse} from "../profile/ProfileProvider";
import MealPeriods from "../mealPeriods/MealPeriods";
import {calculateDayInfoData} from "../food/foodCalculations";
import {DayInfoData} from "../mealHistory/types/mealHistoryInterface";
import { LinearGradient } from 'expo-linear-gradient';
import Weight from "./Weight";
import PageHistoryContext from "../pageHistory/PageHistoryProvider";

const getProfileAPI = BASE_URL + 'api/profile'
const getMealHistoryData = BASE_URL + 'api/meal-history/data/?date='

function HomePage(){

    const {changePage} = useContext(NavigatorContext)
    const {profile, updateProfile} = useContext(ProfileContext)
    const {date, setDate, setMealHistory, mealHistory} = useContext(MealHistoryContext)
    const {addPage, pageHistory} = useContext(PageHistoryContext)

    const drawer = useRef<DrawerLayoutAndroid>(null);
    const [foodCalculations, setFoodCalculations] = useState<DayInfoData>()
    const oneDay = 24*60*60*1000; //one day in milliseconds in order to get the day and setDate()

    useEffect(() => {
        console.log('Változott a MealHistory')
        if (mealHistory) {
            setFoodCalculations(calculateDayInfoData(mealHistory))

        }
    }, [mealHistory])
    useEffect( () => {
        const todayDateAPI = getMealHistoryData + date.toISOString()
        console.log(todayDateAPI)
        axios.get(todayDateAPI)
            .then(function (response) {
                const thisResponse = response.data
                setMealHistory(response.data)
                console.log(thisResponse)
                console.log('MEAL-HISTORY')
                console.log(mealHistory)
            })
            .catch(function (error) {
                console.log(error)
            })
        if (profile?.birthDay?.getDate() === new Date().getDate()) {
            axios.get(getProfileAPI)
                .then(function (response) {
                    console.log('PROFILE RESPONSE DATA:')
                    console.log(response.data)
                    let profileResponse = response.data as ProfileResponse
                    updateProfile({...profileResponse, birthDay: new Date(profileResponse.birthDay!)})
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        console.log('Page History Main page')
        console.log(pageHistory)

    }, [])
    useEffect(() => {
        console.log('Változott a date')
        const todayDateAPI = getMealHistoryData + date.toISOString()
        console.log(todayDateAPI)
        axios.get(todayDateAPI)
            .then(function (response) {
                const thisResponse = response.data
                setMealHistory(response.data)
                console.log(thisResponse)
                console.log('MEAL-HISTORY')
                console.log(mealHistory)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [date])

   return(
       <DrawerLayoutAndroid renderNavigationView={() => {
           return <SideBarContent/>
       }}
                            ref={drawer}
                            drawerWidth={300}
                            drawerPosition={'left'}
       >
           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <Flex fill={1} style={{width:'100%'}} >
              <ImageBackground source={ require('../../assets/background/abstract.png')} style={{flex: 1}} imageStyle={{flex: 1}}>

              <HStack style={homePageStyle.menuOnTop}>
                  <IconButton icon={<MaterialCommunityIcons name="menu" size={45} color='#7a44cf' />}
                              style={{marginLeft:5}}
                              onPress={() => {
                                  drawer.current?.openDrawer()
                              }}
                  />
                  <HStack spacing={5}>
                      <Chip label={new Date(date?.getTime()! - oneDay).getDate().toString()} style={homePageStyle.sideChips} labelStyle={homePageStyle.text}
                            onPress={() => {
                                setDate(new Date(date?.getTime()! - oneDay))
                            }}/>
                      <Chip label={'Today'} style={homePageStyle.middleChip} labelStyle={homePageStyle.text}
                            onPress={() => setDate(new Date())}
                      />
                      <Chip label={new Date(date?.getTime()! + oneDay).getDate().toString() + '.'} style={homePageStyle.sideChips} labelStyle={homePageStyle.text}
                            onPress={() => {
                                setDate(new Date(date?.getTime()! + oneDay))
                      }}/>
                  </HStack>
                  <IconButton icon={<MaterialCommunityIcons name="calendar-search" size={40} color="#7a44cf"/>}
                              style={{marginRight:5}}
                              onPress={() => {
                                  changePage(Page.CALENDAR)
                                  addPage(Page.CALENDAR)
                              }}
                  />
              </HStack>

              <Box style={homePageStyle.informationBox}>
                  <VStack>
                      <HStack style={Object.assign({}, homePageStyle.informationRow, homePageStyle.informationUpperRow)}>
                          <MaterialCommunityIcons name={'alpha-m-circle-outline'} size={46} color={'#cbb9ff'} style={{marginRight: 20, marginTop: 3}}/>
                          {/*<Box style={{width: 30, height:30, backgroundColor:'white', borderRadius: 10,}}></Box>*/}
                      </HStack>
                      <HStack style={Object.assign({}, homePageStyle.informationRow, homePageStyle.informationMiddleRow)}>
                          <VStack>
                              <Text style={Object.assign({}, homePageStyle.text, homePageStyle.informationMiddleRowNumber)}>{foodCalculations?.eaten}</Text>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationMiddleRowText)}>Eaten</Text>
                          </VStack>
                          <VStack>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationMiddleRowNumber)}>{foodCalculations?.left}</Text>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationMiddleRowText)}>Remaining</Text>
                          </VStack>
                          <Box style={{width: '10%'}}></Box>
                      </HStack>
                      <HStack style={Object.assign({}, homePageStyle.informationRow, homePageStyle.informationLowerRow)}>
                          <VStack style={{justifyContent: "center", alignItems:'center'}}>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowText)}>Carbohydrates</Text>
                              <Progress.Bar progress={foodCalculations?.progressCarbohydrate} width={90} height={3} color={'#FFF'} borderWidth={0} unfilledColor={'#8a66cc'}/>
                              <HStack>
                                  <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>{foodCalculations?.eatenCarbohydrate}</Text>
                                  <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>/</Text>
                                  <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>{foodCalculations?.totalCarbohydrate}</Text>
                              </HStack>
                          </VStack>
                          <VStack style={{justifyContent: "center", alignItems:'center'}}>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowText)}>Protein</Text>
                              <Progress.Bar progress={foodCalculations?.progressProtein} width={90} height={3} color={'#FFF'} borderWidth={0} unfilledColor={'#8a66cc'}/>
                              <HStack>
                                  <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>{foodCalculations?.eatenProtein}</Text>
                                  <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>/</Text>
                                  <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>{foodCalculations?.totalProtein}</Text>
                              </HStack>
                          </VStack>
                          <VStack style={{justifyContent: "center", alignItems:'center'}}>
                              <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowText)}>Fat</Text>
                              <Progress.Bar progress={foodCalculations?.progressFat} width={90} height={3} color={'#FFF'} borderWidth={0} unfilledColor={'#8a66cc'}/>
                              <HStack>
                                  <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>{foodCalculations?.eatenFat}</Text>
                                  <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>/</Text>
                                  <Text style={Object.assign({}, homePageStyle.text,homePageStyle.informationLowerRowNumbers)}>{foodCalculations?.totalFat}</Text>
                              </HStack>
                          </VStack>
                      </HStack>
                  </VStack>
              </Box>
              <MealPeriods />
              <Text style={{marginTop: '13%', textAlign: 'center', color: '#bedbff'}}>Daily weight</Text>
              <KeyboardAvoidingView behavior={"position"} >
              <Weight/>
              </KeyboardAvoidingView>
              </ImageBackground>
          </Flex>

           </TouchableWithoutFeedback>
       </DrawerLayoutAndroid>
   )
}
export default HomePage;

export const homePageStyle = StyleSheet.create({
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
        marginTop: '17%',
        borderRadius: 10,
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