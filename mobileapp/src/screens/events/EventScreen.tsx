import { Avatar, Button, Icon, Image, Text } from "@rneui/themed";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import Subsection from "../../components/Layout/subsection";
import CreateTicketOverlay from "../../components/Overlays/CreateTicketTemplateOverlay";
import TicketTemplateEntry from "../../components/Tickets/TicketTemplateEntry";
import UserEntry from "../../components/UserEntry/UserEntry";
import { EventDocument, FullEventFragment, useCreateTicketTemplateMutation, useDeleteTicketTemplateMutation } from "../../generated/types";
import { SplashEventScreenProps } from "./SplashEventScreen";
import FullDate from "../../components/Dates/FullDate";
import EventInvitesOverlay from "../../components/Overlays/EventInvitesOverlay";
import SelectTicketOverlay from "../../components/Overlays/SelectTicketOverlay";
import ParticipationCard from "./ParticipationCard";
import withUserIsAdmin from "./eventOptions/SplashEventOptionsScreen";

interface EventScreenProps extends SplashEventScreenProps {
    event: FullEventFragment
}

const EventScreen: React.FC<EventScreenProps> = ({ event, navigation }) => {
    const [openTicketTemplateOverlay, setOpenTicketTemplateOverlay] = React.useState(false)
    const [openInvitesOverlay, setOpenInvitesOverlay] = React.useState(false)
    const [openSelectTicketOverlay, setOpenSelectTicketOverlay] = React.useState(false)

    const hasPermission = event.isAdmin

    React.useEffect(() => {
        hasPermission && navigation.setOptions({
          headerRight: () => (
            <Icon name="settings" onPress={() => navigation.push("EventOptions", { eventId: event.id })} />
          ),
        });

        navigation.setOptions({title: event.name})
    }, [navigation, event.name, hasPermission]);

    /*const [createTicketTemplateMutation] = useCreateTicketTemplateMutation({
        refetchQueries: [
            {query: EventDocument, variables: { eventId: event.id }},
        ],
        onCompleted: (data) => {
            const ticketTemplates = [...(event?.ticketTemplates) || [], data]
            setOpenTicketTemplateOverlay(false)
        },
        onError: (error) => console.log(error),
    })

    const [deleteTicketTemplateMutation] = useDeleteTicketTemplateMutation({
        refetchQueries: [
            {query: EventDocument, variables: { eventId: event.id }},
        ],
        onError: (error) => {
            console.log("error", error)
        }
    })*/

    return (
        <ScrollView>
            {/* Event Picture */}
            <Image
                style={{
                    height: 300,
                    flex: 1,
                }}
                source={{ uri: event?.poster || "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
            />
            <View style={{ marginHorizontal: 10 }} >
                <Subsection
                    showBorder
                    style={{ paddingVertical: 10, paddingHorizontal: 5 }}
                >
                    <Button
                        title="stories"
                        onPress={() => {
                            navigation.navigate("Stories", {
                                screen: "EventStories",
                                params: {
                                    eventId: event.id
                                }}
                            )}
                        }
                    />
                </Subsection>
                <Subsection
                    showBorder
                    style={{ paddingVertical: 10, paddingHorizontal: 5 }}
                >
                    <ParticipationCard
                        participation={event.participation}
                        onPress={() => setOpenSelectTicketOverlay(true)}
                    />
                </Subsection>
                <Subsection
                    showBorder
                    style={{ paddingVertical: 10, paddingHorizontal: 5 }}
                >
                    <FullDate
                        startDate={new Date(event.startTime)}
                        endDate={new Date(event.endTime)}
                    />
                    <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                        <View style={{ justifyContent: "center", paddingHorizontal: 10 }}>
                            <Icon name="location-pin" />
                        </View>
                        <View style={{ justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold" }}>
                                {event.address}
                            </Text>
                        </View>
                    </View>
                </Subsection>
                <Subsection showBorder>
                    <Text>
                        {event?.description}
                    </Text>
                </Subsection>
                <Subsection
                    showBorder
                >
                    <Pressable onPress={() => navigation.push("EventParticipants", { eventId: event.id, name: event.name, hasPermission: hasPermission })}>
                        <Text h4>{event.participants?.length} people are going</Text>
                        <View style={{ paddingVertical: 10, flexDirection: "row" }}>
                            {event.participants?.map(({ participant }) => (
                                <Avatar
                                    key={participant.id}
                                    containerStyle={{ marginRight: -8 }}
                                    size={40}
                                    rounded
                                    source={{ uri: participant.profilePicture || "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
                                />
                            ))}
                        </View>
                    </Pressable>
                </Subsection>
                <Subsection
                    showBorder
                    title={"Organizers"}
                >
                    <UserEntry
                        profile={event.organizer}
                    />
                </Subsection>
                {/*<Subsection
                    showBorder
                    title={"Tickets"}
                >
                    {event?.ticketTemplates.map((ticketTemplate) => (
                        <TicketTemplateEntry
                            key={ticketTemplate.id}
                            ticketTemplate={ticketTemplate}
                            onDelete={(ticketTemplateId: string) => deleteTicketTemplateMutation({ variables: { eventId: event.id, ticketTemplateId: ticketTemplateId }})}
                        />
                    ))}
                    {(event.isAdmin || event.isOrganizer) && (
                        <View style={{ paddingHorizontal: 50, paddingVertical: 20 }}>
                            <Button
                                title="Add Ticket Template"
                                onPress={() => setOpenTicketTemplateOverlay(true)}
                            />
                        </View>
                    )}
                </Subsection>*/}

                {/* Overlays */}
                {/*(event.isAdmin || event.isOrganizer) && (
                    <CreateTicketOverlay
                        visible={openTicketTemplateOverlay}
                        onClose={() => setOpenTicketTemplateOverlay(false)}
                        onSubmit={(data: TicketTemplateInput) => {
                            data.price = 10
                            createTicketTemplateMutation({ variables: { eventId: event?.id || "", input: data }})
                        }}
                    />
                )*/}
                <EventInvitesOverlay
                    eventId={event.id}
                    visible={openInvitesOverlay}
                    onClose={() => setOpenInvitesOverlay(false)}
                />

                {event && (
                    <SelectTicketOverlay
                        visible={openSelectTicketOverlay}
                        onClose={() => setOpenSelectTicketOverlay(false)}
                        eventId={event.id}
                        //onBuyTicket={(input) => {}}
                    />
                )}
            </View>


        </ScrollView>
    )

}

export default EventScreen