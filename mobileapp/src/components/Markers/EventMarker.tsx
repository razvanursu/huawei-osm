import { Image } from "@rneui/themed";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";
import { EventListEntryFragment, FullEventFragment } from "../../generated/types";

interface EventMarkerProps {
    event: EventListEntryFragment
    onPress: () => void
}

const EventMarker: React.FC<EventMarkerProps> = ({ event, onPress }) => {
    const [latitude, setLatitude] = React.useState<number>()
    const [longitude, setLongitude] = React.useState<number>()

    const [tracksViewChanges, setTracksViewChanges] = React.useState(true)

    const fetchCoordinates = async (address: string) => {
        return fetch('https://maps.google.com/maps/api/geocode/json?address=' + address + '&key=' + 'AIzaSyBBqm5PCwg3rjAG_I9vwXZ71-ftR3087yc')
                .then((response) => response.json())
                .then((json) => {
                    if(json.results.length > 0){
                        const { lat, lng } = json.results[0].geometry.location
                        setLatitude(lat)
                        setLongitude(lng)
                    }
                })
    }

    useEffect(() => {
        fetchCoordinates(event.address)
    }, [event.address])

    return latitude && longitude? (
        <Marker
            style={{ height: 80, width: 80, borderRadius: 100 }}
            coordinate={{
                latitude: latitude,
                longitude: longitude,
            }}
            title={'Test Marker'}
            description={'This is a description of the marker'}
            tracksViewChanges={tracksViewChanges}
            onPress={(e) => onPress()}
        >
            <View style={{ borderRadius: 25 }}>
                <Image
                    style={{ height: 80, width: 80, borderRadius: 100 }}
                    source={{ uri: "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
                    onLoad={() => setTracksViewChanges(false)}
                    fadeDuration={0}
                />
            </View>
        </Marker>
    ):
    <></>
}

export default EventMarker