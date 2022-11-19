import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon, Input } from "@rneui/themed";
import { useEventsQuery } from "../../generated/types";
import React from "react";
import { Button, Pressable, StyleSheet, View } from "react-native";
import { HomeStackParamList } from "../../stacks/HomeStack";
import EventsList from "../../components/Lists/EventsList";

export type EventListScreenProps = NativeStackScreenProps<HomeStackParamList, 'EventList'>;

const EventListScreen: React.FC<EventListScreenProps> = ({ navigation }) => {
    const [search, setSearch] = React.useState("")
    const { data: events, loading, error } = useEventsQuery({ variables: {} })
    console.log("events", error)
    return (
        <View>
            <View style={styles.searchBarView}>
                <Input
                    placeholder="Search"
                    value={search}
                    onChangeText={setSearch}
                    inputStyle={{
                        paddingLeft: 0,
                        fontSize: 15
                    }}
                    inputContainerStyle={{
                        height: 35,
                    }}
                    containerStyle={{
                        height: 35,
                    }}
                    leftIcon={
                        <Icon
                            name='search'
                            size={20}
                            color='black'
                            style={{ paddingLeft: 8 }}
                        />
                    }
                />
            </View>
            {
                events && events["events"] && 
                    <EventsList
                        events={events["events"] || []}
                        goToEvent={(eventId: string) => navigation.push("Event", { eventId: eventId })}
                    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    searchBarView: {
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 8,
    }
});


export default EventListScreen;
