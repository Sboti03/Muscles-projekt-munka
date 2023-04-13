import {Box, HStack, IconButton, Pressable, Spacer, Text, VStack} from "@react-native-material/core";
import MyIcon from "../icons/myIcon";
import {useContext, useEffect, useState} from "react";
import MealHistoryContext from "../mealHistory/mealHistoryContext";
import {PeriodNamesEnum} from "../mealHistory/types/dayHistoryInterface";
import NavigatorContext, {Page} from "../navigator/NavigatorProvider";
import {getConsumedCaloriesByMealPeriod} from "../food/foodCalculations";
import {StyleSheet} from "react-native";
import PageHistoryContext from "../pageHistory/PageHistoryProvider";

function MealPeriods() {

    const {setMealPeriod, getMealPeriodCaloriesBySumCalories, mealHistory,setDayHistories, date} = useContext(MealHistoryContext)
    const {changePage} = useContext(NavigatorContext)
    const {addPage, deleteLastPage} = useContext(PageHistoryContext)

    const [breakfastConsumed, setBreakfastConsumed] = useState<number>()
    const [lunchConsumed, setLunchConsumed] = useState<number>()
    const [dinnerConsumed, setDinnerConsumed] = useState<number>()
    const [otherConsumed, setOtherConsumed] = useState<number>()
    useEffect(()=> {
        getConsumedCaloriesByMealPeriod(PeriodNamesEnum.BREAKFAST, date).then(r => setBreakfastConsumed(r))
        getConsumedCaloriesByMealPeriod(PeriodNamesEnum.LUNCH, date).then(r => setLunchConsumed(r))
        getConsumedCaloriesByMealPeriod(PeriodNamesEnum.DINNER, date).then(r => setDinnerConsumed(r))
        getConsumedCaloriesByMealPeriod(PeriodNamesEnum.OTHER, date).then(r => setOtherConsumed(r))
    }, [mealHistory])
    return (
        <Box style={mealPeriodsStyle.listItems}>
            <VStack>
                <Box style={mealPeriodsStyle.onePeriod}>
                    <Pressable pressEffect={"android-ripple"}
                               style={mealPeriodsStyle.onePeriod}
                               onPress={() => {
                                   setMealPeriod(PeriodNamesEnum.BREAKFAST)
                                   changePage(Page.SHOWMEALHISTORY)
                                   addPage(Page.SHOWMEALHISTORY)
                               }}
                    >
                        <HStack>
                            <VStack >
                                <Text>Breakfast</Text>
                                <HStack>
                                    <Text>{breakfastConsumed}</Text>
                                    <Text> / </Text>
                                    <Text>{getMealPeriodCaloriesBySumCalories(mealHistory?.goal.breakfastPerDay!, mealHistory?.goal.targetCalories!).toString()}</Text>
                                </HStack>
                            </VStack>
                            <Spacer/>
                            <IconButton icon={<MyIcon name={'plus-circle-outline'} size={34} />}
                                        onPress={() => {
                                            setMealPeriod(PeriodNamesEnum.BREAKFAST)
                                            changePage(Page.CREATEMEALHISTORY)
                                            addPage(Page.CREATEMEALHISTORY)
                                        }}
                            />
                        </HStack>
                    </Pressable>
                </Box>
                <Box style={mealPeriodsStyle.onePeriod}>
                    <Pressable pressEffect={"android-ripple"}
                               style={mealPeriodsStyle.onePeriod}
                               onPress={() => {
                                   setMealPeriod(PeriodNamesEnum.LUNCH)
                                   changePage(Page.SHOWMEALHISTORY)
                                   addPage(Page.SHOWMEALHISTORY)
                               }}
                    >
                        <HStack>
                            <VStack >
                                <Text>Lunch</Text>
                                <HStack>
                                    <Text>{lunchConsumed}</Text>
                                    <Text> / </Text>
                                    <Text>{getMealPeriodCaloriesBySumCalories(mealHistory?.goal.lunchPerDay!, mealHistory?.goal.targetCalories!).toString()}</Text>
                                </HStack>
                            </VStack>
                            <Spacer/>
                            <IconButton icon={<MyIcon name={'plus-circle-outline'} size={34} />}
                                        onPress={() => {
                                            setMealPeriod(PeriodNamesEnum.LUNCH)
                                            changePage(Page.CREATEMEALHISTORY)
                                            addPage(Page.CREATEMEALHISTORY)
                                        }}
                            />
                        </HStack>
                    </Pressable>
                </Box>
                <Box style={mealPeriodsStyle.onePeriod}>
                    <Pressable pressEffect={"android-ripple"}
                               style={mealPeriodsStyle.onePeriod}
                               onPress={() => {
                                   setMealPeriod(PeriodNamesEnum.DINNER)
                                   changePage(Page.SHOWMEALHISTORY)
                                   addPage(Page.SHOWMEALHISTORY)
                               }}
                    >
                        <HStack>
                            <VStack >
                                <Text>Dinner</Text>
                                <HStack>
                                    <Text>{dinnerConsumed}</Text>
                                    <Text> / </Text>
                                    <Text>{getMealPeriodCaloriesBySumCalories(mealHistory?.goal.dinnerPerDay!, mealHistory?.goal.targetCalories!).toString()}</Text>
                                </HStack>
                            </VStack>
                            <Spacer/>
                            <IconButton icon={<MyIcon name={'plus-circle-outline'} size={34} />}
                                        onPress={() => {
                                            setMealPeriod(PeriodNamesEnum.DINNER)
                                            changePage(Page.CREATEMEALHISTORY)
                                            addPage(Page.CREATEMEALHISTORY)
                                        }}
                            />
                        </HStack>
                    </Pressable>
                </Box>
                <Box style={mealPeriodsStyle.onePeriod}>
                    <Pressable pressEffect={"android-ripple"}
                               style={mealPeriodsStyle.onePeriod}
                               onPress={() => {
                                   setMealPeriod(PeriodNamesEnum.OTHER)
                                   changePage(Page.SHOWMEALHISTORY)
                                   addPage(Page.SHOWMEALHISTORY)
                               }}
                    >
                        <HStack>
                            <VStack >
                                <Text>Other</Text>
                                <HStack>
                                    <Text>{otherConsumed}</Text>
                                    <Text> / </Text>
                                    <Text>{getMealPeriodCaloriesBySumCalories(mealHistory?.goal.otherPerDay!, mealHistory?.goal.targetCalories!).toString()}</Text>
                                </HStack>
                            </VStack>
                            <Spacer/>
                            <IconButton icon={<MyIcon name={'plus-circle-outline'} size={34} />}
                                        onPress={() => {
                                            setMealPeriod(PeriodNamesEnum.OTHER)
                                            changePage(Page.CREATEMEALHISTORY)
                                            addPage(Page.CREATEMEALHISTORY)
                                        }}
                            />
                        </HStack>
                    </Pressable>
                </Box>
            </VStack>
        </Box>
    )
}

export default MealPeriods;

const mealPeriodsStyle = StyleSheet.create({
    onePeriod: {
        justifyContent: "center",
        backgroundColor: '#a893ef',
        borderRadius: 10,
        width: '100%',
        height: 60,
        paddingRight: 5,
        paddingLeft: 8,
        marginTop: 5,
        marginBottom: 5,
    },
    listItems: {
        width: '85%',
        alignSelf: "center",
        marginTop: '20%',
        borderRadius: 10,
    },

})

