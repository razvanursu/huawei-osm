import { Avatar, Icon, Image, Overlay, Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"

const WatchImage = require('../../../assets/prices/watch.png')
const FreebudsImage = require('../../../assets/prices/freebuds.png')
const GoogleImage = require('../../../assets/prices/google.png')

const PRICES = [
    {
        name: "Huawei Watch GT 3 46 mm",
        image: WatchImage,
        points: 1000000
    },
    {
        name: "Huawei Freebuds 4 Earphones",
        image: FreebudsImage,
        points: 800000
    },
    {
        name: "3 GB Google Storage",
        image: GoogleImage,
        points: 300000
    },
    {
        name: "MVG bikes - 100 minutes for free",
        image: FreebudsImage,
        points: 100000
    },
    {
        name: "Fake Smile",
        image: FreebudsImage,
        points: 100000
    }
]

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
                top: 600,
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