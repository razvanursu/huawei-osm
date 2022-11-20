import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { MapStackParamList } from "../../stacks/MapStack";
import ShareOverlay from "./ShareOverlay";

export type MyEventsListScreenProps = NativeStackScreenProps<MapStackParamList, 'Leaderboard'>;

const LeaderboardScreen: React.FC<MyEventsListScreenProps> = ({ navigation }) => {
    const [openShare, setOpenShare] = React.useState(false)

    return (
        <View>

            <View style={{ marginTop: 10, marginBottom: 30, marginHorizontal: 5 }}>
                <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", flex: 1 }}>
                        #
                    </Text>
                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", flex: 2 }}>
                        Conquistador
                    </Text>
                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", flex: 1 }}>
                        Team
                    </Text>
                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", flex: 1 }}>
                        Points
                    </Text>
                </View>

                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ textAlign: "center", fontSize: 18, flex: 1 }}>
                        1
                    </Text>
                    <Text style={{ textAlign: "center", fontSize: 18, flex: 2 }}>
                        columbuzzz
                    </Text>
                    <Text style={{ textAlign: "center", fontSize: 18, flex: 1 }}>
                        Knight
                    </Text>
                    <Text style={{ textAlign: "center", fontSize: 18, flex: 1 }}>
                        10000
                    </Text>
                </View>

                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ textAlign: "center", fontSize: 18, flex: 1 }}>
                        2
                    </Text>
                    <Text style={{ textAlign: "center", fontSize: 18, flex: 2 }}>
                        bob2
                    </Text>
                    <Text style={{ textAlign: "center", fontSize: 18, flex: 1 }}>
                        Pirate
                    </Text>
                    <Text style={{ textAlign: "center", fontSize: 18, flex: 1 }}>
                        500
                    </Text>
                </View>
            </View>

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