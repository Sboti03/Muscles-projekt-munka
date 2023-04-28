import {Button, Flex, Text, TextInput, VStack} from "@react-native-material/core";
import {useContext, useState} from "react";
import {ImageBackground, Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import profileProvider from "./ProfileProvider";
import NavigatorProvider, {Page} from "../navigator/NavigatorProvider";
import {homePageStyle} from "../home/homePage";
import {loginPageStyle} from "../loginPage";
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {BASE_URL} from "@env";
import axios from "axios";
import PageHistoryContext from "../pageHistory/PageHistoryProvider";
import {LinearGradient} from "expo-linear-gradient";

const updateProfileAPI = BASE_URL + 'api/profile/update'

export interface ProfileProps {
    birthDay?: boolean
}
export default function ProfileFormPages (props: ProfileProps) {

    const {profile, updateProfile} = useContext(profileProvider)
    const {changePage} = useContext(NavigatorProvider)
    const {deleteLastPage,addPage} = useContext(PageHistoryContext)

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
            addPage(Page.BIRTHDAYANDWEIGHT)
            console.log(profile)
        }
    }
    const submitBirthdayAndHeight = () => {
        Keyboard.dismiss()
        if (!profile?.height) {
            setHeightWarning('This field is required')
        } else if (profile.height) {
            const currentProfile = {firstName: profile.firstName, lastName: profile.lastName, birthDay: profile.birthDay, height: profile.height}
            setHeightWarning('')
            axios.patch(updateProfileAPI, currentProfile)
                .then(function (response) {
                    console.log(response.data)
                    changePage(Page.HOME)
                    deleteLastPage()
                    deleteLastPage()
                    addPage(Page.HOME)
                })
                .catch(function (error) {
                    console.log(error)
                    console.log(profile)
                    console.log(updateProfileAPI)
                })
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
            <Flex fill>
                <ImageBackground source={ require('../../assets/background/gears.png')} style={{flex: 1}} imageStyle={{flex: 1}}>

                <VStack style={profileFormStyles.container}>
                    <Text style={{color: '#FFF'}}>BirthDay:</Text>
                    <TouchableOpacity onPress={showDatePicker}
                                      style={profileFormStyles.birthdayBox}

                    >
                        <Text style={profileFormStyles.birthDayText}>{profile?.birthDay?.toLocaleDateString()}</Text>
                    </TouchableOpacity>

                    <TextInput placeholder={'height'}
                               style={Object.assign({}, profileFormStyles.inputOnTheMiddle ,loginPageStyle.inputBox)}
                               inputStyle={{backgroundColor: '#aa8dff', color: '#FFF'}}
                               inputContainerStyle={loginPageStyle.inputContainer}
                               placeholderTextColor={'#e9dbff'}
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
                </ImageBackground>
            </Flex>
        )
    }
    else return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Flex fill >
                <ImageBackground source={ require('../../assets/background/gears.png')} style={{flex: 1}} imageStyle={{flex: 1}}>

                <VStack  style={profileFormStyles.container}>
                    <Text style={profileFormStyles.texts}>
                        First name
                    </Text>
                    <TextInput placeholder={'Firstname'}
                               style={Object.assign({}, profileFormStyles.inputOnTheMiddle ,loginPageStyle.inputBox)}
                               inputStyle={{backgroundColor: '#aa8dff', color: '#FFF'}}
                               inputContainerStyle={loginPageStyle.inputContainer}
                               placeholderTextColor={'#e9dbff'}
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
                               style={Object.assign({}, profileFormStyles.inputOnTheMiddle ,loginPageStyle.inputBox)}
                               inputStyle={{backgroundColor: '#aa8dff', color: '#FFF'}}
                               inputContainerStyle={loginPageStyle.inputContainer}
                               placeholderTextColor={'#e9dbff'}
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
                </ImageBackground>
            </Flex>
        </TouchableWithoutFeedback>
    )
}
const profileFormStyles = StyleSheet.create({
    inputOnTheMiddle: {
        width: 270,
        marginTop: 20,

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
        color: '#9b7fc5'
    },
    birthDayText: {
        fontWeight: '400',
        fontSize: 35,
        color: '#cdb9ff',
    },
    birthdayBox: {
        borderWidth: 4,
        borderRadius: 40,
        borderColor: '#7a4dc2',
        paddingLeft: 5,
        paddingRight: 3,
        backgroundColor: '#9674ff'

    }

})