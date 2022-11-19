import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon, Input, Text, Switch, Avatar } from "@rneui/themed";
import { useEventsQuery } from "../../generated/types";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import MapView, { Circle, MAP_TYPES, Marker, PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MapStackParamList } from "../../stacks/MapStack";
import EventMarker from "../../components/Markers/EventMarker";
import PlacesList from "../../components/Lists/PlacesList";
import { useAuth } from "../../context/AuthContext";
import { useIssues } from "../../services/mapService";
import { Issue } from "../../models/map";
import IssueOverlay from "./IssueOverlay";

export type EventListScreenProps = NativeStackScreenProps<MapStackParamList, 'MapSearch'>;

const MapSearchScreen: React.FC<EventListScreenProps> = ({ navigation }) => {
    const { logout } = useAuth()
    const mapViewRef = React.useRef<MapView>(null);

    const [openMenu, setOpenMenu] = React.useState(false)
    const [openIssue, setOpenIssue] = React.useState<Issue>();

    const { data: issues } = useIssues()

    console.log(issues)

    const [region, setRegion] = React.useState({
        latitude: 48.111356,
        longitude: 11.614302,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
    })
    
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
                   urlTemplate="http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg"
                   maximumZ={100}
                   style={{ zIndex: -1 }}
               />
               <Circle
                    center={{ latitude: 41.902177, longitude: 12.498836}}
                    radius={100}
                    fillColor='rgba(1, 128, 128, 0.2)'
                    strokeColor={"red"}
                    
                />
                {issues && issues.map((issue: Issue) => (
                    <Marker
                        key={issue.id}
                        coordinate={{ latitude: issue.latitude, longitude: issue.longitude}}
                        title={"aaa"}
                        description={"test"}
                        onPress={() => setOpenIssue(issue)}
                    />
                ))}
            </MapView>

            {/* Topbar - Search results */}
            <View pointerEvents='box-none' style={styles.overlay}>
                <View style={{ display: "flex", flex: 1 }} />

                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", padding: 10 }}>
                    <Icon name="add-circle" size={50} onPress={logout} />
                    <View>
                        {openMenu && (
                            <>
                                <Avatar source={require('../../../assets/icons/pirate.png')} size={50} rounded/>
                                <Icon name="add-circle" size={50} onPress={() => navigation.navigate("MyProfile")} />
                            </>
                        )}
                        <Icon name="add-circle" size={50} onPress={() => setOpenMenu(!openMenu)} />
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


/*
<View style={styles.searchBarView}>
                    <View style={{ flex: 5, flexDirection: "row" }}>
                        {openPlacesList && (
                            <View style={{ justifyContent: "center", width: 40 }}>
                                <Icon
                                    name={openPlacesList?'chevron-left':'search'}
                                    size={30}
                                    color='black'
                                    onPress={() => {
                                        inputRef.current?.blur()
                                        setOpenPlacesList(false)
                                    }}
                                />
                            </View>
                        )}
                        <View style={{ flex: 1 }}>
                            <Input
                                placeholder="Search"
                                inputStyle={{ paddingLeft: 0 }}
                                leftIcon={
                                    <Icon
                                        name={'search'}
                                        size={30}
                                        color='black'
                                        onPress={() => {
                                            inputRef.current?.blur()
                                            setOpenPlacesList(false)
                                        }}
                                        style={{ paddingLeft: 8 }}
                                    />
                                }
                            />
                        </View>
                        <View style={{ paddingHorizontal: 10, justifyContent: "center" }}>
                            <Text style={{ textAlign: "center" }}>in</Text>
                        </View>
                    </View>
                    <View style={{ flex: 6 }}>
                        <Input
                            ref={inputRef}
                            placeholder="Place"
                            value={placeSearch}
                            onChangeText={setPlaceSearch}
                            onFocus={() => setOpenPlacesList(true)}
                            inputStyle={{ paddingLeft: 0 }}
                            leftIcon={
                                <Icon
                                    name={'map'}
                                    size={30}
                                    color='black'
                                    onPress={() => {
                                        inputRef.current?.blur()
                                        setOpenPlacesList(false)
                                    }}
                                    style={{ paddingLeft: 8 }}
                                />
                            }
                        />
                    </View>
                </View>

*/