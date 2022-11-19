import { Input, InputProps, Text, useTheme } from "@rneui/themed";
import React from "react";
import { useController, useFormContext, UseControllerProps } from 'react-hook-form';
import { View } from "react-native";

interface ControlledInputProps extends InputProps, UseControllerProps {
    label?: string
    name: string
    defaultValue?: string
    setFormError: Function
}

//https://echobind.com/post/react-hook-form-for-react-native
const ControlledInput: React.FC<ControlledInputProps> = ({
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

    return (
        <View>
            {label && (<Text h4 style={{ marginBottom: 5 }}>{label}</Text>)}
            <Input
                autoCapitalize="none"
                textAlign="left"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                {...props}
            />
            {hasError && (
                <View style={{ backgroundColor: theme.colors.error, marginBottom: 20 }}>
                    <Text>
                        {formState?.errors[name]?.message?.toString()}
                    </Text>
                </View>
            )}
        </View>
    )
}


const ControlledInputWrapper: React.FC<ControlledInputProps> = (props) => {
    const formContext = useFormContext();

    // Placeholder until input name is initialized
    if (!formContext || !props.name) {
        const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
            console.error(msg)
        props.setFormError(true)
        return null
    }

    return <ControlledInput {...props} />

}

export default ControlledInputWrapper