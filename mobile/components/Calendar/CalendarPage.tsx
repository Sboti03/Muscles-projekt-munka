import * as React from "react";
import {Fragment, useContext} from "react";
import {Calendar} from "react-native-calendars";
import NavigatorContext, {Page} from "../navigator/NavigatorProvider";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {IconButton} from "@react-native-material/core";
import MealHistoryContext from "../mealHistory/mealHistoryContext";

export default function CalendarPage() {
    const {changePage} = useContext(NavigatorContext)
    const {date, setDate} = useContext(MealHistoryContext)
    return (
        <Fragment>
            <IconButton onPress={() =>changePage(Page.HOME)}
                        icon={<MaterialCommunityIcons name={'arrow-left-bold-outline'} size={30} color={'#7a44cf'} />}
                        style={{marginLeft:5, marginTop: 30}}/>
            <Calendar firstDay={1}
                      initialDate={date.toISOString()}
                      hideExtraDays={true}
                      renderArrow={(direction) => {
                            return <MaterialCommunityIcons name={'arrow-left-bold-outline'} size={30} color={'#7a44cf'} />
                      }}
                      style={{
                          height: 500,
                          borderColor: '#7a44cf',
                          borderWidth: 1,
                          marginTop: 40,
                      }}
                      theme={{
                          calendarBackground: '#ddcdfd',
                          todayTextColor: '#7a44cf',
                      }}
                      enableSwipeMonths={true}
                      onDayPress={(day) => {
                          console.log(day)
                          setDate(new Date(day.dateString))
                          changePage(Page.HOME)
                      }}
            />
        </Fragment>
    )
}