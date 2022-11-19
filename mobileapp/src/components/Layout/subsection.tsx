import { Divider, Text } from "@rneui/themed";
import React from "react";
import { View, ViewProps } from "react-native";

interface SubsectionProps extends ViewProps {
    showBorder?: boolean
    children: React.ReactNode
    title?: string
}

const Subsection: React.FC<SubsectionProps> = ({ showBorder = false, title, children, ...props }) => {

    return (
        <View
            {...props}
        >
            {title && (
                <View style={{ marginBottom: 10, marginTop: 5 }}>
                    <Text h3 style={{ textAlign: "center" }}>{title}</Text>
                </View>
            )}
            {children}
            {showBorder && <Divider style={{ marginTop: 10 }} />}
        </View>
    )
}

export default Subsection