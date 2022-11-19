import React from "react"
import { FormProvider, SubmitErrorHandler, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"
import Input from "../../components/forms/Input"
import { EventCreationResponseFragment, useCreateEventMutation } from "../../generated/types"
import { Button, Icon, Text } from "@rneui/themed"
import DatePicker from 'react-native-date-picker'
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import moment from 'moment';
import { CreateEventStackParamList } from "../../stacks/CreateEventStack"
import AddEventPoster from "./AddEventPoster"

type FormData = {
    name: string;
    hashtag: string;
    description: string;
    startDate: moment.Moment
    endDate: moment.Moment
};

export type CreateEventScreenProps = NativeStackScreenProps<CreateEventStackParamList, 'Create'>;

const CreateEventScreen: React.FC<CreateEventScreenProps> = ({ navigation }) => {
    const [event, setEvent] = React.useState<EventCreationResponseFragment>()
    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)

    const { ...methods } = useForm<FormData>({
        mode: "onBlur"
    });
    const { errors, isValid } = methods.formState
    
    const [formError, setError] = React.useState<Boolean>(false)

    const [createEventMutation] = useCreateEventMutation({
        onCompleted: (data) => {
            console.log(data)
            data.createEvent?.__typename === "Event" && setEvent(data.createEvent)//navigation.push("Event", { eventId: data.createEvent?.id })
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const onError: SubmitErrorHandler<FormData> = (errors, e) => {
        return console.log(errors)
    };

    //const poster = methods.getValues().poster
    //console.log(poster)
    
    return (
        <View style={{ padding: 10 }}>
            <FormProvider {...methods}>

                {/*<ImageInput
                    name="poster"
                    setFormError={setError}
                />*/}
                <Input
                    name="name"
                    label="Name"
                    placeholder="Event Name"
                    setFormError={() => {}}
                    containerStyle={styles.inputContainer}
                    rules={{ required: 'Email is required!' }}
                />
                <Input
                    name="hashtag"
                    label="Hashtag"
                    placeholder="#"
                    setFormError={() => {}}
                    containerStyle={styles.inputContainer}
                    rules={{ required: 'Hashtag is required!' }}
                />
                <Input
                    name="description"
                    label="Description"
                    placeholder="Event description"
                    setFormError={() => {}}
                    containerStyle={styles.inputContainer}
                />
                <Button
                    title="Create event"
                    disabled={!isValid}
                    onPress={methods.handleSubmit((data) => {
                        createEventMutation({
                            variables: {
                                input: {
                                    ...data,
                                    address: "Via Nazionale, 10, 00184 Roma RM, Italia",
                                    startTime: new Date(),
                                    endTime: new Date()
                                }
                            }
                        })
                    })}
                />
                <Button title="Open" onPress={() => setOpen(true)} />
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    }}
                    onCancel={() => {
                    setOpen(false)
                    }}
                />
            </FormProvider>

            {event && (
                <AddEventPoster
                    visible={Boolean(event)}
                    event={event}
                    onNextStep={() => navigation.push("Event", { eventId: event.id })}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15
    }
})

export default CreateEventScreen