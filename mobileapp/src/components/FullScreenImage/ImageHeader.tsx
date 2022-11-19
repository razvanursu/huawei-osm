import { Avatar, Text } from "@rneui/themed";
import React from "react";
import { Pressable, View } from "react-native";

interface ImageHeaderProps {
    avatarUrl?: string
    title: string
    onPress?: () => void
}

const ImageHeader: React.FC<ImageHeaderProps> = ({ avatarUrl, title, onPress }) => {

    return (
        <Pressable onPress={onPress} style={{ display: "flex", flexDirection: "row", padding: 5 }}>
            <View style={{ marginLeft: 10, marginRight: 10, justifyContent: "center" }}>
                <Avatar
                    size={50}
                    rounded
                    source={{ uri: avatarUrl || "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
                />
            </View>
            <View style={{ justifyContent: "center" }}>
                <Text h3 style={{ fontWeight: "bold", color: "white" }}>{title}</Text>
            </View>
        </Pressable>
    )
}

export default ImageHeader