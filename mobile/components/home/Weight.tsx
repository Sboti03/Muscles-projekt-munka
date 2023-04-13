import {useContext, useEffect, useRef, useState} from "react";
import MealHistoryContext from "../mealHistory/mealHistoryContext";
import {Box, Button, Flex, HStack, IconButton, Text, TextInput} from "@react-native-material/core";
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import MyIcon from "../icons/myIcon";
import {Keyboard, KeyboardAvoidingView, StyleSheet} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {BASE_URL} from "@env";
import axios from "axios";
import WeightInterface, {WeightHistoryResponse} from "../mealHistory/types/weightInterface";
import mealHistoryContext from "../mealHistory/mealHistoryContext";
import {goalAPI} from "./goals/myGoal";
import {err} from "react-native-svg/lib/typescript/xml";

const updateWeightHistoryApi = BASE_URL + 'api/weight-history/update'
export default function Weight() {
    const {mealHistory, setMealHistory, date} = useContext(MealHistoryContext)
    const [currentWeight, setCurrentWeight] = useState<string | number>(50)
    const [justifyContent, setJustifyContent] = useState<'space-between' | 'center'>('space-between')
    const [keyboardStatus, setKeyboardStatus] = useState('hidden');
    const [disabled, setDisabled] = useState<boolean>(true)
    const [warning, setWarning] = useState<string>('')

    const intervalIdRef = useRef<number | null>(null)

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus('shown');
            setJustifyContent('center')
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus('hidden');
            setJustifyContent('space-between')
            Keyboard.dismiss()
        });
        if (mealHistory.weight === undefined) {
            axios.patch(updateWeightHistoryApi, {date, weight: 60})
                .then(function (response) {
                    const weightHistory: WeightHistoryResponse = response.data as WeightHistoryResponse

                    console.log('Weight Interface')
                    console.log(response.data)
                    setMealHistory({...mealHistory, weight: {weight: weightHistory.weight, weightDate: date}})
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    useEffect(() => {
        console.log('WeightHistoryUpdate')
        setCurrentWeight(mealHistory.weight?.weight!.toFixed(1)!)
        console.log(mealHistory.weight?.weight!.toFixed(1)!)
    }, [mealHistory])
    useEffect(() => {
        if (Number(currentWeight) === mealHistory.weight?.weight) {
            console.log('EQUAL')
            console.log(mealHistory.weight?.weight)
            console.log(currentWeight)
            setDisabled(true)
        } else {
            console.log('NOT EQUAL')
            console.log(mealHistory.weight?.weight)
            console.log(currentWeight)
            setDisabled(false)
        }
    }, [currentWeight])

    const changeCurrentWeightOnPress = (numberBy: number) => {
        setCurrentWeight((Number(currentWeight) + numberBy).toString())
    }
    const changeCurrentWeightOnLongPress = (numberBy: number) => {
        intervalIdRef.current = window.setInterval(() => {
            console.log('second interval')
            setCurrentWeight(prevWeight =>  (Number(prevWeight) + numberBy).toString())
        }, 150)
        console.log(intervalIdRef.current)
    }
    const stopInterval = () => {
        if (intervalIdRef.current) {
            window.clearInterval(intervalIdRef.current)
            intervalIdRef.current = null
        }
    }

    const checkWeightRoundness = (): string => {
        if (Number(currentWeight).toFixed(2) === Math.round(Number(currentWeight)).toFixed(2)) {
            return Number(currentWeight).toFixed(0)
        } else {
            return Number(currentWeight).toFixed(1)
        }
    }

    const submitWeight = () => {
        axios.patch(updateWeightHistoryApi, {date: new Date(),weight: Number((+ currentWeight).toFixed(1))})
            .then(function (response) {
                console.log(response.data)
                setMealHistory({...mealHistory, weight: {weight: Number((+ currentWeight).toFixed(1)), weightDate: date}})
                setDisabled(true)
            })
            .catch(function (error) {
                console.log(error)
        })
    }


    const weightStyle = StyleSheet.create({
        box: {
            width: '85%',
            alignSelf: "center",
            marginTop: '0%'
        },
        weight: {
            width: '30%',
        },
        hStack: {
            justifyContent: justifyContent
        },
        weightInput: {
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: '#b2a1ff',
            borderRadius: 40,
        },

    })

    return(

        <Flex style={weightStyle.box}>

            <HStack style={weightStyle.hStack}>

                {keyboardStatus === 'hidden'? <IconButton icon={<MaterialCommunityIcons name={'minus-circle-outline'} size={40} color={'#9fecff'}/>}
                                                          onPress={() => changeCurrentWeightOnPress(-0.1)}
                                                          onLongPress={() => changeCurrentWeightOnLongPress(-1)}
                                                          onPressOut={() => {
                                                              stopInterval()
                                                          }}
                />: <></>}
                <TextInput value={checkWeightRoundness()}
                           inputMode={'numeric'}
                           style={weightStyle.weight}
                           inputStyle={weightStyle.weightInput}
                           inputContainerStyle={{backgroundColor: 'transparent'}}
                           underlineColorAndroid={'transparent'}
                           removeClippedSubviews={true}
                           onChangeText={(text) => {
                               if (Number(text) <= 0 /*|| typeof Number(text) === "string"*/) {
                                   setWarning('Weight cannot be less than 0.1 nor" a character')
                                   setCurrentWeight(text)
                               } else {
                                   setWarning('')
                                   setCurrentWeight(text)
                               }

                           }}
                />
                {keyboardStatus === 'hidden'? <IconButton icon={<MaterialCommunityIcons name={'plus-circle-outline'} size={40} color={'#ff9ffd'}/>}
                                                          onPress={() => changeCurrentWeightOnPress(0.1)}
                                                          onLongPress={() => changeCurrentWeightOnLongPress(1)}
                                                          onPressOut={() => {
                                                              stopInterval()
                                                          }}
                />: <></>}
            </HStack>
            <Text style={{color: warning === ''? 'transparent':'#531a98', fontSize: 13}}>{warning}</Text>
            <Button title={'Done'}
                    style={{width: '30%', alignSelf: 'center'}}
                    disabled={disabled}
                    onPress={submitWeight}
            />
        </Flex>
    )
}

