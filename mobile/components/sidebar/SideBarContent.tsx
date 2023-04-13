import {Avatar, Button, Flex, HStack, Pressable, Spacer, Text, VStack} from "@react-native-material/core";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import {useContext, useEffect} from "react";
import NavigatorContext, {Page} from "../navigator/NavigatorProvider";
import AuthContext from "../auth/AuthContext";
import {Image, StyleSheet} from "react-native";
import ProfileContext from "../profile/ProfileProvider";
import PageHistoryContext from "../pageHistory/PageHistoryProvider";
import {BASE_URL} from "@env";
import axios from "axios";

const getImageAPI = BASE_URL + 'api/profile/pic/me'

export default function SideBarContent() {
    const {changePage} = useContext(NavigatorContext)
    const {profile} = useContext(ProfileContext)
    const {logout} = useContext(AuthContext)
    const {addPage} = useContext(PageHistoryContext)

    useEffect(() => {
        console.log('SIDEBAR_____________________')

        axios.get(getImageAPI)
            .then(function (response) {
                console.log('PICTURE___________WORKS')

            })
            .catch(function (error) {
                console.log(error)
            })

    }, [])

    return(
        <Flex fill style={sidebarStyle.page}>
            <VStack style={sidebarStyle.mainVStack}>
                <HStack>
                    {/*<Avatar image={{*/}
                    {/*    width: 50,*/}
                    {/*    height: 50,*/}
                    {/*    uri: 'data:image/png;base64,' + BASE_URL + 'api/profile/pic/me'*/}
                    {/*}}*/}
                    {/*/>*/}

                    <MaterialCommunityIcons name="account-circle-outline" size={120} color='#7a44cf' style={{marginLeft:5}}/>
                    <VStack>
                        <Text>Name: </Text>
                        <HStack style={{marginLeft: 10}}>
                            <Text>{profile?.lastName} </Text>
                            <Text>{profile?.firstName}</Text>
                        </HStack>
                    </VStack>
                </HStack>
                <Pressable
                           onPress={() => {
                    changePage(Page.PROFILE)
                    addPage(Page.PROFILE)
                }}
                           style={{}}
                >
                    <Text>Change profile</Text>
                </Pressable>
                <Pressable onPress={() => {
                    changePage(Page.MYGOAL)
                    addPage(Page.MYGOAL)
                }}>
                    <Text>My goal</Text>
                </Pressable>
            </VStack>
            <Spacer/>
            <Button title={'Logout'}
                    onPress={() => {
                        logout()
                    }}
                    style={sidebarStyle.logoutButton}
            />
        </Flex>
    )
}

const sidebarStyle = StyleSheet.create({
    page: {
        backgroundColor: "#cbb9ff",

    },
    mainVStack: {
        marginTop: 30,
    },
    logoutButton: {
        marginBottom: 30,
        width:'50%',
        alignSelf: "center"
    }
})