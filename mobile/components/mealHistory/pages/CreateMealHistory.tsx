import {useContext, useEffect, useState} from "react";
import MealHistoryContext from "../mealHistoryContext";
import {Button, Flex, HStack, Text, TextInput, VStack} from "@react-native-material/core";
import {SelectList} from "react-native-dropdown-select-list/index";
import {BASE_URL} from "@env";
import axios from "axios";
import FoodInterface from "../../food/foodInterface";
import NavigatorContext, {Page} from "../../navigator/NavigatorProvider";
import {StyleSheet} from "react-native";
import PageHistoryContext from "../../PageHistory/PageHistoryProvider";

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
        <Flex fill style={createMealHistoryStyle.page}>
            <Text style={createMealHistoryStyle.mealPeriodNameText}>{mealPeriod?.toString()}</Text>
            <VStack spacing={10} style={createMealHistoryStyle.content}>
                <SelectList searchPlaceholder={'Search'}
                            placeholder={'Search foods'}
                            data={data}
                            setSelected={setSelected}
                            save={'key'}/>
                <Text style={{color: '#807c7c', fontSize: 14, marginLeft: 15}}>{foodWarning}</Text>
                <Text>Amount (g)</Text>
                <TextInput maxLength={4} keyboardType={'numeric'} onChangeText={text => setAmount(Number(text))} helperText={amountWarning}/>
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
    )
}
export default CreateMealHistory

export const createMealHistoryStyle = StyleSheet.create({
    page: {
      backgroundColor: '#cbb9ff'
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
    }
})