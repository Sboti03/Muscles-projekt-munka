import * as React from "react";
import {useContext, useEffect} from "react";
import {Calendar} from "react-native-calendars";
import NavigatorContext, {Page} from "../navigator/NavigatorProvider";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Flex, IconButton, Text} from "@react-native-material/core";
import MealHistoryContext from "../mealHistory/mealHistoryContext";
import {LinearGradient} from "expo-linear-gradient";
import {Alert, BackHandler, StyleSheet, TouchableOpacity} from "react-native";
import PageHistoryContext from "../PageHistory/PageHistoryProvider";

export default function CalendarPage() {
    const {changePage} = useContext(NavigatorContext)
    const {date, setDate} = useContext(MealHistoryContext)
    const {deleteLastPage} = useContext(PageHistoryContext)
    // useEffect(() => {
    //     const backAction = () => {
    //         Alert.alert('Hold on!', 'Are you sure you want to go back?', [
    //             {
    //                 text: 'Cancel',
    //                 onPress: () => null,
    //                 style: 'cancel',
    //             },
    //             {text: 'YES', onPress: () => changePage(Page.HOME)},
    //         ]);
    //         return true;
    //     };
    //     const back = () => {
    //         changePage(Page.HOME)
    //         return true
    //     }
    //     const backHandler = BackHandler.addEventListener(
    //         'hardwareBackPress',
    //         back,
    //     );
    //
    //     return () => backHandler.remove();
    // })
    return (
        <LinearGradient  colors={['#efe8fd', '#865eff']}
                         style={{width: '100%', flex: 1, alignItems: "center"}}>
            <Flex fill style={{justifyContent: 'center'}}>
            <IconButton onPress={() => {
                changePage(Page.HOME)
                deleteLastPage()
            }}
                        icon={<MaterialCommunityIcons name={'arrow-left-bold-outline'} size={30} color={'#7a44cf'} />}
                        style={{marginLeft:5, marginTop: 30}}/>
            <Calendar firstDay={1}
                      initialDate={date.toISOString()}
                      hideExtraDays={true}
                      renderArrow={(direction) => {
                          if (direction === 'left') {
                              return <MaterialCommunityIcons name={'arrow-left-bold-outline'} size={30}
                                                             color={'#c8b2ff'}/>
                          }
                          if (direction === 'right') {
                              return <MaterialCommunityIcons name={'arrow-right-bold-outline'} size={30} color={'#c8b2ff'}/>
                          }
                      }}
                      style={{
                          height: 460,
                          borderColor: '#6422d0',
                          borderWidth: 4,
                          marginTop: 40,
                          width: 350,
                          borderRadius: 30,
                          elevation: 10,
                      }}
                      dayComponent={({date, state}) => {
                          return (
                              <TouchableOpacity onPress={() => {
                                  console.log(date?.dateString)
                                  setDate(new Date(date?.dateString!))
                                  changePage(Page.HOME)
                                  deleteLastPage()
                              }}
                                                style={{backgroundColor: '#c8b2ff', width: 47, height: 47, justifyContent: 'center', alignItems: 'center', borderRadius: 47}}>
                                <Text>{date?.day}</Text>
                              </TouchableOpacity>
                          )
                      }}
                      theme={{
                          calendarBackground: '#28117e',
                          todayTextColor: '#7a44cf',
                          textDayFontSize: 20,
                      }}
                      enableSwipeMonths={true}
            />
            </Flex>
        </LinearGradient>
    )
}

const calendar = StyleSheet.create({
    dayContainer: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#d360f3'
    }
})