import { Button, Divider, Text } from "@rneui/themed";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Subsection from "../../../components/Layout/subsection";
import MenuEntry from "../../../components/Pressables/MenuEntry";
import { EventDocument, EventsDocument, FullEventFragment, useDeleteEventMutation, useUpdateEventMutation } from "../../../generated/types";
import { EventOptionsScreenProps } from "../../../stacks/common/EventOptionScreens";
import withUserIsAdmin from "./SplashEventOptionsScreen";


//We assume the user already has permission here
const EventOptionsScreen: React.FC<EventOptionsScreenProps> = ({ event, navigation }) => {
    const [paypalEmail, setPaypalEmail] = React.useState(event.paypalUsername || "")

    React.useEffect(() => navigation.setOptions({title: event.name}), [navigation, event.name]);

    const [deleteEventMutation] = useDeleteEventMutation({
        refetchQueries: [
            {query: EventsDocument},
        ],
        onCompleted: () => navigation.navigate("EventList"),
        onError: (error) => console.log(error),
    })

    return (
        <View>
            <MenuEntry
                title="Edit Event"
                onPress={() => navigation.navigate("EditEvent", { eventId: event.id })}
            />
            <MenuEntry
                title="Payment methods"
                onPress={() => navigation.navigate("PaymentMethods", { eventId: event.id })}
            />
            <View>
                <Button
                    title="Delete event"
                    onPress={() => deleteEventMutation({ variables: { eventId: event.id }})}
                    style={{ backgroundColor: "red" }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    entry: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        display: "flex",
        alignContent: "center",
    }
})

export default withUserIsAdmin(EventOptionsScreen)