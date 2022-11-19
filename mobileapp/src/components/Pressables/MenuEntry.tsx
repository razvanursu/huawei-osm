import { Divider, Text } from "@rneui/themed"
import React from "react"
import { Pressable, StyleSheet } from "react-native"

interface MenuEntryProps {
    title: string
    onPress: () => void
}

const MenuEntry: React.FC<MenuEntryProps> = ({ title, onPress }) => (
    <>
        <Pressable
            style={styles.entry}
            onPress={onPress}
        >
            <Text h4>
                {title}
            </Text>
        </Pressable>
        <Divider />
    </>
)

const styles = StyleSheet.create({
    entry: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        display: "flex",
        alignContent: "center",
    }
})

export default MenuEntry