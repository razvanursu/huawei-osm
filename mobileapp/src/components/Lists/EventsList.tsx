
import { Avatar, Text } from "@rneui/themed";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { EventListEntryFragment } from "../../generated/types";

export const EventListEntry: React.FC<{ event: EventListEntryFragment, onPress?: () => void }> = ({ event, onPress }) => {

    return (
        <Pressable key={event.id} onPress={onPress}>
            <View style={{ width: "100%", flexDirection: "row" }}>
                <View style={{ padding: 10 }}>
                    <Image
                        style={{ height: 60, width: 60, borderRadius: 100 }}
                        source={{ uri: event.poster || "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
                    />
                </View>
                <View style={{ justifyContent: "center", flex: 1, paddingRight: 50 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text h4 style={{ marginRight: 10 }}>
                            {event.name}
                        </Text>
                        <Text style={{ color: "grey0" }}>
                            #{event.hashtag}
                        </Text>
                    </View>
                    
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text numberOfLines={1}>
                            {new Date(event.startTime).toLocaleString('en-GB', { year: "numeric", month: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })}
                        </Text>
                        <Text numberOfLines={1}>
                            {new Date(event.startTime).toLocaleString('en-GB', { year: "numeric", month: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })}
                        </Text>
                    </View>
                    <Text numberOfLines={1}>
                        {event.address}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

interface EventsListProps {
    events: EventListEntryFragment[]
    goToEvent: (eventId: string) => void
}

const EventsList: React.FC<EventsListProps> = ({ events, goToEvent }) => (
    <View>
        {events.map((event) => (
            <EventListEntry
                key={event.id}
                event={event}
                onPress={() => goToEvent(event.id)}
            />)
        )}
    </View>
)

export default EventsList

const styles = StyleSheet.create({
    eventContainer: {
        flexDirection: "row"
    }
})
