import {useContext, useEffect, useState} from "react";
import MealHistoryContext from "../mealHistoryContext";
import {Button, Flex, HStack, Text, TextInput, VStack} from "@react-native-material/core";
import {SelectList} from "react-native-dropdown-select-list/index";
import {BASE_URL} from "@env";
import axios from "axios";
import FoodInterface from "../../food/foodInterface";
import NavigatorContext, {Page} from "../../navigator/NavigatorProvider";
import {StyleSheet} from "react-native";
import PageHistoryContext from "../../pageHistory/PageHistoryProvider";
import {LinearGradient} from "expo-linear-gradient";
import {loginPageStyle} from "../../loginPage";

const getAllFoodApi = BASE_URL + 'api/food'
const createMealHistoryAPI = BASE_URL + 'api/meal-history/create'
export function NormalizeDate(newDate: Date) {
    return newDate.toISOString().split('T')[0]
}

function CreateMealHistory() {
    const {mealPeriod, dayHistories, date} = useContext(MealHistoryContext)
    const {changePage} = useContext(NavigatorContext)
    const {deleteLastPage} = useContext(PageHistoryContext)

    const [data, setData] = useState([])
    const [selected, setSelected] = useState('');
    const [amount, setAmount] = useState<number>(0)
    const [amountWarning, setAmountWarning] = useState<string>('')
    const [foodWarning, setFoodWarning] = useState<string>('')


    useEffect(() => {
        setFoodWarning('')
    }, [selected])
    useEffect(() => {
        setAmountWarning('')
    }, [amount])
    const createMealHistoryToBackend = () => {
        console.log()
        if (amount === 0) {
            setAmountWarning('Amount cannot be null')
        }
        if (!selected){
            setFoodWarning('You must choose a food')
        }
        if (amount > 0 && selected !== '') {
            console.log(date)
            const normalDate = NormalizeDate(date)
            console.log('FOOD ID')
            console.log(selected)
            const currentMealHistory = {periodName: mealPeriod, date: normalDate, foodId: selected, amount: amount}
            axios.post(createMealHistoryAPI, currentMealHistory)
                .then((response) => {
                    console.log(response.data)
                    changePage(Page.HOME)
                    deleteLastPage()
                })
                .catch((error) => {
                    console.log(error)
                })
            }
    }

    useEffect(() => {
        axios.get(getAllFoodApi)
            .then((response) => {
                let foods = response.data.map((item: FoodInterface) => {
                    console.log(item.foodId)
                    return {key: item.foodId, value: item.name}
                })
                setData(foods)
            })
    }, [])

    return (
        <LinearGradient  colors={['#efe8fd', '#865eff']}
                         style={{width: '100%', flex: 1, alignItems: "center"}}>
            <Flex fill >
                <Text style={createMealHistoryStyle.title}>{mealPeriod?.toString()}</Text>
                <VStack spacing={10} style={createMealHistoryStyle.content}>
                    <SelectList searchPlaceholder={'Search'}
                                placeholder={'Search foods'}
                                data={data}
                                setSelected={setSelected}
                                save={'key'}/>
                    <Text style={createMealHistoryStyle.warningText}>{foodWarning}</Text>
                    <Text>Amount (g)</Text>
                    <TextInput maxLength={4}
                               keyboardType={'numeric'}
                               onChangeText={text => setAmount(Number(text))}
                               style={createMealHistoryStyle.inputBox}
                               inputStyle={createMealHistoryStyle.input}
                               inputContainerStyle={createMealHistoryStyle.inputContainer}
                    />
                    <Text style={createMealHistoryStyle.warningText}>{amountWarning}</Text>
                    <HStack style={createMealHistoryStyle.hStackWithButtons}>
                        <Button title={'Submit'}
                                onPress={() => {
                                    createMealHistoryToBackend()
                                }}
                                style={createMealHistoryStyle.submitButton}
                        />
                        <Button title={'Cancel'}
                                onPress={() => {
                                    changePage(Page.HOME)
                                    deleteLastPage()
                                }}
                                style={createMealHistoryStyle.cancelButton}
                        />
                    </HStack>
                </VStack>
            </Flex>
        </LinearGradient>
    )
}
export default CreateMealHistory

export const createMealHistoryStyle = StyleSheet.create({
    page: {
      backgroundColor: '#cbb9ff'
    },
    title: {
        textAlign: "center",
        fontFamily: 'serif',
        marginTop: 80,
        fontSize: 50,
        color: '#FFF'
    },
    mealPeriodNameText: {
        textAlign: "center",
        fontFamily: 'serif',
        marginTop: 60,
        fontSize: 50,
    },
    content: {
        height: '70%',
        width: 300,
        alignSelf: "center",
        justifyContent: "center"
    },
    submitButton: {
        width: '60%'
    },
    cancelButton: {
        width: '35%',
        backgroundColor: '#7856ff'
    },
    hStackWithButtons: {
        marginTop: 20,
        justifyContent: 'space-between',
        width: '100%'
    },
    inputBox: {
        width: 300,
        height: 70,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: '#ccc8ff',
    },
    input: {
        color: '#e6daff',
        paddingLeft: 14,
    },
    inputContainer: {
        backgroundColor: '#aa8dff',
        borderRadius: 30,
        flexGrow: 1
    },
    warningText: {
        color: '#807c7c',
        fontSize: 14,
        marginLeft: 15
    }
})