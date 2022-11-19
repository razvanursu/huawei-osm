import { Button, CheckBox, Overlay, Text } from "@rneui/themed";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { FullEventParticipantFragment } from "../../generated/types";
import Input from "../forms/Input"

interface InviteFormOverlayProps {
    onSubmit: ({ title, isAdmin }: { title?: string, isAdmin?: boolean }) => void
    participant?: FullEventParticipantFragment
    visible: boolean
    onClose: () => void
}

const InviteFormOverlay: React.FC<InviteFormOverlayProps> = ({
    onSubmit,
    participant,
    visible,
    onClose
}) => {
    const { ...methods } = useForm<FullEventParticipantFragment>({
        defaultValues: {
            title: participant?.title,
            isAdmin: participant?.isAdmin
        }
    });
    const [formError, setError] = React.useState<Boolean>(false)

    React.useEffect(() => {
        methods.setValue("title", participant?.title || "")
    }, [participant?.title])

    React.useEffect(() => {
        methods.setValue("isAdmin", participant?.isAdmin || false)
    }, [participant?.isAdmin])
    
    return (
        <Overlay isVisible={visible} onBackdropPress={onClose} overlayStyle={{ borderRadius: 10 }}>
            <FormProvider {...methods}>
                <View style={{ paddingHorizontal: 20, marginVertical: 1, minWidth: 300 }}>
                    <Input
                        name="title"
                        label="Title"
                        placeholder="Beer pong master"
                        setFormError={setError}
                    />
                </View>
                <View style={{ paddingHorizontal: 20, marginVertical: 1 }}>
                    <Controller
                        name="isAdmin"
                        control={methods.control}
                        render={({ field }) => (
                            <CheckBox
                                center
                                title='Make user admin'
                                onPress={(e) => field.onChange(!field.value)}
                                checked={field.value || false}
                            />
                        )}
                        />
                </View>
                <Button
                    title="Invite"
                    onPress={methods.handleSubmit((data) => {
                        onSubmit({ title: data.title || "", isAdmin: data.isAdmin || false })
                    })}
                />
            </FormProvider>
        </Overlay>
    )
}

export default InviteFormOverlay