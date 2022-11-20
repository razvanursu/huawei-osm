import { Avatar, Button, Icon, LinearProgress, Overlay, Text } from "@rneui/themed"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { View } from "react-native"
import { launchCamera } from "react-native-image-picker";
import { dateDiff } from "../../components/Dates/FullDate"
import { Issue } from "../../models/map"
import { MapServiceKeys, solveIssue } from "../../services/mapService"
import { UserServiceKeys } from "../../services/userService";
import IssueSolvedOverlay from "./IssueSolvedOverlay"

const IssueFlag = require('../../../assets/icons/issue.png')
const PirateFlag = require('../../../assets/icons/coin.png')
const KnightFlag = require('../../../assets/icons/knight.png')

interface IssueOverlayProps {
    issue: Issue,
    visible: boolean
    onClose: () => void
}

const AVATAR_SIZE = 50

const IssueOverlay: React.FC<IssueOverlayProps> = ({
    issue,
    visible,
    onClose
}) => {
    const [address, setAddress] = React.useState("")
    const [openSolvedOverlay, setOpenSolvedOverlay] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
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
        setTimeout(() => {
            setLoading(false)
            queryClient.invalidateQueries({ queryKey: MapServiceKeys.issues() })
            queryClient.invalidateQueries({ queryKey: UserServiceKeys.myProfile() })
            setOpenSolvedOverlay(true)
        }, 1500)


      },
      onError: (e: any) => {
        console.log(e)
      }
    })

    const diff = issue.solvedDatetime?dateDiff(new Date(), issue.solvedDatetime):undefined

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={onClose}
            animationType="slide"
            overlayStyle={{
                position: "absolute",
                left: 0,
                top: 120,
                bottom: 0,
                width: "100%",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }}
        >
            {loading && <LinearProgress />}
            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
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
                    source={issue.owningGuild?(issue.owningGuild.id === 1?PirateFlag:KnightFlag):IssueFlag}
                />
            </View>

            {issue.solvedBy?.username && (
                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }} numberOfLines={1}>
                        Solved by {issue.solvedBy.username}
                    </Text>
                </View>
            )}

            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
                <Text style={{ fontSize: 20 }} numberOfLines={1}>
                    {address || "loading"}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Avatar
                        size={AVATAR_SIZE}
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
                        size={AVATAR_SIZE}
                        source={require('../../../assets/icons/distance.png')}
                    />
                </View>
                <Text h3 style={{ flex: 1 }}>
                    {issue.userDistance} m
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Avatar
                        size={AVATAR_SIZE}
                        source={require('../../../assets/icons/level.png')}
                    />
                </View>
                <Text h3 style={{ flex: 1 }}>
                    {issue.xpValue} XP
                </Text>
            </View>

            <View style={{ paddingHorizontal: 50, paddingBottom: 5 }}>
                <Button
                    title="Solve"
                    onPress={async () => {
                        await launchCamera({
                            mediaType: "photo"
                        });
                        setLoading(true)
                        solveIssueMutation(issue.id)
                    }}
                    disabled={loading || (diff !== undefined && diff < 30)}
                />
            </View>

            {(diff !== undefined && diff < 30) && (
                <Text style={{ textAlign: "center" }}>
                    You can't take another picture before 30 minutes
                </Text>
            )}

            {openSolvedOverlay && (
                <IssueSolvedOverlay
                    visible={openSolvedOverlay}
                    onClose={() => {
                        setOpenSolvedOverlay(false)
                        onClose()
                    }}
                    issue={issue}
                />
            )}
                
        </Overlay>
    )
}

export default IssueOverlay