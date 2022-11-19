import { Button } from "@rneui/base";
import { Text } from "@rneui/themed";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import ImageInput from "../../../components/forms/ImageInput";
import Input from "../../../components/forms/Input";
import { EventDocument, UpdateEventInput, useUpdateEventMutation } from "../../../generated/types";
import { EventOptionsScreenProps } from "../../../stacks/common/EventOptionScreens";
import { generateRNFile } from "../../../utils/utils";
import withUserIsAdmin from "./SplashEventOptionsScreen";


//We assume the user already has permission here
const EditEventScreen: React.FC<EventOptionsScreenProps> = ({ event, navigation }) => {
    const [paypalEmail, setPaypalEmail] = React.useState(event.paypalUsername || "")

    React.useEffect(() => navigation.setOptions({title: event.name}), [navigation, event.name]);

    const { ...methods } = useForm<UpdateEventInput & { poster?: string }>();

    const [updateEventMutation] = useUpdateEventMutation({
        refetchQueries: [
            {query: EventDocument, variables: { eventId: event.id }},
        ],
        onError: (error) => console.log(error),
    })

    const setError = () => {}

    return (
        <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
            <FormProvider {...methods}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <ImageInput
                        name="poster"
                        setFormError={setError}
                    />
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Input
                        name="name"
                        placeholder="Name"
                        defaultValue={event.name}
                        rules={{
                            required: 'Name is required!',
                        }}
                        setFormError={setError}
                    />
                </View>
                <View style={{ marginBottom: 25 }}>
                    <Input
                        name="description"
                        placeholder="Description"
                        defaultValue={event.description || ""}
                        setFormError={setError}
                    />
                </View>
                <Button
                    title="Update profile"
                    onPress={methods.handleSubmit((data) => {
                        let file, poster = methods.getValues().poster
                        if(poster){
                            file = generateRNFile(poster, `event-poster-${event.id}.jpg`);
                        }
                        console.log(file)
                        updateEventMutation({
                            variables: {
                                eventId: event.id,
                                file: file
                            }
                        })
                    })}
                />
            </FormProvider>
        </View>
    )
}

export default withUserIsAdmin(EditEventScreen)