import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Avatar, Button, Icon, Image, Overlay, Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"
import { useMyProfile } from "../../services/userService"
import { MapStackParamList } from "../../stacks/MapStack"

const WatchImage = require('../../../assets/prices/watch.png')
const FreebudsImage = require('../../../assets/prices/freebuds.png')
const GoogleImage = require('../../../assets/prices/google.png')
const MVGImage = require('../../../assets/prices/mvg.png')
const TUMImage = require('../../../assets/prices/tum.png')

const PRICES = [
    {
        id: 1,
        name: "Huawei Watch GT 3 46 mm",
        image: WatchImage,
        points: 1000000
    },
    {
        id: 2,
        name: "Huawei Freebuds 4 Earphones",
        image: FreebudsImage,
        points: 800000
    },
    {
        id: 3,
        name: "3 GB Google Storage",
        image: GoogleImage,
        points: 300000
    },
    {
        id: 4,
        name: "MVG bikes - 100 minutes for free",
        image: MVGImage,
        points: 100000
    },
    {
        id: 5,
        name: "TUM merchandise",
        image: TUMImage,
        points: 50000
    }
]

type PricesScreenProps = NativeStackScreenProps<MapStackParamList, 'Prices'>;

const PricesScreen: React.FC<PricesScreenProps> = ({ navigation }) => {

    const { data: myProfile } = useMyProfile()

    React.useEffect(() => {
        myProfile && navigation.setOptions({
          headerRight: () => (
            <View
                style={{ display: "flex", flexDirection: "row", marginTop: 8 }}
            >
                <Text style={{ fontWeight: "bold", textAlign: "center", marginRight: 5, marginTop: 1 }}>
                    {myProfile.currentPoints} points
                </Text>
                <Avatar
                    size={20}
                    rounded
                    source={require('../../../assets/icons/dollar.png')}
                />
            </View>
          ),
        });

    }, [navigation, myProfile]);

    return (
        <View>
            <View style={{ flexWrap: "wrap", flexDirection: "row", marginBottom: 10, justifyContent: "center" }}>
                {PRICES.map((price) => (
                    <View key={price.id} style={{ width: "100%", flexDirection: "row" }}>
                        <View style={{ padding: 10 }}>
                            <Image
                                style={{ height: 65, width: 65, borderRadius: 100 }}
                                source={price.image}
                            />
                        </View>
                        <View style={{ justifyContent: "center", flex: 1, paddingRight: 50 }}>
                            <Text h4 style={{ marginRight: 10, marginBottom: 10 }}>
                                {price.name}
                            </Text>
                            
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text numberOfLines={1}>
                                    {price.points} points
                                </Text>
                                <Button title="obtain" buttonStyle={{ height: 30 }} titleStyle={{ fontSize: 10 }} disabled={!myProfile || myProfile.currentPoints < price.points} />
                            </View>
                        </View>
                    </View>
                ))}
                
            </View>
        </View>
    )
}

export default PricesScreen