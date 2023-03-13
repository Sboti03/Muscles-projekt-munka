import {Button, HStack, TextInput, VStack} from "@react-native-material/core";
import {Component, useContext, useState} from "react";
import {StyleSheet} from "react-native";
import ProfileContext from "./ProfileProvider";
import ProfileProvider from "./ProfileProvider";
import profileProvider from "./ProfileProvider";

export interface ProfileProps {
    placeHolder: string
    skipButton?: boolean
    birthDay?: boolean
}
export default function ProfileFormPages (props: ProfileProps) {
    const {profile, updateProfile} = useContext(profileProvider)

    const [profileId, setProfileId] = useState<number | undefined>(undefined)
    const [firstName, setFirstName] = useState<string | undefined>(undefined)
    const [lastName, setLastName] = useState<string | undefined>(undefined)
    const [birthDay, setBirthDay] = useState<Date | undefined>(undefined)
    const [height, setHeight] = useState<number | undefined>(undefined)


    if (props.skipButton){
        return (
            <VStack>
                <TextInput placeholder={props.placeHolder}
                           style={profileFormStyles.inputOnTheMiddle}
                           onChangeText={(text) => {
                               updateProfile({height: Number(text)})
                           }}
                />
                <HStack style={profileFormStyles.buttons}>
                    <Button title={'skip'} />
                    <Button title={'Next'} />
                </HStack>
            </VStack>
        )
    } else if (props.birthDay) {
        return (
            <VStack style={profileFormStyles.container}>
                <TextInput placeholder={props.placeHolder}
                           dataDetectorTypes={"calendarEvent"}
                           style={profileFormStyles.inputOnTheMiddle}
                           value={birthDay?.toDateString()}
                           onChangeText={() => {
                               //TODO: DatePicker implementáció
                           }}
                />
                <Button title={'Next'}
                        style={profileFormStyles.buttons}
                />
            </VStack>
        )
    }
    else return (
        <VStack style={profileFormStyles.container}>
            <TextInput placeholder={props.placeHolder}
                       style={profileFormStyles.inputOnTheMiddle}
                       id={'input'}
                       onChangeText={(text) => {
                            if (props.placeHolder === 'firstName') setFirstName(text)
                           else setLastName(text)
                       }}
            />
            <Button title={'Next'}
                    style={profileFormStyles.buttons}
                    onPress={() => {
                        if (props.placeHolder === 'firstName') updateProfile({firstName: firstName})
                        else updateProfile({lastName: lastName})
                    }}
            />
        </VStack>
    )
}
const profileFormStyles = StyleSheet.create({
    inputOnTheMiddle: {
        alignSelf:"center",
    },
    container: {
        flex: 1,
    },
    buttons: {
        alignSelf: "flex-end"
    }

})