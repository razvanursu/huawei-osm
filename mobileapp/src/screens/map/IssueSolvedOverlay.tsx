import { Button, Overlay, Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"

interface IssueSolvedOverlayProps {
    visible: boolean
    onClose: () => void
}

const IssueSolvedOverlay: React.FC<IssueSolvedOverlayProps> = ({
    visible,
    onClose
}) => {

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={onClose}
            overlayStyle={{
                borderRadius: 20,
                marginHorizontal: 10
            }}
        >
            <View style={{ justifyContent: "center", marginBottom: 10 }}>
                <Text h2 style={{ textAlign: "center" }}>You did it!</Text>
            </View>


            <Text h4 style={{ marginBottom: 10 }}>And you got some experience</Text>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 10, marginBottom: 20 }}>
                    <View style={{ borderRadius: 10, borderWidth: 1, borderColor: "grey0", height: 30, width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ left: 0, top: 0, position: "absolute", borderBottomLeftRadius: 8, borderTopLeftRadius: 8, zIndex: -1, backgroundColor: "green", width: "30%", height: "100%" }} />
                        <Text h4>
                            100 / 1000 XP
                        </Text>
                    </View>
                </View>
            </View>

            <Text h4 style={{ marginBottom: 10 }}>And also some points</Text>

            <View style={{ justifyContent: "center", marginBottom: 10 }}>
                <Text h3 style={{ textAlign: "center" }}>+ 560 pts</Text>
            </View>

            <View style={{ paddingHorizontal: 50 }}>
                <Button
                    title="Solve"
                    onPress={() => onClose}
                />
            </View>
                
        </Overlay>
    )
}

export default IssueSolvedOverlay