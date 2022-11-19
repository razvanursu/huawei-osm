import { Avatar, Icon, Overlay, Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"
import { Issue } from "../../models/map"

interface IssueOverlayProps {
    issue: Issue,
    visible: boolean
    onClose: () => void
}

const IssueOverlay: React.FC<IssueOverlayProps> = ({
    issue,
    visible,
    onClose
}) => {
    const [address, setAddress] = React.useState("")

    React.useMemo(async () => {
        try{
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${issue.latitude}&lon=${issue.longitude}&format=json`, {
                headers: {
                    'User-Agent': 'ID of your APP/service/website/etc. v0.1'
                }
            })
            const json = await res.json()
            console.log(json.display_name)
            setAddress(json.display_name)
        }
        catch(e) {
            console.log(e)
        }
    }, [issue.latitude, issue.longitude])

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={onClose}
            animationType="slide"
            overlayStyle={{
                position: "absolute",
                left: 0,
                top: 100,
                bottom: 0,
                width: "100%",
            }}
        >
            <View style={{ flexWrap: "wrap", flexDirection: "row", marginBottom: 10 }}>
                <View style={{ justifyContent: "center", paddingRight: 8 }}>
                    <Icon
                        name="close"
                        size={35}
                        onPress={onClose}
                    />
                </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Avatar
                    size={100}
                    rounded
                    source={require('../../../assets/icons/issue.png')}
                />
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Text>
                    {address || "loading"}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <Avatar
                    size={80}
                    source={require('../../../assets/icons/win.png')}
                    containerStyle={{ marginRight: 30 }}
                />
                <Text h3>
                    3000 pts
                </Text>
            </View>
                
        </Overlay>
    )
}

export default IssueOverlay