import { Button, Overlay, Text } from "@rneui/themed";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import Input from "../forms/Input"
import { TicketTemplateInput } from "../../services/eventService";

type FormData = {
    name: string;
    price: number;
    description?: string;
};

interface CreateTicketOverlayProps {
    onSubmit: (data: TicketTemplateInput) => void
    visible: boolean
    onClose: () => void
}

const CreateTicketOverlay: React.FC<CreateTicketOverlayProps> = ({
    onSubmit,
    visible,
    onClose
}) => {
    const { ...methods } = useForm<TicketTemplateInput>();
    //const onSubmit = handleSubmit(data => console.log(data));

    const [formError, setError] = React.useState<Boolean>(false)
    
    return (
        <Overlay isVisible={visible} onBackdropPress={onClose}>
            <FormProvider {...methods}>
                <Text h2>
                    Add new ticket template
                </Text>
                <View style={{ paddingHorizontal: 20, marginVertical: 1 }}>
                    <Input
                        name="name"
                        label="Name"
                        placeholder="Ticket Name"
                        rules={{
                            required: 'Name is required!',
                        }}
                        setFormError={setError}
                    />
                </View>
                <View style={{ paddingHorizontal: 20, marginVertical: 1 }}>
                    <Input
                        name="price"
                        label="Price"
                        keyboardType="numeric"
                        placeholder="Ticket Price"
                        rules={{
                            required: 'Price is required!',
                        }}
                        setFormError={setError}
                    />
                </View>
                <Button
                    title="Create template"
                    onPress={methods.handleSubmit(onSubmit)}
                />
            </FormProvider>
        </Overlay>
    )
}

export default CreateTicketOverlay