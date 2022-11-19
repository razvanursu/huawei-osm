import React from "react";
import { Button, Card, Icon, Text } from "@rneui/themed";
import { EventTicketTemplateFragment } from "../../generated/types";
import { View } from "react-native";

interface TicketTemplateEntryCardProps {
    ticketTemplate: EventTicketTemplateFragment
    onPress: () => void
}

const TicketTemplateEntryCard: React.FC<TicketTemplateEntryCardProps> = ({
    ticketTemplate,
    onPress
}) => {

    return (
        <View style={{ display: "flex", backgroundColor: "white", padding: 5, marginBottom: 5, borderRadius: 10 }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ marginRight: 10, justifyContent: "center" }}>
                    <Icon
                        name="money"
                    />
                </View>
                <View style={{ justifyContent: "center", marginRight: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>{ticketTemplate.name}</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                    <Text style={{ color: "grey0" }}>€ {ticketTemplate.price}</Text>
                </View>
                <View style={{ flex: 1 }} />
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text>
                    {ticketTemplate.description}
                </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 1 }} >
                    <Text>
                        Ticket available {10}
                    </Text>
                </View>   
                <Button title="Buy" size="sm" buttonStyle={{ paddingHorizontal: 20 }} onPress={onPress} />
            </View>
        </View>
    )
}

export default TicketTemplateEntryCard

/*

                <View style={{ justifyContent: "center" }}>
                    <Icon name="add-circle" onPress={onBuy} />
                </View>
                */