import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Chip, Icon, Input, Tab, TabView, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import EventInvitesOverlay from "../../components/Overlays/EventInvitesOverlay";
import InviteFormOverlay from "../../components/Overlays/InviteFormOverlay";
import UserEntry from "../../components/UserEntry/UserEntry";
import { EventDocument, EventParticipant, EventParticipantInput, FullEventParticipantFragment, ParticipantsDocument, PendingInvitesDocument, UpdateEventParticipantDocument, useParticipantsQuery, usePendingInvitesQuery, useRemoveEventParticipantMutation, useUpdateEventParticipantMutation } from "../../generated/types";
import { HomeStackParamList } from "../../stacks/HomeStack";

export type EventParticipantsScreenProps = NativeStackScreenProps<HomeStackParamList, 'EventParticipants'>;

const EventParticipantsScreen: React.FC<EventParticipantsScreenProps> = (props) => {
    const { eventId, name, hasPermission } = props.route.params
    const [openInvitesOverlay, setOpenInvitesOverlay] = React.useState(false)
    const [editingParticipant, setEditingParticipant] = React.useState<FullEventParticipantFragment>()

    React.useEffect(() => {
        hasPermission && props.navigation.setOptions({
          headerRight: () => (
            <Icon name="add-circle" onPress={() => setOpenInvitesOverlay(true)} />
          ),
        });

        props.navigation.setOptions({title: name})
    }, [props.navigation, name, hasPermission]);
    
    const { data: invites } = usePendingInvitesQuery({ variables: { eventId }})
    const { data: participants } = useParticipantsQuery({ variables: { eventId: eventId } })
    const [index, setIndex] = React.useState(0);


    const [updateEventParticipantMutation] = useUpdateEventParticipantMutation({
        refetchQueries: [
            {query: ParticipantsDocument, variables: { eventId: eventId }},
            {query: PendingInvitesDocument, variables: { eventId: eventId }},
        ],
        onCompleted: () => {
            setEditingParticipant(undefined)
        },
        onError: (error) => console.log(error),
    })

    const [removeEventParticipantMutation] = useRemoveEventParticipantMutation({
        refetchQueries: [
            {query: PendingInvitesDocument, variables: { eventId: eventId }},
            {query: ParticipantsDocument, variables: { eventId: eventId }},
        ],
        onError: (error) => console.log(error),
    })

    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'black',
                    height: 3,
                }}
            >
                <Tab.Item
                    title="Participants"
                    titleStyle={{ fontSize: 12, color: "black" }}
                    containerStyle={{ backgroundColor: "white" }}
                />
                <Tab.Item
                    title="Invited"
                    titleStyle={{ fontSize: 12, color: "black" }}
                    containerStyle={{ backgroundColor: "white" }}
                />
            </Tab>

            <TabView value={index} onChange={setIndex}>
                <TabView.Item style={{ width: '100%', height: "100%" }}>
                    <ScrollView>
                        {participants && participants.event?.participants?.map((eventParticipant) => {
                            const { participant: user, isAdmin, title } = eventParticipant
                            return (
                                <UserEntry
                                    key={user.id}
                                    profile={user}
                                    action={(
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            {isAdmin && (
                                                <Chip
                                                    title="Admin"
                                                    type="outline"
                                                    size="sm"
                                                    containerStyle={{ marginRight: 10 }}
                                                />
                                            )}
                                            {hasPermission && (
                                                <Icon
                                                    name="edit"
                                                    onPress={() => setEditingParticipant(eventParticipant)}
                                                />
                                            )}
                                            {hasPermission && (
                                                <Icon
                                                    name="delete"
                                                    onPress={() => removeEventParticipantMutation({ variables: {
                                                        id: {
                                                            eventId: eventId,
                                                            participantId: user.id
                                                        }
                                                    }})}
                                                />
                                            )}
                                        </View>
                                    )}
                                />
                            )}
                        )}
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <ScrollView>
                        {invites && invites.event?.participants?.map((eventParticipant) => {
                            const { participant: user, isAdmin, title } = eventParticipant
                            return (
                                <UserEntry
                                    key={user.id}
                                    profile={user}
                                    action={(
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            {isAdmin && (
                                                <Chip
                                                    title="Admin"
                                                    type="outline"
                                                    size="sm"
                                                    containerStyle={{ marginRight: 10 }}
                                                />
                                            )}
                                            {hasPermission && (
                                                <Icon
                                                    name="edit"
                                                    onPress={() => setEditingParticipant(eventParticipant)}
                                                />
                                            )}
                                            {hasPermission && (
                                                <Icon
                                                    name="delete"
                                                    onPress={() => removeEventParticipantMutation({ variables: {
                                                        id: {
                                                            eventId: eventId,
                                                            participantId: user.id
                                                        }
                                                    }})}
                                                />
                                            )}
                                        </View>
                                    )}
                                />
                            )}
                        )}
                    </ScrollView>
                </TabView.Item>
            </TabView>

            {hasPermission && (
                <EventInvitesOverlay
                    eventId={eventId}
                    visible={openInvitesOverlay}
                    onClose={() => setOpenInvitesOverlay(false)}
                />
            )}
            {hasPermission && (
                <InviteFormOverlay
                    visible={Boolean(editingParticipant)}
                    onClose={() => setEditingParticipant(undefined)}
                    participant={editingParticipant}
                    onSubmit={(data) => editingParticipant && updateEventParticipantMutation({
                        variables: {
                            input: {
                                ...data,
                                eventId: eventId,
                                participantId: editingParticipant.participant.id
                            }
                        }
                    })}
                />
            )}
        </>
    )
}

export default EventParticipantsScreen



/*
<Text h2>
                    Invite Friends
                </Text>
                <ScrollView style={{ maxHeight: 300, marginBottom: 10 }}>
                    {users && users.profiles.map((user) => (
                        <UserEntry
                            key={user.id}
                            profile={user}
                            action={<Icon name="add-circle" onPress={() => setUserId(user.id)} />}
                        />
                    ))}
                </ScrollView>
                <View>
                    <Text h3>
                        Pending Invites
                    </Text>
                </View>

                <ScrollView style={{ maxHeight: 300, marginBottom: 10 }}>
                    {invites?.eventParticipants && invites.eventParticipants.map(({ participant: user, isAdmin }) => (
                        <UserEntry
                            key={user.id}
                            profile={user}
                            action={(
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    {isAdmin && (
                                        <Chip
                                            title="Admin"
                                            type="outline"
                                            size="sm"
                                            containerStyle={{ marginRight: 10 }}
                                        />
                                    )}
                                    <Icon
                                        name="delete"
                                        onPress={() => removeParticipantMutation({ variables: {
                                            eventId: eventId,
                                            participantId: user.id
                                        }})}
                                    />
                                </View>
                            )}
                        />
                    ))}
                </ScrollView>
 */