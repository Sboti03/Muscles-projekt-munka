import {Flex, HStack, TextInput, VStack, Text, Button, Pressable} from "@react-native-material/core";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import {useContext} from "react";
import ProfileContext, {Profile} from "./ProfileProvider";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {BASE_URL} from "@env";
import axios from "axios";
import NavigatorContext, {Page} from "../navigator/NavigatorProvider";
import {ImageBackground, StyleSheet} from "react-native";
import PageHistoryContext from "../pageHistory/PageHistoryProvider";

const patchProfileURL = BASE_URL + 'api/profile/update'
const getProfileAPI = BASE_URL + 'api/profile'

export default function ProfileInformation() {

    const {profile, updateProfile} = useContext(ProfileContext)
    const {changePage} = useContext(NavigatorContext)
    const {deleteLastPage} = useContext(PageHistoryContext)

    function showDatePicker() {
        DateTimePickerAndroid.open({
            value: profile?.birthDay!,
            onChange: event => {
                const birthDay = new Date(event.nativeEvent.timestamp!)
                console.log('PROFILE RESPONSE')
                updateProfile({...profile, birthDay})
            },
            mode: 'date',
            display: 'spinner',
            maximumDate: new Date(),
            minimumDate: new Date('1900-01-01'),
        })
    }

    const patchProfile = () => {
        axios.patch(patchProfileURL, profile)
            .then(function (response) {
                console.log(response.data)
                changePage(Page.HOME)
                deleteLastPage()
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return(
        <ImageBackground source={ require('../../assets/background/gears.png')} style={{flex: 1}} imageStyle={{flex: 1}}>

        <Flex fill style={profInfoStyle.page}>
            <MaterialCommunityIcons name="account-circle-outline" size={80} color='#7a44cf' style={{alignSelf: 'center', marginBottom: 30}}/>

            <VStack style={profInfoStyle.mainVStack} spacing={30}>
                    <TextInput value={profile?.firstName}
                               style={profInfoStyle.inputBox}
                               inputStyle={profInfoStyle.input}
                               helperText={'First Name'}
                               onChangeText={firstName => {
                                   updateProfile({...profile, firstName})
                               }}
                    />
                    <TextInput value={profile?.lastName}
                               style={profInfoStyle.inputBox}
                               inputStyle={profInfoStyle.input}
                               helperText={'Last Name'}
                               onChangeText={lastName => {
                                   updateProfile({...profile, lastName})
                               }}
                    />
                    <TextInput value={profile?.height!.toString()}
                               style={profInfoStyle.inputBox}
                               helperText={'Height (cm)'}
                               inputMode={"numeric"}
                               inputStyle={profInfoStyle.input}
                               keyboardType={"numeric"}
                               maxLength={3}
                               onChangeText={inputHeight => {
                                   const height = Number(inputHeight)
                                   updateProfile({...profile, height})
                               }}
                    />
                    <Pressable onPress={showDatePicker} style={profInfoStyle.box}>
                        <Text style={profInfoStyle.text}>{new Date(profile?.birthDay!).toLocaleDateString()}</Text>
                    </Pressable>
                <HStack style={profInfoStyle.hStackWithButtons}>
                    <Button title={'Done'}
                            onPress={() => {
                                patchProfile()
                            }}
                            style={profInfoStyle.submitButton}
                    />
                    <Button title={'Back'}
                            onPress={() => {
                                axios.get(getProfileAPI)
                                    .then(function (response) {
                                        console.log('PROFILE RESPONSE DATA:')
                                        console.log(response.data)
                                        let profileResponse = response.data as Profile
                                        updateProfile(profileResponse)
                                    })
                                    .catch(function (error) {
                                        console.log(error)
                                    })
                                changePage(Page.HOME)
                                deleteLastPage()
                            }}
                            style={profInfoStyle.cancelButton}
                    />
                </HStack>
            </VStack>
        </Flex>
        </ImageBackground>
    )
}

const profInfoStyle = StyleSheet.create({
    page: {
        justifyContent: "center"
    },
    mainVStack: {
        alignSelf: "center",
        alignItems: "center",
        width: 300
    },
    box: {
        height: 60,
        width: 250,
        paddingLeft: 20,
        justifyContent: "center",
        backgroundColor: '#aa8dff',
    },
    inputBox: {
        width: 250,
        height: 60
    },
    input: {
        color: '#e6daff',
        backgroundColor: '#aa8dff',
        paddingLeft: 20,
    },
    text: {
        color: '#e6daff'
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
        width: 250,
    }
})
