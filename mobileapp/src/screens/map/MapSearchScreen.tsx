import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon, Input, Text, Switch, Avatar } from "@rneui/themed";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import MapView, { Callout, Circle, MAP_TYPES, Marker, PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MapStackParamList } from "../../stacks/MapStack";
import { useAuth } from "../../context/AuthContext";
import { useIssues } from "../../services/mapService";
import { Issue } from "../../models/map";
import IssueOverlay from "./IssueOverlay";
import { useMyProfile } from "../../services/userService";

const IssueFlag = require('../../../assets/icons/issue.png')
const PirateFlag = require('../../../assets/icons/coin.png')
const KnightFlag = require('../../../assets/icons/knight.png')

const CURRENT_POSITION = {
    latitude: 48.111356,
    longitude: 11.614302,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
}


export type EventListScreenProps = NativeStackScreenProps<MapStackParamList, 'MapSearch'>;

const MapSearchScreen: React.FC<EventListScreenProps> = ({ navigation }) => {
    const { logout } = useAuth()
    const mapViewRef = React.useRef<MapView>(null);

    const [openMenu, setOpenMenu] = React.useState(false)
    const [openIssue, setOpenIssue] = React.useState<Issue>();

    const { data: issues } = useIssues()
    const { data: myProfile } = useMyProfile()

    const [region, setRegion] = React.useState(CURRENT_POSITION)
    
    return (
        <View style={styles.container}>
            <MapView
                ref={mapViewRef}
                style={styles.map}
                initialRegion={region}
                onRegionChange={(region) => setRegion(region)}
                mapType={MAP_TYPES.NONE}
            >
                
                <UrlTile
                   urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   maximumZ={100}
                   style={{ zIndex: -1 }}
               />
                {issues && issues.slice(5).map((issue: Issue) => {
                    const icon = issue.owningGuild? (issue.owningGuild.id === 1? PirateFlag : KnightFlag) : IssueFlag
                    const color = issue.owningGuild? (issue.owningGuild.id === 1? 'rgba(212, 53, 53, 0.2)' : 'rgba(56, 53, 212, 0.2)') : ""

                    return (
                        <React.Fragment key={issue.id}>
                            <Marker
                                coordinate={{ latitude: issue.latitude, longitude: issue.longitude}}
                                onPress={() => setOpenIssue(issue)}
                                anchor={{ x: 0.5, y: 0.5 }}
                            >   
                                <View style={{ borderRadius: 25, borderWidth: 1 }}>
                                    <Avatar source={icon} size={50} containerStyle={{ backgroundColor: "white" }} rounded/>
                                </View>
                            </Marker>
                        
                            {issue.owningGuild && (
                                <Circle
                                    center={{ latitude: issue.latitude, longitude: issue.longitude}}
                                    radius={issue.circleRadius}
                                    fillColor={color}
                                />
                            )}
                        </React.Fragment>
                    )}
                )}
            </MapView>

            <View pointerEvents='box-none' style={styles.overlay}>

                {myProfile && (
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 5, backgroundColor: "white" }}>
                        <Pressable
                            style={{ display: "flex", flexDirection: "row" }}
                            onPress={() => navigation.navigate("Prices")}
                        >
                            <Text style={{ fontWeight: "bold", textAlign: "center", marginRight: 5, marginTop: 1 }}>
                                {myProfile.currentPoints} points
                            </Text>
                            <Avatar
                                size={20}
                                rounded
                                source={require('../../../assets/icons/dollar.png')}
                            />
                        </Pressable>
                        
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold", textAlign: "center", marginRight: 10 }}>
                                Level {myProfile.currentLevel}
                            </Text>
                            <View style={{ flexDirection: "row", width: 120 }}>
                                <View style={{ borderRadius: 10, borderWidth: 1, borderColor: "grey0", height: 15, width: "100%", justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ left: 0, top: 0, position: "absolute", borderBottomLeftRadius: 8, borderTopLeftRadius: 8, zIndex: -1, backgroundColor: "green", width: "30%", height: "100%" }} />
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                <View style={{ display: "flex", flex: 1 }} />

                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", padding: 10 }}>
                    <Avatar
                        size={50}
                        rounded
                        source={require('../../../assets/icons/my-location.png')}
                        onPress={() => mapViewRef.current?.animateToRegion(CURRENT_POSITION)}
                        containerStyle={{ backgroundColor: "white", borderWidth: 1 }}
                    />
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <Avatar
                            size={50}
                            rounded
                            source={require('../../../assets/icons/podium.png')}
                            containerStyle={{ backgroundColor: "white", marginRight: 10 }}
                            onPress={() => navigation.navigate("Leaderboard")}
                        />
                        <Avatar
                            size={50}
                            rounded
                            source={require('../../../assets/icons/man.png')}
                            containerStyle={{ backgroundColor: "white" }}
                            onPress={() => navigation.navigate("MyProfile")}
                        />
                    </View>
                </View>
            </View>

            {openIssue && (
                <IssueOverlay
                    issue={openIssue}
                    visible={Boolean(openIssue)}
                    onClose={() => setOpenIssue(undefined)}
                />
            )}
        </View>
    )
}

export default MapSearchScreen;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    overlay: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
    },
    searchOpen: {
        backgroundColor: "white",
        height: "100%"
    },
    searchBarView: {
        flexDirection: "row",
        paddingHorizontal: 5,
        paddingVertical: 5
    }
});