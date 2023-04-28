import {Flex, HStack, IconButton, Pressable, Text} from "@react-native-material/core";
import * as React from "react";
import {useContext, useEffect} from "react";
import MealHistoryContext from "../mealHistoryContext";
import {BASE_URL} from "@env";
import axios from "axios";
import NavigatorContext, {Page} from "../../navigator/NavigatorProvider";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {DayPeriodResponse} from "../types/Meal";
import {NormalizeDate} from "./CreateMealHistory";
import {getOneFoodCalorie} from "../../food/foodCalculations";
import PageHistoryContext from "../../pageHistory/PageHistoryProvider";
import {ImageBackground, StyleSheet} from "react-native";
const getDayHistoriesByMealPeriodAndDate= BASE_URL + 'api/meal-history?date='
const deleteMealHistoryAPI = BASE_URL + 'api/meal-history/'



function ShowMealHistory() {
    const {mealHistory, mealPeriod, dayHistories, date, setDayHistories, setCurrentPlaceOfDayPeriodResponse, deleteDayHistory} = useContext(MealHistoryContext)
    const {changePage} = useContext(NavigatorContext)
    const {deleteLastPage, addPage, pageHistory} = useContext(PageHistoryContext)

    const deleteFood = (id: number) => {
        console.log(id)
        console.log(deleteMealHistoryAPI + '1')
        deleteDayHistory(id)
        axios.delete(deleteMealHistoryAPI + id)
            .then(function (response) {
                console.log('Delete was successful')
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error)
            })

    }

    useEffect( function ()  {
        console.log('NORMALIZED DATE')
        console.log(NormalizeDate(date))

        const url: string = getDayHistoriesByMealPeriodAndDate + NormalizeDate(date) + '&periodName=' + mealPeriod
        axios.get(url)
            .then(async function (response) {
                console.log('RESPONSE')
                console.log(response.data as DayPeriodResponse[])
                await setDayHistories(response.data as DayPeriodResponse[])
            })
            .catch(function (error) {
                console.log(error)
            })
        console.log('PAge History CreateMealHistory')
        console.log(pageHistory)

    }, [])
    useEffect(() => {
        console.log('SET-DAY-Histories')
        console.log(mealHistory.dayHistory)
        setDayHistories(mealHistory.dayHistory!)
    }, [mealHistory])

    return(
        <ImageBackground source={ require('../../../assets/background/abstract.png')} style={{flex: 1, alignItems: 'center'}} imageStyle={{flex: 1}}>

        <Flex fill style={{width: '90%'}}>
            <Text style={showMealHistoryStyles.title}>{mealPeriod?.toUpperCase()}</Text>
            <IconButton onPress={() => {
                changePage(Page.HOME)
                deleteLastPage()
            }}
                        icon={<MaterialCommunityIcons name={'arrow-left-bold-outline'} size={30} color={'#ae7bfc'} />} style={{marginLeft:5}}/>
            {dayHistories.length === 0?
                <Text style={{color: '#FFF', alignSelf: 'center'}}>There are no foods</Text>:
            dayHistories.map((currentDayPeriodResponse, index) => {
                console.log(currentDayPeriodResponse.mealHistoryId)
                    return ( <Pressable style={showMealHistoryStyles.pressable}
                                        key={currentDayPeriodResponse.mealHistoryId}
                                        onPress={() => {
                                                                  setCurrentPlaceOfDayPeriodResponse(index)
                                                                  changePage(Page.SHOWFODDETAILS)
                                                                  addPage(Page.SHOWFODDETAILS)
                                                              }}
                            >
                            <HStack style={{}}>
                                <HStack style={{alignItems: 'center', width: '80%', justifyContent: 'space-between'}}>
                                    <Text style={{marginLeft: 10, textAlign: 'center', color: '#FFF'}}>{currentDayPeriodResponse.meal.food.name}</Text>
                                    <Text style={{color: '#FFF'}}>{getOneFoodCalorie(currentDayPeriodResponse.meal.food.perUnit, currentDayPeriodResponse.meal.food.kcal, currentDayPeriodResponse.meal.amount).toFixed(2).toString()} kcal</Text>
                                </HStack>
                                <IconButton icon={<MaterialCommunityIcons name={'delete-forever'} size={30} color={'#8b20d3'}/>}
                                            style={{width: '15%', marginLeft: '3%'}}
                                            onPress={() => deleteFood(currentDayPeriodResponse.mealHistoryId)}

                                />
                            </HStack>
                        </Pressable>
            )}) }
        </Flex>
        </ImageBackground>
    )
}
export default ShowMealHistory

const showMealHistoryStyles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontFamily: 'serif',
        marginTop: 80,
        fontSize: 50,
        color: '#FFF'
    },
    pressable: {
        width: '100%',
        height: '5%',
        backgroundColor: '#9a86ea',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#cab6ff',
        justifyContent: "center",
        marginBottom: 7,
    },
    hStack: {
        width: '80%',
        justifyContent: 'space-between'
    },
})
