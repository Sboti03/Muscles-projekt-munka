import {Button, Flex, HStack, IconButton, Spacer, Text, TextInput, VStack} from "@react-native-material/core";
import {DayPeriodResponse} from "../mealHistory/types/Meal";
import NavigatorContext, {Page} from "../navigator/NavigatorProvider";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {ImageBackground, KeyboardAvoidingView, StyleSheet} from "react-native";
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
        <ImageBackground source={ require('../../assets/background/abstract.png')} style={{flex: 1, alignItems: 'center'}} imageStyle={{flex: 1}}>

        <Flex fill style={{ width: '90%'}}>
            <IconButton onPress={() => {
                changePage(Page.SHOWMEALHISTORY)
                deleteLastPage()
            }}
                        icon={<MaterialCommunityIcons name={'arrow-left-bold-outline'} size={30} color={'#b144cf'} />}
                        style={{marginLeft:5, marginTop: 30}}/>
            <Text style={oneFoodStyle.title}>{props.DayPeriodResponse.meal.food.name}</Text>
            <VStack style={oneFoodStyle.basicVStack}>
                <HStack style={oneFoodStyle.basicHStack}>
                    <VStack ><Text style={oneFoodStyle.text}>Amount (g)</Text><Spacer maxH={15}/><Text style={oneFoodStyle.text}>{currentAmount}</Text></VStack>
                    <VStack ><Text style={oneFoodStyle.text}>Calories</Text><Spacer maxH={15}/><Text style={oneFoodStyle.text}>{oneFoodData?.kcal}</Text></VStack>
                    <VStack ><Text style={oneFoodStyle.text}>Protein</Text><Spacer maxH={15}/><Text style={oneFoodStyle.text}>{oneFoodData?.protein}</Text></VStack>
                    <VStack ><Text style={oneFoodStyle.text}>Carbohydrate</Text><Spacer maxH={15}/><Text style={oneFoodStyle.text}>{oneFoodData?.carbohydrate}</Text></VStack>
                </HStack>
                <VStack style={{justifyContent: 'space-between', flex: 1}}>
                    <HStack style={oneFoodStyle.otherHStack}>
                        <Text style={oneFoodStyle.otherText}>Sugar</Text>
                        <Text style={oneFoodStyle.otherText}>{oneFoodData?.sugar}</Text>
                    </HStack>
                    <HStack style={oneFoodStyle.otherHStack}>
                        <Text style={oneFoodStyle.otherText}>Fiber</Text>
                        <Text style={oneFoodStyle.otherText}>{oneFoodData?.fiber}</Text>
                    </HStack>
                    <HStack style={oneFoodStyle.otherHStack}>
                        <Text style={oneFoodStyle.otherText}>Saturated fat</Text>
                        <Text style={oneFoodStyle.otherText}>{oneFoodData?.saturatedFat}</Text>
                    </HStack>
                    <HStack style={oneFoodStyle.otherHStack}>
                        <Text style={oneFoodStyle.otherText}>Monounsaturated fat</Text>
                        <Text style={oneFoodStyle.otherText}>{oneFoodData?.monounsaturatedFat}</Text>
                    </HStack>
                    <HStack style={oneFoodStyle.otherHStack}>
                        <Text style={oneFoodStyle.otherText}>Polyunsaturated fat</Text>
                        <Text style={oneFoodStyle.otherText}>{oneFoodData?.polyunsaturatedFat}</Text>
                    </HStack>
                </VStack>
            </VStack>
            <KeyboardAvoidingView behavior={"position"} >
                <HStack style={{marginTop: '4%', height: 70, alignSelf: 'flex-end'}}>
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
        </ImageBackground>
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
        backgroundColor: '#9f34d2',
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
        padding: 4,
        width: '100%',
        justifyContent: "space-between",
        backgroundColor: '#a656ce',
        borderRadius: 30,
        height: '10%',
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: '#c98ade'
    },
    basicVStack: {
        width: '100%',
        height: '60%',
        backgroundColor: '#a656ce',
        borderRadius: 15,
        marginTop: 40,

    },
    text: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 13
    },
    otherText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 18
    },
    bottom: {
        marginBottom: '2%',
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
        color: '#FFF'

    },
    inputStyle: {
        borderStyle: "solid",
        borderColor: '#d176ff',
        borderWidth: 3,
        borderRadius: 10,
        paddingLeft: 15,
        color: '#FFF',
        backgroundColor: '#c467d9'
    },
    inputContainer: {
        backgroundColor: 'transparent',
        color: '#FFF'

    },
    otherHStack: {
        justifyContent: 'space-between',
        paddingRight: '10%',
        paddingLeft: '5%',
        paddingTop: '10%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#c98ade'
    }
})
