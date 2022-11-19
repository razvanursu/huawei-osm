import React, { useState } from "react"
import { Avatar, Button, Input } from "@rneui/themed"
import { View } from "react-native"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUserProfile, UserServiceKeys } from "../../services/userService"
import { MyProfileStackParamList } from "../../stacks/MyProfileStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Profile } from "../../models/user"

export type EditProfileScreenProps = NativeStackScreenProps<MyProfileStackParamList, 'EditProfile'>;


const EditProfileScreen: React.FC<EditProfileScreenProps> = (props) => {
    const profile = props.route.params?.profile
    const queryClient = useQueryClient()

    const [name, setName] = useState(profile?.name || "")
    const [username, setUsername] = useState(profile?.username || "")
    const [bio, setBio] = useState(profile?.bio || "")

    const saveProfileMutation = useMutation(updateUserProfile, {
        onSuccess: (data) => {
            queryClient.setQueryData(UserServiceKeys.profile("me"), data)
            props.navigation.goBack()
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const onSaveProfile = () => {
        const updatedProfile = new Profile()
        updatedProfile.name = name
        updatedProfile.username = username
        updatedProfile.bio = bio

        saveProfileMutation.mutate({ userID: "me", profile: updatedProfile })
    }

    return (
        <View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 50 }}>
                <Avatar
                    size={150}
                    rounded
                    source={{ uri: "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
                />
            </View>

            <View style={{ paddingHorizontal: 20, marginVertical: 1 }}>
                <Input
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={{ paddingHorizontal: 20, marginVertical: 1 }}>
                <Input
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            <View style={{ paddingHorizontal: 20, marginVertical: 1 }}>
                <Input
                    placeholder="Bio"
                    value={bio}
                    onChangeText={setBio}
                />
            </View>

            <View style={{ paddingHorizontal: 20, marginVertical: 5 }}>
                <Button title="Save" color={"grey1"} onPress={onSaveProfile} />
            </View>
        </View>
    )
}

export default EditProfileScreen