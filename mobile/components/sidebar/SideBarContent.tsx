import {Button, Flex, HStack, Pressable, Spacer, Text, VStack} from "@react-native-material/core";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import {useContext} from "react";
import NavigatorContext, {Page} from "../navigator/NavigatorProvider";
import AuthContext from "../auth/AuthContext";
import {StyleSheet} from "react-native";
import ProfileContext from "../profile/ProfileProvider";

export default function SideBarContent() {
    const {changePage} = useContext(NavigatorContext)
    const {profile} = useContext(ProfileContext)
    const {logout,} = useContext(AuthContext)
    return(
        <Flex fill style={sidebarStyle.page}>
            <VStack style={sidebarStyle.mainVStack}>
                <HStack>
                    <MaterialCommunityIcons name="account-circle-outline" size={120} color='#7a44cf' style={{marginLeft:5}}/>
                    <VStack>
                        <Text>Name: </Text>
                        <HStack style={{marginLeft: 10}}>
                            <Text>{profile?.lastName} </Text>
                            <Text>{profile?.firstName}</Text>
                        </HStack>
                    </VStack>
                </HStack>
                <Pressable onPress={() => {
                    changePage(Page.PROFILE)
                }}>
                    <Text>Change profile</Text>
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