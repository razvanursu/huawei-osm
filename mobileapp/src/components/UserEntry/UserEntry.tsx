import { Text } from "@rneui/base";
import { Avatar } from "@rneui/themed";
import React from "react"
import { Pressable, View } from "react-native"
import { ProfileListEntryFragment } from "../../generated/types";

interface UserEntryProps {
    profile: ProfileListEntryFragment
    action?: React.ReactNode
    onPress?: () => void
}

const UserEntry: React.FC<UserEntryProps> = ({ profile, action, onPress }) => {
    const { name, username, profilePicture } = profile
    return (
        <Pressable onPress={onPress} style={{ display: "flex", flexDirection: "row", backgroundColor: "white", padding: 5 }}>
            <View style={{ marginLeft: 10, marginRight: 10, justifyContent: "center" }}>
                <Avatar
                    size={50}
                    rounded
                    source={{ uri: profilePicture || "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
                />
            </View>
            <View style={{ justifyContent: "center" }}>
                <View style={{ justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold" }}>{name}</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                    <Text style={{ color: "grey0" }}>{username}</Text>
                </View>
            </View>
            <View style={{ flex: 1 }} />
            {action && (
                <View style={{ justifyContent: "center" }}>
                    {action}
                </View>
            )}
        </Pressable>
    )
}

export default UserEntry