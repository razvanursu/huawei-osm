import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MyInvitesDocument, useAcceptParticipationInviteMutation, useMyEventsQuery, useMyInvitesQuery } from "../../generated/types";
import React from "react";
import { View } from "react-native";
import { MyEventsStackParamList } from "../../stacks/MyEventsStack";
import Subsection from "../../components/Layout/subsection";
import InviteEntry from "../../components/EventEntry/InviteEntry";
import SelectTicketOverlay from "../../components/Overlays/SelectTicketOverlay";
import { EventListEntry } from "../../components/Lists/EventsList";

export type MyEventsListScreenProps = NativeStackScreenProps<MyEventsStackParamList, 'MyEventsList'>;

const MyEventsListScreen: React.FC<MyEventsListScreenProps> = ({ navigation }) => {
    const [eventId, setEventId] = React.useState("")
    const { data: pendingInvites, loading, error } = useMyInvitesQuery()
    const { data: myEvents } = useMyEventsQuery()

    const [acceptInviteMutation] = useAcceptParticipationInviteMutation({
        refetchQueries: [
            {query: MyInvitesDocument},
        ],
        onCompleted: (data) => {
            setEventId("")
            if("event" in data.acceptParticipationInvite)
                navigation.navigate("Event", { eventId: data.acceptParticipationInvite.event.id })
        },
        onError: (error) => console.log(error),
    })

    return (
        <View>
            <Subsection
                title={"Pending Invites"}
                showBorder
            >
                {
                    pendingInvites && pendingInvites.myEvents.map((invite) => (
                        <InviteEntry
                            key={invite.event.id}
                            invite={invite}
                            //onPress={() => navigation.push("Event", { eventID: invite.event.id })}
                            onPress={() => setEventId(invite.event.id)}
                        />
                    ))
                }
            </Subsection>
            <Subsection
                title={"My Events"}
                showBorder
            >
                {
                    myEvents && myEvents.myEvents.map((eventParticipant) => (
                        <EventListEntry
                            key={eventParticipant.event.id}
                            event={eventParticipant.event}
                        />
                    ))
                }
            </Subsection>

            {Boolean(eventId) && (
                <SelectTicketOverlay
                    visible={Boolean(eventId)}
                    onClose={() => setEventId("")}
                    eventId={eventId}
                    onBuyTicket={(input) => acceptInviteMutation({
                        variables: {
                            eventId,
                            input
                        }}
                    )}
                />
            )}

        </View>
    )
}

export default MyEventsListScreen;