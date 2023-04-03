import {useContext, useEffect, useState} from "react";
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

const updateWeightHistoryApi = BASE_URL + 'api/weight-history/update'
export default function Weight() {
    const {mealHistory, setMealHistory, date} = useContext(MealHistoryContext)
    const [currentWeight, setCurrentWeight] = useState<string | number>(50)
    const [justifyContent, setJustifyContent] = useState<'space-between' | 'center'>('space-between')
    const [keyboardStatus, setKeyboardStatus] = useState('hidden');
    const [disabled, setDisabled] = useState<boolean>(true)
    const [warning, setWarning] = useState<string>('')

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
        axios.patch(updateWeightHistoryApi, {date, weight: 60})
            .then(function (response) {
                const weightHistory: WeightHistoryResponse = response.data as WeightHistoryResponse

                console.log('Weight Interface')
                console.log(response.data)
                setMealHistory({...mealHistory, weight: {weight: weightHistory.weight, weightDate:date}})
            })
            .catch(function (error) {
                console.log(error)
            })

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    useEffect(() => {
        console.log('WeightHistoryUpdate')
        setCurrentWeight(mealHistory.weight?.weight!.toString()!)
    }, [mealHistory])

    const createWeightHistory = () => {
        axios.patch(updateWeightHistoryApi, {date: new Date(), weight: 70})
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const weightStyle = StyleSheet.create({
        box: {
            width: '85%',
            alignSelf: "center",
            marginTop: '15%'
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

                {keyboardStatus === 'hidden'? <IconButton icon={<MaterialCommunityIcons name={'minus-circle-outline'} size={40} color={'#9fecff'}/>}/>: <></>}
                <TextInput value={currentWeight.toString()}
                           inputMode={'numeric'}
                           style={weightStyle.weight}
                           inputStyle={weightStyle.weightInput}
                           inputContainerStyle={{backgroundColor: 'transparent'}}
                           underlineColorAndroid={'transparent'}
                           removeClippedSubviews={true}
                           helperText={warning}
                           onChangeText={(text) => {
                               if (Number(text) <= 0 /*|| typeof Number(text) === "string"*/) {
                                   setWarning('Weight cannot be less than 0.1 nor" a character')
                                   setCurrentWeight(text)
                               } else {
                                   setWarning('')
                                   setCurrentWeight(text)
                               }
                               if (Number(text) === mealHistory.weight?.weight) {
                                   console.log('EQUAL')
                                   console.log(mealHistory.weight?.weight)
                                   console.log(text)
                                   setDisabled(true)
                               } else {
                                   console.log('NOT EQUAL')
                                   console.log(mealHistory.weight?.weight)
                                   console.log(text)
                                   setDisabled(false)
                               }
                           }}
                />
                {keyboardStatus === 'hidden'? <IconButton icon={<MaterialCommunityIcons name={'plus-circle-outline'} size={40} color={'#ff9ffd'}/>}/>: <></>}
            </HStack>
            <Button title={'Done'}
                    style={{width: '30%', alignSelf: 'center'}}
                    disabled={disabled}
            />
            {/*<Button title={'CreateWeightHistory'} onPress={() => {*/}
            {/*    createWeightHistory()*/}
            {/*}}/>*/}
        </Flex>
    )
}

