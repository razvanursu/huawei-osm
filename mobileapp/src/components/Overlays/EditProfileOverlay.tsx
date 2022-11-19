import { Avatar, Button, Icon, Overlay, Text } from "@rneui/themed";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { launchCamera } from 'react-native-image-picker';
import { FullProfileFragment, MyProfileDocument, ProfileUpdateInput, useUpdateProfileMutation } from "../../generated/types";
import { generateRNFile } from "../../utils/utils";
import Input from "../forms/Input"


interface EditProfileOverlayProps {
    profile: FullProfileFragment,
    visible: boolean
    onClose: () => void
}

const EditProfileOverlay: React.FC<EditProfileOverlayProps> = ({
    profile,
    visible,
    onClose
}) => {

    const [profilePicture, setProfilePicture] = React.useState<string>()

    const [updateUserMutation] = useUpdateProfileMutation({
        refetchQueries: [
          {query: MyProfileDocument},
        ],
        onCompleted: (data) => {
            onClose()
        },
        onError: (error) => console.log(error),
      })

    const { ...methods } = useForm<ProfileUpdateInput>();

    const [formError, setError] = React.useState<Boolean>(false)
    
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
            <FormProvider {...methods}>
                <View style={{ flexWrap: "wrap", flexDirection: "row", marginBottom: 10 }}>
                    <View style={{ justifyContent: "center", paddingRight: 8 }}>
                        <Icon
                            name="close"
                            size={35}
                            onPress={onClose}
                        />
                    </View>
                    <Text h3>
                        Edit Profile
                    </Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <Avatar
                        size={100}
                        rounded
                        source={{ uri: profilePicture || profile.profilePicture || "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
                    />
                    <Button title="edit" onPress={async () => {
                        const result = await launchCamera({
                            mediaType: "photo"
                        });
                        setProfilePicture(result.assets?.[0]?.uri)
                    }} />
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Input
                        name="name"
                        placeholder="Name"
                        defaultValue={profile.name}
                        rules={{
                            required: 'Name is required!',
                        }}
                        setFormError={setError}
                    />
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Input
                        name="username"
                        placeholder="Username"
                        defaultValue={profile.username}
                        rules={{
                            required: 'Username is required!',
                        }}
                        setFormError={setError}
                    />
                </View>

                <View style={{ marginBottom: 25 }}>
                    <Input
                        name="bio"
                        placeholder="Bio"
                        defaultValue={profile.bio || ""}
                        setFormError={setError}
                    />
                </View>
                <Button
                    title="Update profile"
                    onPress={methods.handleSubmit((data) => {
                        let file
                        if(profilePicture){
                            file = generateRNFile(profilePicture, `profile-picture-${profile.id}.jpg`);
                        }
                        console.log(file)
                        updateUserMutation({
                            variables: {
                                profile: data,
                                file: file
                            }
                        })
                    })}
                />
            </FormProvider>
        </Overlay>
    )
}

export default EditProfileOverlay