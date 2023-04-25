import {Option, Select} from "@mui/joy";
import {RoleEnum} from "../../Types/Role";
import {DayPeriodName} from "../../DayInfo/DayPeriodInfo/DayPeriodInfoFetch";
import React, {useContext} from "react";
import ResultsContext from "../ResultsContext";
import AuthContext from "../../Auth/AuthContext";

export default function ResultsFilter() {

    const {filters, setFilters} = useContext(ResultsContext)
    const {user} = useContext(AuthContext)


    function changeAddedBy(value: RoleEnum | 'ALL' | null) {
        if (value) {
            setFilters({...filters, addedBy: value})
        }
    }

    function changeIsCompleted(value: boolean | 'ALL' | null) {
        if (value !== null) {
            setFilters({...filters, isCompleted: value})
        }
    }

    function changePeriodName(value: DayPeriodName | 'ALL' | null) {
        if (value !== null){
            setFilters({...filters, periodName: value})
        }
    }

    return (
        <div className="flex justify-center">
            <div className="grid md:gap-2 md:grid-cols-3 w-62 grid-cols-1">
                <div>
                    <div>Added by:</div>
                    <Select value={filters.addedBy} onChange={(e, value) => changeAddedBy(value)}>
                        <Option value={'ALL'}>ALL</Option>
                        <Option value={RoleEnum.COACH}>Coach</Option>
                        <Option
                            value={RoleEnum.USER}>{user?.role.roleName === RoleEnum.USER ? 'You' : 'Client'}</Option>
                    </Select>
                </div>
                <div>
                    <div>Completed:</div>
                    <Select value={filters.isCompleted} onChange={(e, value) => changeIsCompleted(value)}>
                        <Option value={'ALL'}>ALL</Option>
                        <Option value={true}>Completed</Option>
                        <Option value={false}>Not completed</Option>
                    </Select>
                </div>
                <div>
                    <div>Day period:</div>
                    <Select value={filters.periodName} onChange={(e, value) => changePeriodName(value)}>
                        <Option value={'ALL'}>ALL</Option>
                        <Option value={DayPeriodName.BREAKFAST}>Breakfast</Option>
                        <Option value={DayPeriodName.LUNCH}>Lunch</Option>
                        <Option value={DayPeriodName.DINNER}>Dinner</Option>
                        <Option value={DayPeriodName.OTHER}>Other</Option>
                    </Select>
                </div>
            </div>
        </div>
    )
}