import {Button, Flex, Text, TextInput, VStack} from "@react-native-material/core";
import {useContext, useState} from "react";
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from "react-native";
import profileProvider from "./ProfileProvider";
import NavigatorProvider, {Page} from "../navigator/NavigatorProvider";
import {homePageStyle} from "../home/homePage";
import {loginPageStyle} from "../loginPage";
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

export interface ProfileProps {
    birthDay?: boolean
}
export default function ProfileFormPages (props: ProfileProps) {

    const {profile, updateProfile} = useContext(profileProvider)
    const {changePage} = useContext(NavigatorProvider)

    const [fNameWarning, setFNameWarning] = useState<string>('')
    const [lNameWarning, setLNameWarning] = useState<string>('')
    const [heightWarning, setHeightWarning] = useState<string>('')

    const submitFirstAndLastName = () => {
        Keyboard.dismiss()
        if (!profile?.firstName) {
            setFNameWarning('This field is required')
        } else if (profile?.firstName) setFNameWarning('')
        if (!profile?.lastName) {
            setLNameWarning('This field is required')
        }else if (profile.lastName) setLNameWarning('')
        if (profile!.firstName && profile!.lastName) {
            changePage(Page.BIRTHDAYANDWEIGHT)
            console.log(profile)
        }
    }
    const submitBirthdayAndHeight = () => {
        Keyboard.dismiss()
        if (!profile?.height) {
            setHeightWarning('This field is required')
        } else if (profile.height) {
            setHeightWarning('')
            changePage(Page.HOME)
        }
    }
    const clearWarning = () => {
        if (profile?.firstName) setFNameWarning('')
        if (profile?.lastName) setLNameWarning('')
        if (profile?.height) setHeightWarning('')
    }

    function showDatePicker() {
        DateTimePickerAndroid.open({
            value: profile?.birthDay!,
            onChange: event => updateProfile({...profile, birthDay: new Date(event.nativeEvent.timestamp!)}),
            mode: 'date',
            display: 'spinner',
            maximumDate: new Date(),
            minimumDate: new Date('1900-01-01'),
        })
    }

    if (props.birthDay){
        return (
            <Flex fill style={homePageStyle.page}>
                <VStack style={profileFormStyles.container}>
                    <Text>{profile?.birthDay?.toLocaleDateString()}</Text>
                    <Text onPress={showDatePicker}>change birthday</Text>
                    <TextInput placeholder={'height'}
                               style={Object.assign({}, profileFormStyles.inputOnTheMiddle ,loginPageStyle.input)}
                               inputStyle={{backgroundColor: '#aa8dff'}}
                               placeholderTextColor={'#d2bdfc'}
                               keyboardType={"numeric"}
                               maxLength={3}
                               onChangeText={inputHeight => {
                                   const height = Number(inputHeight)
                                   updateProfile({...profile, height})
                                   clearWarning()
                               }}
                               helperText={heightWarning}
                    />
                        <Button title={'Next'}
                                style={profileFormStyles.buttons}
                                onPress={submitBirthdayAndHeight}
                        />
                </VStack>
            </Flex>
        )
    }
    else return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Flex fill style={homePageStyle.page}>
                <VStack  style={profileFormStyles.container}>
                    <Text style={profileFormStyles.texts}>
                        First name
                    </Text>
                    <TextInput placeholder={'Firstname'}
                               style={Object.assign({}, profileFormStyles.inputOnTheMiddle ,loginPageStyle.input)}
                               inputStyle={{backgroundColor: '#aa8dff'}}
                               placeholderTextColor={'#d2bdfc'}
                               onChangeText={firstName =>{
                                   updateProfile({...profile, firstName})
                                   clearWarning()
                               }}
                               helperText={fNameWarning}

                    />
                    <Text style={profileFormStyles.texts}>
                        Last name
                    </Text>
                    <TextInput placeholder={'Lastname'}
                               style={Object.assign({}, profileFormStyles.inputOnTheMiddle ,loginPageStyle.input)}
                               inputStyle={{backgroundColor: '#aa8dff'}}
                               placeholderTextColor={'#d2bdfc'}
                               onChangeText={lastName =>{
                                   updateProfile({...profile, lastName})
                                   clearWarning()
                               }}
                               helperText={lNameWarning}
                    />
                    <Button title={'Next'}
                            style={profileFormStyles.buttons}
                            onPress={submitFirstAndLastName}
                    />
                </VStack>
            </Flex>
        </TouchableWithoutFeedback>
    )
}
const profileFormStyles = StyleSheet.create({
    inputOnTheMiddle: {
        width: 270,
        marginTop: 20,
        backgroundColor: '#cbb9ff'
    },
    container: {
        flex: 1,
        alignSelf: "center",
        width: 270,
        justifyContent: "center",
        alignItems:"center"
    },
    buttons: {
        marginTop: 30,
        width: 200,
    },
    texts: {
        alignSelf: "flex-start",
        color: '#7a44cf'
    }

})