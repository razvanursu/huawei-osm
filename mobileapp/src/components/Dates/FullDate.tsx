import { Icon, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import moment from 'moment';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface FullDateProps {
    startDate: Date
    endDate: Date
}

const FullDate: React.FC<FullDateProps> = ({ startDate, endDate }) => {
    const momentStartDate = moment(new Date(startDate))
    const momentEndDate = moment(new Date(endDate))

    return (
        <View style={{ flexDirection: "row", paddingVertical: 5 }}>
            <View style={{ justifyContent: "center", paddingHorizontal: 10 }}>
                <Icon name="calendar-today" />
            </View>
            <View>
                <Text style={{ fontWeight: "bold" }}>
                    {momentStartDate.format("MMMM DD, YYYY")}
                </Text>
                <Text>
                    {momentStartDate.format("dddd HH:mm")}
                </Text>
            </View>
            <View style={{ width: 50, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>-</Text>
            </View>
            <View style={{ justifyContent: "center" }}>
                <Text style={{ fontWeight: "bold" }}>
                    {momentEndDate.format("MMMM DD, YYYY")}
                </Text>
                <Text>
                    {momentEndDate.format("dddd HH:mm")}
                </Text>
            </View>
        </View>
    )
}


export const dateDiff = (startDate: Date, endDate: Date) => {
    const momentStartDate = moment(new Date(startDate))
    const momentEndDate = moment(new Date(endDate))

    return momentEndDate.diff(momentStartDate, "m")
}

export default FullDate