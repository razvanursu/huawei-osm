import { Avatar, Overlay, Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"
interface ShareOverlayProps {
    visible: boolean
    onClose: () => void
}

const AVATAR_SIZE = 50

const ShareOverlay: React.FC<ShareOverlayProps> = ({ visible, onClose }) => {
    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={onClose}
            animationType="slide"
            overlayStyle={{
                position: "absolute",
                left: 0,
                top: 500,
                bottom: 0,
                width: "100%",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }}
        >
            <View style={{ width: "100%", display: "flex", flexDirection: "row", marginBottom: 10 }}>
                <View style={{ flex: 1, marginBottom: 10 }}>
                    <Text h2 style={{ textAlign: "center" }}>
                        Share via
                    </Text>
                </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <Avatar
                    size={AVATAR_SIZE}
                    source={require('../../../assets/icons/facebook.png')}
                />
                <Avatar
                    size={AVATAR_SIZE}
                    source={require('../../../assets/icons/instagram.png')}
                />
                <Avatar
                    size={AVATAR_SIZE}
                    source={require('../../../assets/icons/twitter.png')}
                />
                <Avatar
                    size={AVATAR_SIZE}
                    source={require('../../../assets/icons/tiktok.png')}
                />

            </View>
        </Overlay>
    )
}

export default ShareOverlay