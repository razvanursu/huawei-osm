import React from "react"
import { FormProvider, SubmitErrorHandler, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"
import Subsection from "../../components/Layout/subsection"
import { useAuth } from "../../context/AuthContext"
import Input from "../../components/forms/Input"
import ImageInput from "../../components/forms/ImageInput"
import { EventCreationResponseFragment, useCreateEventMutation, useUpdateEventMutation } from "../../generated/types"
import { Avatar, Button, Overlay } from "@rneui/themed"
import { generateRNFile } from "../../utils/utils"

interface AddEventPosterProps {
    event: EventCreationResponseFragment
    visible: boolean
    onNextStep: () => void
}

type FormData = {
    poster?: string;
};

const AddEventPoster: React.FC<AddEventPosterProps> = ({ event, visible, onNextStep }) => {

    const { ...methods } = useForm<FormData>({
        mode: "onBlur"
    });
    
    const [updateEventMutation] = useUpdateEventMutation({
        onCompleted: (data) => {
            console.log(data)
            data.updateEvent?.__typename === "Event" && onNextStep()
        },
        onError: (error) => {
            console.log(error)
        }
    })

    
    return (
        <Overlay
            isVisible={visible}
            fullScreen
            onBackdropPress={onNextStep}
        >
            
            <FormProvider {...methods}>
                <ImageInput
                    name="poster"
                    setFormError={() => {}}
                />
                <Button
                    title="Save"
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
                <Button
                    title="Set picture later"
                    onPress={onNextStep}
                />
            </FormProvider>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15
    }
})

export default AddEventPoster