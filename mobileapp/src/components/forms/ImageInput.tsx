import { Avatar, Button, Input, InputProps, Text, useTheme } from "@rneui/themed";
import React from "react";
import { useController, useFormContext, UseControllerProps } from 'react-hook-form';
import { View } from "react-native";
import { launchCamera } from "react-native-image-picker";
import { generateImageUrl } from "../../utils/utils";

interface ControlledInputProps extends InputProps, UseControllerProps {
    label?: string
    name: string
    defaultValue?: string
    setFormError: Function
}

//https://echobind.com/post/react-hook-form-for-react-native
const ControlledImageInput: React.FC<ControlledInputProps> = ({
    name,
    label,
    rules,
    defaultValue,
    ...props
}) => {
    const { theme } = useTheme();
    const { formState } = useFormContext()

    const { field } = useController({ name, rules, defaultValue });
    const hasError = Boolean(formState?.errors[name]);

    console.log(field.value)

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Avatar
                size={150}
                rounded
                source={{ uri: (field.value && generateImageUrl(field.value)) || "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
                onPress={async () => {
                    const result = await launchCamera({
                        mediaType: "photo"
                    });
                    console.log(result.assets?.[0]?.uri)
                    field.onChange(result.assets?.[0]?.uri)
                }}
            />
            <Button title="remove" onPress={async () => {
                console.log("here")
                field.onChange(undefined)
            }} />
        </View>
    )
}


const ControlledImageInputWrapper: React.FC<ControlledInputProps> = (props) => {
    const formContext = useFormContext();

    // Placeholder until input name is initialized
    if (!formContext || !props.name) {
        const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
            console.error(msg)
        props.setFormError(true)
        return null
    }

    return <ControlledImageInput {...props} />

}

export default ControlledImageInputWrapper