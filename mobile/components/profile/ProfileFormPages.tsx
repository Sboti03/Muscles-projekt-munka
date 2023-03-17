import {Button, Flex, Text, TextInput, VStack} from "@react-native-material/core";
import {useContext, useEffect, useRef, useState} from "react";
import { StyleSheet, Keyboard, View} from "react-native";
import profileProvider, {Profile} from "./ProfileProvider";
import DatePicker from "react-native-date-picker";
import NavigatorProvider, {Page} from "../navigator/NavigatorProvider";
import {homePageStyle} from "../home/homePage";
import {loginPageStyle} from "../loginPage";
import {Form, FormItem, Modal} from "react-native-form-component";



export interface ProfileProps {
    birthDay?: boolean
}
export default function ProfileFormPages (props: ProfileProps) {

    const {profile, updateProfile} = useContext(profileProvider)
    const {changePage} = useContext(NavigatorProvider)

    const firstNameRef = useRef<string>('')
    const lastNameRef = useRef<typeof FormItem>()

    const [fNameWarning, setFNameWarning] = useState<string>('')
    const [lNameWarning, setLNameWarning] = useState<string>('')
    const [heightWarning, setHeightWarning] = useState<string>('')

    const submit = () => {
        Keyboard.dismiss()
        if (!profile?.firstName) {
            setFNameWarning('This field is required')
        } else if (profile?.firstName) setFNameWarning('')
        if (!profile?.lastName) {
            setLNameWarning('This field is required')
        }else if (profile.lastName) setLNameWarning('')
        else {

        }
    }
    const clearWarning = async () => {
        await console.log('elotte')
        if (profile?.firstName) setFNameWarning('')
        if (profile?.lastName) setLNameWarning('')
        console.log('utana')
    }

    useEffect(()=> {
        console.log(profile)
    },[profile])


    const updateSearchText = (text: string) => {
        // console.log(firstNameRef.current?.propTypes?.value?.name.toString()!)
        console.log(text)
        return text
    };

    if (props.birthDay){
        return (
            <VStack>
                <DatePicker date={new Date()}
                            onDateChange={(date) => {
                                const currentProfileFirstname: Profile = {birthDay: date}
                                updateProfile(currentProfileFirstname)
                            }}
                            maximumDate={new Date()}
                            mode={"date"}
                />
                <Text></Text>
                <Text></Text>
                <TextInput placeholder={'height'}
                           style={loginPageStyle.input}
                           keyboardType={"numeric"}
                           maxLength={3}
                           onEndEditing={event => {
                               const height = Number(event.nativeEvent.text)
                               updateProfile({...profile, height})
                           }}
                           onBlur={clearWarning}
                           helperText={heightWarning}
                />
                    <Button title={'Next'}
                            onPress={() => {
                                changePage(Page.HOME)
                            }}
                    />
            </VStack>
        )
    }
    else return (
        <Flex fill style={homePageStyle.page}>
            <VStack  style={profileFormStyles.container}>
                <Form onButtonPress={() => {
                    console.log(firstNameRef.current)
                    console.log('pressed')

                }}
                      buttonStyle={profileFormStyles.buttons}

                >
                    <FormItem value={profile?.firstName!}
                              isRequired={true}
                              label={'First name'}
                              onChangeText={(text: string) => {updateSearchText(text)}}
                              onChange={() => {
                               updateProfile({...profile, firstName: firstNameRef.current})
                              }}
                              // onChange={e => {
                              //     console.log(firstNameRef.current)
                              // }}
                              ref={firstNameRef}
                    />
                    <FormItem value={'alma'}
                              isRequired={true}
                              label={'Last name'}
                              ref={lastNameRef}
                              onChangeText={text => {
                                  console.log(lastNameRef.current)
                                  console.log(text)
                              }}
                              onEndEditing={event => {

                                  console.log(lastNameRef.current)
                                  //updateProfile({...profile, lastName: event.nativeEvent.text})
                              }}
                    />
                </Form>
                <Text style={profileFormStyles.texts}>
                    First name
                </Text>
                <TextInput placeholder={'Firstname'}
                           style={Object.assign({}, profileFormStyles.inputOnTheMiddle ,loginPageStyle.input)}
                           inputStyle={{backgroundColor: '#aa8dff'}}
                           placeholderTextColor={'#d2bdfc'}
                           onEndEditing={event => {
                               const firstName = event.nativeEvent.text
                               updateProfile({...profile, firstName})
                           }}
                           onBlur={clearWarning}
                           helperText={fNameWarning}

                />
                <Text style={profileFormStyles.texts}>
                    Last name
                </Text>
                <TextInput placeholder={'Lastname'}
                           style={Object.assign({}, profileFormStyles.inputOnTheMiddle ,loginPageStyle.input)}
                           inputStyle={{backgroundColor: '#aa8dff'}}
                           placeholderTextColor={'#d2bdfc'}
                           onEndEditing={event => {
                               const lastName = event.nativeEvent.text
                               updateProfile({...profile, lastName})

                           }}
                           onBlur={clearWarning}
                           helperText={lNameWarning}
                />
                <Button title={'Next'}
                        style={profileFormStyles.buttons}

                        onPress={() => {
                            submit()
                        }}
                />
            </VStack>
            <Text>{profile?.firstName + ' ' + profile?.lastName}</Text>
        </Flex>
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

        width: 200,
    },
    texts: {
        alignSelf: "flex-start",
        color: '#7a44cf'
    }

})