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
    const address = React.useMemo(async () => {
        try{
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${issue.latitude}&lon=${issue.longitude}&format=json`, {
                headers: {
                    'User-Agent': 'ID of your APP/service/website/etc. v0.1'
                }
            })
            const json = await res.json()
            console.log(json)
            console.log(json.display_name)
            console.log(json.address)
            return json.address
        }
        catch(e) {
            console.log("here", e)
        }
    }, [issue.latitude, issue.longitude])

    console.log(address)

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={onClose}
            animationType="slide"
            fullScreen
            overlayStyle={{
                position: "absolute",
                left: 0,
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
                    source={{ uri: "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
                />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Text h3>
                    
                </Text>
            </View>
                
        </Overlay>
    )
}

export default IssueOverlay