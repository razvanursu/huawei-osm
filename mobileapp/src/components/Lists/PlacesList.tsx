import { Text } from "@rneui/base";
import React from "react";
import { View, FlatList, ViewProps, TouchableHighlight, Pressable } from "react-native";
import { Point } from "react-native-maps";

interface Place {
    description: string;
    placeId: string;
    geometry: { location: Point };
}

interface PlacesListProps {
    text: string;
    onPressRow: (description: string, latitude: number, longitude: number) => void
}

const PlacesList: React.FC<PlacesListProps> = ({ text, onPressRow }) => {
    const [places, setPlaces] = React.useState<Place[]>([])

    //https://developers.google.com/maps/documentation/places/web-service/autocomplete
    const fetchPlaces = async (input: string) => {
        return fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBBqm5PCwg3rjAG_I9vwXZ71-ftR3087yc&input=' + input)
                .then((response) => response.json())
                .then((json) => {
                    if(json.predictions){
                        setPlaces(json.predictions.map((prediction: any) => ({ 
                            description: prediction.description,
                            placeId: prediction.place_id
                         })))
                        //const { lat, lng } = json.results[0].geometry.location
                        //return { lat, lng }
                    }
                })
    }

    const fetchCoordinates = async (placeId: string) => {
        return fetch('https://maps.google.com/maps/api/geocode/json?key=AIzaSyBBqm5PCwg3rjAG_I9vwXZ71-ftR3087yc&place_id=' + placeId)
                .then((response) => response.json())
                .then((json) => {
                    if(json.results.length > 0){
                        const { lat, lng } = json.results[0].geometry.location
                        return { lat, lng }
                    }
                })
    }

    React.useEffect(() => {
        fetchPlaces(text)
    }, [text])

    return (
        <View style={{ backgroundColor: "white", borderRadius: 10 }}>
            <FlatList
                data={places}
                renderItem={({ item: place }) => (
                    <Pressable
                        onPress={(e) => 
                            fetchCoordinates(place.placeId).then((response) => {
                                onPressRow(place.description, response?.lat, response?.lng)
                            })
                        }
                    >
                        <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 0.2 }}>
                            <Text numberOfLines={1}>{place.description}</Text>
                        </View>
                    </Pressable>    
                )}
            />
        </View>
    )
}

export default PlacesList;

/*
<GooglePlacesAutocomplete
                    textInputProps={{
                        InputComp: Input
                      }}
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        const lat =  details?.geometry.location.lat
                        const lng =  details?.geometry.location.lng

                        lat && lng && mapViewRef.current?.animateToRegion({
                            latitude: lat,
                            longitude:  lng,
                            latitudeDelta: 0.0122,
                            longitudeDelta: 0.0121,
                        })
                    }}
                    fetchDetails
                    query={{
                        key: 'AIzaSyBBqm5PCwg3rjAG_I9vwXZ71-ftR3087yc',
                        language: 'en',
                    }}
                />
*/