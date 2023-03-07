import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Button, Text} from "@react-native-material/core";
import {useContext, useEffect} from "react";
import navigatorProvider, {Page} from "../navigator/NavigatorProvider";
import NavigatorContext from "../navigator/NavigatorProvider";
import { BASE_URL } from "@env"

function HomePage(){
   const {changePage} = useContext(NavigatorContext)
   useEffect(()=> {
      console.log(BASE_URL)
      console.log(process.env.NODE_ENV)
   }, [])
   return(
      <>
         <Text >{BASE_URL} almafa</Text>
         <Button title={'back to Login'} onPress={() => {
            changePage(Page.LOGIN)
         }}/>
      </>
   )
}
export default HomePage;
