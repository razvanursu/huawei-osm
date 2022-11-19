import { Button, Chip, Icon, Input, Overlay, Text } from "@rneui/themed";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { EventDocument, PendingInvitesDocument, useCreateEventParticipantMutation, usePendingInvitesQuery, useProfilesQuery } from "../../generated/types";
import UserEntry from "../UserEntry/UserEntry";
import InviteFormOverlay from "./InviteFormOverlay";

interface EventInvitesOverlayProps {
    eventId: string
    visible: boolean
    onClose: () => void
}

const EventInvitesOverlay: React.FC<EventInvitesOverlayProps> = ({
    eventId,
    visible,
    onClose
}) => {
    const [userId, setUserId] = React.useState("")
    const { data: users, loading, error } = useProfilesQuery({})

    const [createEventParticipantMutation] = useCreateEventParticipantMutation({
        refetchQueries: [
            {query: PendingInvitesDocument, variables: { eventId: eventId }},
        ],
        onCompleted: () => {
            setUserId("")
        },
        onError: (error) => console.log(error),
    })

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={onClose}
            overlayStyle={{
                position: "absolute",
                left: 0,
                bottom: 0,
                top: 100,
                width: "100%",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
        >
                <Text h2 style={{ marginBottom: 10 }}>
                    Invite Friends
                </Text>
                <Input
                    placeholder="Search"
                    containerStyle={{ marginBottom: 10 }}
                />
                <ScrollView style={{ marginBottom: 10 }}>
                    {users && users.profiles?.map((user) => (
                        <UserEntry
                            key={user.id}
                            profile={user}
                            action={<Icon name="add-circle" onPress={() => setUserId(user.id)} />}
                        />
                    ))}
                </ScrollView>
                <InviteFormOverlay
                    visible={Boolean(userId)}
                    onClose={() => setUserId("")}
                    onSubmit={(data) => userId && createEventParticipantMutation({
                        variables: {
                            input: {
                                ...data,
                                eventId: eventId,
                                participantId: userId
                            }
                        }
                    })}
                />
        </Overlay>
    )
}

export default EventInvitesOverlay

