import {MaterialCommunityIcons} from "@expo/vector-icons";
import SwitchSelector from "react-native-switch-selector/types";
import React from "react";

interface IconProps {
    name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
    size: number
}
function MyIcon(props: IconProps) {
    return <MaterialCommunityIcons name={props.name} size={props.size} color={'#7a44cf'}/>
}

export default MyIcon