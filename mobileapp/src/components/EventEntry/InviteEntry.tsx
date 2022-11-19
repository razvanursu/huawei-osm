import { Icon, Text } from "@rneui/themed"
import React from "react"
import { Image, Pressable, View } from "react-native"
import { EventListEntryFragment, EventParticipantListEntryFragment } from "../../generated/types"

interface InviteEntryProps {
    invite: EventParticipantListEntryFragment
    onPress: () => void
    onAcceptInvite?: () => void
}

const InviteEntry: React.FC<InviteEntryProps> = ({ invite, onPress, onAcceptInvite }) => {
    const { event } = invite

    return (
        <Pressable key={event.id} onPress={onPress}>
            <View style={{ width: "100%", flexDirection: "row", paddingVertical: 5 }}>
                <View style={{ padding: 10 }}>
                    <Image
                        style={{ height: 50, width: 50, borderRadius: 100 }}
                        source={{ uri: event.poster || "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
                    />
                </View>
                <View style={{ justifyContent: "center", flex: 1, paddingRight: 50 }}>
                    <Text>
                        You have been invited to
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text h4 style={{ marginRight: 10 }}>
                            {event.name}
                        </Text>
                    </View>
                    
                    {invite.title && (
                        <Text numberOfLines={1}>
                            as {invite.title}
                        </Text>
                    )}
                </View>
                <Pressable style={{ justifyContent: "center", paddingHorizontal: 20 }} onPress={onAcceptInvite}>
                    <Icon name="check" />
                </Pressable>
            </View>
        </Pressable>
    )
}

export default InviteEntry