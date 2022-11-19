import { Avatar, Button, Icon, Overlay, Text } from "@rneui/themed"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { View } from "react-native"
import { Issue } from "../../models/map"
import { MapServiceKeys, solveIssue } from "../../services/mapService"
import IssueSolvedOverlay from "./IssueSolvedOverlay"

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
    const [openSolvedOverlay, setOpenSolvedOverlay] = React.useState(false)
    const queryClient = useQueryClient()

    React.useMemo(async () => {
        try{
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${issue.latitude}&lon=${issue.longitude}&format=json`)
            const json = await res.json()
            setAddress(json.display_name)
        }
        catch(e) {
            console.log(e)
        }
    }, [issue.latitude, issue.longitude])

    const { mutate: solveIssueMutation } = useMutation({
      mutationFn: solveIssue,
      onSuccess: async (data: any) => {
        // Invalidate and refetch
        console.log(data)
        queryClient.invalidateQueries({ queryKey: MapServiceKeys.issues() })
        onClose()
      },
      onError: (e: any) => {
        console.log(e)
      }
    })

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
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
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

            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
                <Text>
                    {address || "loading"}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Avatar
                        size={60}
                        source={require('../../../assets/icons/win.png')}
                    />
                </View>
                <Text h3 style={{ flex: 1 }}>
                    {issue.pointsValue} pts
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Avatar
                        size={60}
                        source={require('../../../assets/icons/distance.png')}
                    />
                </View>
                <Text h3 style={{ flex: 1 }}>
                    {issue.xpValue} m
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 50 }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Avatar
                        size={60}
                        source={require('../../../assets/icons/level.png')}
                    />
                </View>
                <Text h3 style={{ flex: 1 }}>
                    {issue.xpValue} XP
                </Text>
            </View>

            <View style={{ paddingHorizontal: 50 }}>
                <Button
                    title="Solve"
                    onPress={() => setOpenSolvedOverlay(true)} //solveIssueMutation(issue.id)}
                />
            </View>

            {openSolvedOverlay && (
                <IssueSolvedOverlay
                    visible={openSolvedOverlay}
                    onClose={() => {
                        setOpenSolvedOverlay(false)
                        onClose()
                    }}
                />
            )}
                
        </Overlay>
    )
}

export default IssueOverlay