import { Button } from "@rneui/base";
import { Input, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import Subsection from "../../../components/Layout/subsection";
import { EventDocument, FullEventFragment, useUpdateEventMutation } from "../../../generated/types";
import { EventOptionsScreenProps } from "../../../stacks/common/EventOptionScreens";
import withUserIsAdmin from "./SplashEventOptionsScreen";


//We assume the user already has permission here
const PaymentMethodsScreen: React.FC<EventOptionsScreenProps> = ({ event, navigation }) => {
    const [paypalEmail, setPaypalEmail] = React.useState(event.paypalUsername || "")

    React.useEffect(() => navigation.setOptions({title: event.name}), [navigation, event.name]);

    const [updateEvent] = useUpdateEventMutation({
        refetchQueries: [
            {query: EventDocument, variables: { eventId: event.id }},
        ],
        onError: (error) => console.log(error),
    })

    return (
        <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
            <Subsection title="Payment methods">
                <Text>
                    PayPal email
                </Text>
                <Input
                    placeholder="PayPal Email"
                    value={paypalEmail}
                    onChangeText={setPaypalEmail}
                />
                <Button
                    title="Save"
                    onPress={() => updateEvent({
                        variables: {
                            eventId: event.id,
                            input: {
                                //paypalUsername: paypalEmail
                            }
                        }
                    })}
                />
            </Subsection>
            <Subsection title="Tickets">

            </Subsection>
        </View>
    )
}

export default withUserIsAdmin(PaymentMethodsScreen)