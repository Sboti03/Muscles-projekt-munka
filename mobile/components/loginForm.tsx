import React, {useContext} from "react";
import {Button, Text} from "@react-native-material/core";
import {loginStyles} from "./loginStyles";
import NavigatorContext, {Page} from "./navigator/NavigatorProvider";

export default function LoginForm() {
   const {changePage} = useContext(NavigatorContext)

   return<>
      <Text>Login Page</Text>
      <Button title={'HomePage'} style={loginStyles.loginButton}
      onPress={() => {
         changePage(Page.HOME)
      }}/>
   </>
}
