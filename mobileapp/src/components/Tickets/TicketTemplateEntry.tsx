import React from "react";
import { Button, Card, Icon, Text } from "@rneui/themed";
import { EventTicketTemplateFragment } from "../../generated/types";
import { View } from "react-native";

interface TicketTemplateEntryProps {
    ticketTemplate: EventTicketTemplateFragment
    onDelete: (ticketTemplateId: string) => void
}

const TicketTemplateEntry: React.FC<TicketTemplateEntryProps> = ({
    ticketTemplate,
    onDelete
}) => {

    return (
        <View style={{ display: "flex", flexDirection: "row", backgroundColor: "white", padding: 5, marginBottom: 5, borderRadius: 10 }}>
            <View style={{ marginLeft: 10, marginRight: 10, justifyContent: "center" }}>
                <Icon
                    name="money"
                />
            </View>
            <View style={{ justifyContent: "center" }}>
                <View style={{ justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold" }}>{ticketTemplate.name}</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                    <Text style={{ color: "grey0" }}>€ {ticketTemplate.price}</Text>
                </View>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ justifyContent: "center" }}>
                <Icon name="add-circle" />
            </View>
        </View>
    )
}

export default TicketTemplateEntry