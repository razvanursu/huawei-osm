import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Button } from "@rneui/themed";
import { MapStackParamList } from "../../stacks/MapStack";
import ShareOverlay from "./ShareOverlay";

export type MyEventsListScreenProps = NativeStackScreenProps<MapStackParamList, 'Leaderboard'>;

const LeaderboardScreen: React.FC<MyEventsListScreenProps> = ({ navigation }) => {
    const [openShare, setOpenShare] = React.useState(false)

    return (
        <View>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <Button title="Share Leaderboard" onPress={() => setOpenShare(true)}/>
                <Button title="Reedem your points" onPress={() => navigation.navigate("Prices")}/>
            </View>

            <ShareOverlay
                visible={openShare}
                onClose={() => setOpenShare(false)}
            />
        </View>
    )
}

export default LeaderboardScreen;