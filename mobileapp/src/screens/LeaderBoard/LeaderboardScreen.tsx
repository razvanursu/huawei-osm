import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Button } from "@rneui/themed";
import ReedemPointsOverlay from "./ReedemPointsOverlay";
import { MapStackParamList } from "../../stacks/MapStack";

export type MyEventsListScreenProps = NativeStackScreenProps<MapStackParamList, 'Leaderboard'>;

const LeaderboardScreen: React.FC<MyEventsListScreenProps> = ({ navigation }) => {
    const [openReedem, setOpenReedem] = React.useState(false)

    return (
        <View>

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <Button title="Share Leaderboard"/>
                <Button title="Reedem your points" onPress={() => setOpenReedem(true)}/>
            </View>

            
            <ReedemPointsOverlay
                visible={openReedem}
                onClose={() => setOpenReedem(false)}
            />

        </View>
    )
}

export default LeaderboardScreen;