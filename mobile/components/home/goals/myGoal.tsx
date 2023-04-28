import {Button, Flex, HStack, Text, TextInput, VStack} from "@react-native-material/core";
import React, {useContext, useEffect, useState} from "react";
import MealHistoryContext from "../../mealHistory/mealHistoryContext";
import GoalInterface from "../../mealHistory/types/goalInterface";
import GoalWarnings from "./warnings";
import {BASE_URL} from "@env";
import axios from "axios";
import BasicGoal from "./basicGoal";
import NavigatorContext, {Page} from "../../navigator/NavigatorProvider";
import PageHistoryContext from "../../pageHistory/PageHistoryProvider";
import {ImageBackground, StyleSheet} from "react-native";

export const goalAPI = BASE_URL + 'api/goals'

export default function MyGoal() {
    const {mealHistory} = useContext(MealHistoryContext)
    const {changePage} = useContext(NavigatorContext)
    const {deleteLastPage, pageHistory} = useContext(PageHistoryContext)
    const [currentGoal, setCurrentGoal] = useState<GoalInterface>(mealHistory.goal)
    const [warnings, setWarnings] = useState<GoalWarnings>({calorieWarning: '', proteinWarning: '',carbohydrateWarning: '', fatWarning: ''})

    useEffect(() => {
        console.log(pageHistory)
        console.log(currentGoal)
    }, [])

    function submit() {
        const warning = warnings.carbohydrateWarning + warnings.proteinWarning+ warnings.calorieWarning+ warnings.fatWarning
        if (warning === '') {
            const data: BasicGoal = {targetCalories: currentGoal.targetCalories, carbohydratesPerDay: currentGoal.carbohydratesPerDay, fatPerDay: currentGoal.fatPerDay, proteinPerDay: currentGoal.proteinPerDay, breakfastPerDay: currentGoal.breakfastPerDay, otherPerDay: currentGoal.otherPerDay, dinnerPerDay: currentGoal.dinnerPerDay, lunchPerDay: currentGoal.lunchPerDay, targetWeight: currentGoal.targetWeight}
            console.log('BASIC GOAL')
            console.log(data)
            axios.patch(goalAPI, data)
                .then(function (response) {
                    console.log('GOAL UPDATE')
                    console.log(response.data)
                    //TODO: if mainpage doesnt refresh then setMealHistory
            })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

    return(
        <ImageBackground source={ require('../../../assets/background/gears.png')} style={{flex: 1}} imageStyle={{flex: 1}}>

        <Flex fill>
                <Text style={myGoalStyles.title}>
                    My Goal
                </Text>
                <VStack style={myGoalStyles.container} spacing={1}>
                    <Text style={myGoalStyles.text}>Calories</Text>
                    <TextInput value={currentGoal.targetCalories.toString()}
                               style={myGoalStyles.inputBox}
                               inputStyle={myGoalStyles.input}
                               inputContainerStyle={myGoalStyles.inputContainer}
                               placeholderTextColor={'#ebd8fc'}
                               inputMode={"numeric"}
                               onChangeText={(text) => {
                                   if (typeof Number(text) === 'number' && Number(text) === Number(text)){
                                       setCurrentGoal({...currentGoal!, targetCalories: Number(text)})
                                       setWarnings({...warnings, calorieWarning: ''})
                                   }else {
                                       setWarnings({...warnings, calorieWarning: 'Cannot be empty or non-numeric characters'})
                                   }
                               }}
                    />
                    <Text style={myGoalStyles.warningText}>{warnings.calorieWarning}</Text>
                    <Text style={myGoalStyles.text}>Protein (g)</Text>
                    <TextInput value={currentGoal.proteinPerDay.toString()}
                               inputMode={"numeric"}
                               style={myGoalStyles.inputBox}
                               inputStyle={myGoalStyles.input}
                               inputContainerStyle={myGoalStyles.inputContainer}
                               placeholderTextColor={'#ebd8fc'}
                               onChangeText={(text) => {
                                   console.log(text)
                                   if (typeof Number(text) === 'number' && Number(text) === Number(text)){
                                       setCurrentGoal({...currentGoal!, proteinPerDay: Number(text)})
                                       setWarnings({...warnings, proteinWarning: ''})
                                   }else {
                                       setWarnings({...warnings, proteinWarning: 'Cannot be empty or non-numeric characters'})
                                   }
                               }}
                    />
                    <Text style={myGoalStyles.warningText}>{warnings.proteinWarning}</Text>
                    <Text style={myGoalStyles.text}>Carbohydrates (g)</Text>
                    <TextInput value={currentGoal.carbohydratesPerDay.toString()}
                               inputMode={"numeric"}
                               style={myGoalStyles.inputBox}
                               inputStyle={myGoalStyles.input}
                               inputContainerStyle={myGoalStyles.inputContainer}
                               placeholderTextColor={'#ebd8fc'}
                               onChangeText={(text) => {
                                   if (typeof Number(text) === 'number' && Number(text) === Number(text)){
                                       setCurrentGoal({...currentGoal!, carbohydratesPerDay: Number(text)})
                                       setWarnings({...warnings, carbohydrateWarning: ''})
                                   }else {
                                       setWarnings({...warnings, carbohydrateWarning: 'Cannot be empty or non-numeric characters'})
                                   }
                               }}
                    />
                    <Text style={myGoalStyles.warningText}>{warnings.carbohydrateWarning}</Text>
                    <Text style={myGoalStyles.text}>Fat (g)</Text>
                    <TextInput value={currentGoal.fatPerDay.toString()}
                               inputMode={"numeric"}
                               style={myGoalStyles.inputBox}
                               inputStyle={myGoalStyles.input}
                               inputContainerStyle={myGoalStyles.inputContainer}
                               placeholderTextColor={'#ebd8fc'}
                               onChangeText={(text) => {
                                   if (typeof Number(text) === 'number' && Number(text) === Number(text)){
                                       setCurrentGoal({...currentGoal!, fatPerDay: Number(text)})
                                       setWarnings({...warnings, fatWarning: ''})
                                   }else {
                                       setWarnings({...warnings, fatWarning: 'Cannot be empty or non-numeric characters'})
                                   }
                               }}
                    />
                    <Text style={myGoalStyles.warningText}>{warnings.fatWarning}</Text>
                    <HStack style={myGoalStyles.hStackWithButtons}>
                        <Button title={'Submit'}
                                style={myGoalStyles.submitButton}
                                onPress={() => {
                                    submit()
                                }}
                        />
                        <Button title={'Back'}
                                style={myGoalStyles.cancelButton}
                                onPress={() => {
                                    changePage(Page.HOME)
                                    deleteLastPage()
                                }}
                        />
                    </HStack>
                </VStack>
            </Flex>
        </ImageBackground>
    )
}
const myGoalStyles = StyleSheet.create({
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
        borderWidth: 1,
        borderColor: '#ccc8ff',
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
        marginLeft: 15,
        marginBottom: 10,
        color: '#ffffff',
        fontSize: 18,
    },
    warningText: {
        fontSize: 12,
        color: '#5d5d5d',
        marginLeft: 7,
    },
    submitButton: {
        width: '60%',
        backgroundColor: '#7a44cf'
    },
    cancelButton: {
        width: '35%',
        backgroundColor: '#9573cc'
    },
    hStackWithButtons: {
        alignSelf: "center",
        marginTop: 20,
        justifyContent: 'space-between',
        width: '100%'
    }
})
