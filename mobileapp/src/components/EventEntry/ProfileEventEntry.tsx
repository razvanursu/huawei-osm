import { Icon, Text } from "@rneui/themed"
import React from "react"
import { Image, Pressable, View } from "react-native"
import { EventParticipantListEntryFragment } from "../../generated/types"

interface ProfileEventEntryProps {
    eventParticipant: EventParticipantListEntryFragment
    onPress?: () => void
}

const ProfileEventEntry: React.FC<ProfileEventEntryProps> = ({ eventParticipant, onPress }) => {
    const { event } = eventParticipant

    return (
        <Pressable key={event.id} onPress={onPress}>
            <View style={{ width: "100%", flexDirection: "row", backgroundColor: "white", paddingVertical: 5 }}>
                <View style={{ padding: 10 }}>
                    <Image
                        style={{ height: 50, width: 50, borderRadius: 100 }}
                        source={{ uri: event.poster || "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
                    />
                </View>
                <View style={{ justifyContent: "center", flex: 1, paddingRight: 50 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text h4 style={{ marginRight: 10 }}>
                            {event.name}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text>
                            {event.hashtag}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default ProfileEventEntry