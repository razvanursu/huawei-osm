import { Button, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { ParticipationFragment } from "../../generated/types";

interface ParticipationCardProps {
    participation?: ParticipationFragment | null
    onPress: () => void
}

const ParticipationCard: React.FC<ParticipationCardProps> = ({ participation, onPress }) => {
    
    if(participation && participation.isInvitationPending)
        return (
            <View style={{ backgroundColor: "#b5cef5", borderRadius: 10, padding: 10, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <Text>
                        You have been invited to this event
                    </Text>
                    {participation.title && (
                        <Text>
                            as <Text style={{ fontWeight: "bold" }}>{participation.title}</Text>
                        </Text>
                    )}
                    {participation.isAdmin && (
                        <Text>
                            as <Text style={{ fontWeight: "bold" }}>ADMIN</Text>
                        </Text>
                    )}
                </View>
                <View style={{ justifyContent: "center" }}>
                    <Button size="sm" title="Accept" onPress={onPress} />
                </View>
            </View>
        )

    else if(participation && !participation.isInvitationPending)
        return (
            <View style={{ backgroundColor: "#b5cef5", borderRadius: 10, padding: 10, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <Text>
                        You already joined this event
                    </Text>
                    {participation.title && (
                        <Text>
                            as <Text style={{ fontWeight: "bold" }}>{participation.title}</Text>
                        </Text>
                    )}
                    {participation.isAdmin && (
                        <Text>
                            as <Text style={{ fontWeight: "bold" }}>ADMIN</Text>
                        </Text>
                    )}
                </View>
            </View>
        )
    
    return (
        <View style={{ backgroundColor: "#b5cef5", borderRadius: 10, padding: 10, flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text>
                    Join the event
                </Text>
            </View>
            <View style={{ justifyContent: "center" }}>
                <Button size="sm" title="Join" onPress={onPress} />
            </View>
        </View>
    )
}

export default ParticipationCard