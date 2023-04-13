import {Button, Flex, HStack, IconButton, Text, TextInput, VStack} from "@react-native-material/core";
import {DayPeriodResponse} from "../mealHistory/types/Meal";
import NavigatorContext, {Page} from "../navigator/NavigatorProvider";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {KeyboardAvoidingView, StyleSheet} from "react-native";
import {getOneFoodInfo} from "./foodCalculations";
import FoodInterface from "./foodInterface";
import {BASE_URL} from "@env";
import axios from "axios";
import PageHistoryContext from "../pageHistory/PageHistoryProvider";

const submitFoodAPI = BASE_URL + 'api/meal-history/update/'

export default function ShowOneFood(props: { DayPeriodResponse: DayPeriodResponse }) {

    const {changePage} = useContext(NavigatorContext)
    const {deleteLastPage} = useContext(PageHistoryContext)

    const [currentAmount, setCurrentAmount] = useState<string>()
    const [oneFoodData, setOneFoodData] = useState<FoodInterface>()

    const submitFood = () => {
        axios.patch(submitFoodAPI + props.DayPeriodResponse.mealHistoryId, {amount: currentAmount, isCompleted: props.DayPeriodResponse.meal.completed})
            .then(function (response) {
                console.log(response.data)
                changePage(Page.SHOWMEALHISTORY)
                deleteLastPage()
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    useEffect(() => {
        setCurrentAmount(props.DayPeriodResponse.meal.amount.toFixed(1))
    }, [])
    useEffect(() => {
        setOneFoodData(getOneFoodInfo(props.DayPeriodResponse, Number(currentAmount)))
    }, [currentAmount])
    return (
        <LinearGradient  colors={['#efe8fd', '#865eff']}
                         style={{width: '100%', flex: 1, alignItems: "center"}}>
        <Flex fill style={{ width: '90%'}}>
            <IconButton onPress={() => {
                changePage(Page.SHOWMEALHISTORY)
                deleteLastPage()
            }}
                        icon={<MaterialCommunityIcons name={'arrow-left-bold-outline'} size={30} color={'#7a44cf'} />}
                        style={{marginLeft:5, marginTop: 30}}/>
            <Text style={oneFoodStyle.title}>{props.DayPeriodResponse.meal.food.name}</Text>
            <HStack style={oneFoodStyle.basicHStack}>
                <VStack><Text style={oneFoodStyle.text}>Amount (g)</Text><Text style={oneFoodStyle.text}>{currentAmount}</Text></VStack>
                <VStack><Text style={oneFoodStyle.text}>Calories</Text><Text style={oneFoodStyle.text}>{oneFoodData?.kcal}</Text></VStack>
                <VStack><Text style={oneFoodStyle.text}>Protein</Text><Text style={oneFoodStyle.text}>{oneFoodData?.protein}</Text></VStack>
                <VStack><Text style={oneFoodStyle.text}>Carbohydrate</Text><Text style={oneFoodStyle.text}>{oneFoodData?.carbohydrate}</Text></VStack>
            </HStack>
            <KeyboardAvoidingView behavior={"height"} style={oneFoodStyle.bottom}>
                <HStack style={{marginBottom: 10,}}>
                    <TextInput value={currentAmount}
                               inputMode={"numeric"}
                               onChangeText={(text) => {
                                   setCurrentAmount(text)
                               }}
                               inputContainerStyle={oneFoodStyle.inputContainer}
                               inputStyle={oneFoodStyle.inputStyle}
                               style={oneFoodStyle.input}
                    />
                    <Button title={'Submit'}
                            style={oneFoodStyle.button}
                            onPress={()=> {
                                submitFood()
                            }}
                    />
                </HStack>
            </KeyboardAvoidingView>
        </Flex>
            </LinearGradient>
    )
}
const oneFoodStyle = StyleSheet.create({
    title: {
        textAlign: "center",
        fontFamily: 'serif',
        marginTop: 40,
        fontSize: 50,
        color: '#FFF',
        borderColor: '#d7c1ff',
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: '#b68bff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    basicHStack : {
        width: '100%',
        justifyContent: "space-between",
        marginTop: 40
    },
    text: {
        textAlign: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: "flex-end",
    },
    button: {
        height: 50,
        width: '30%',
        textAlign: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: '#de9cff'
    },
    input: {
        height: 60,
        width: '70%',
    },
    inputStyle: {
        borderStyle: "solid",
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
        paddingLeft: 15
    },
    inputContainer: {
        backgroundColor: 'transparent'
    }
})