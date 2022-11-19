import { Icon, Image, Overlay, Text } from "@rneui/themed"
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

interface ReedemPointsOverlayProps {
    visible: boolean
    onClose: () => void
}

const ReedemPointsOverlay: React.FC<ReedemPointsOverlayProps> = ({ visible, onClose }) => {
    return (
        <Overlay
            fullScreen
            isVisible={visible}
            onBackdropPress={onClose}
        >
            <View style={{ width: "100%", display: "flex", flexDirection: "row", marginBottom: 10 }}>
                <View>
                    <Icon
                        name="close"
                        size={35}
                        onPress={onClose}
                        style={{ color: "primary" }}
                    />
                </View>
                <View style={{ flex: 1, marginBottom: 10 }}>
                    <Text h2 style={{ textAlign: "center" }}>
                        Your Prices
                    </Text>
                </View>
            </View>
            

            <View style={{ flexWrap: "wrap", flexDirection: "row", marginBottom: 10, justifyContent: "center" }}>
                {PRICES.map((price) => (
                    <View style={{ width: "100%", flexDirection: "row" }}>
                    <View style={{ padding: 10 }}>
                        <Image
                            style={{ height: 80, width: 80, borderRadius: 100 }}
                            source={price.image}
                        />
                    </View>
                    <View style={{ justifyContent: "center", flex: 1, paddingRight: 50 }}>
                        <Text h4 style={{ marginRight: 10 }}>
                            {price.name}
                        </Text>
                        
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text numberOfLines={1}>
                                {price.points} points
                            </Text>
                            <Text numberOfLines={1}>
                                
                            </Text>
                        </View>
                    </View>
                </View>
                ))}
                
            </View>
        </Overlay>
    )
}

export default ReedemPointsOverlay