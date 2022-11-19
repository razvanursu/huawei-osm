import { Image, LinearProgress, Text } from "@rneui/themed"
import React from "react"
import { Dimensions, ImageBackground, Pressable, StyleSheet, View } from "react-native"
import DeterminateLinearProgress from "./DeterminateLinearProgress"

interface FullScreenImageProps {
    progressDuration?: number
    header?: JSX.Element
    imageUrl: string
    onClickRight?: () => void
    onClickLeft?: () => void
}

const FullScreenImage: React.FC<FullScreenImageProps> = ({
    progressDuration,
    header,
    imageUrl,
    onClickLeft,
    onClickRight
}) => {

    return (
        <View style={{ flex: 1 }}>
            <View style={{ ...StyleSheet.absoluteFillObject }}>
                <Image
                    style={{ resizeMode: "cover", height: Dimensions.get("window").height }}
                    source={{ uri: imageUrl }}
                />
            </View>
            <View style={{ flex: 1 }}>
                {progressDuration && (
                    <DeterminateLinearProgress
                        duration={5000}
                        onEnd={onClickRight}
                    />
                )}
                {header}
                <View style={{ display: "flex", flexDirection: "row", flex: 1, height: "100%", width: "100%" }}>
                    <Pressable style={{ flex: 1 }} onPress={onClickLeft} />
                    <Pressable style={{ flex: 1 }} onPress={onClickRight} />
                </View>
            </View>
        </View>
    )
}

export default FullScreenImage