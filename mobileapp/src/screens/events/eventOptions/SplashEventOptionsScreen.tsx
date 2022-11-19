import { Text } from "@rneui/themed";
import React from "react";
import { LoadingAuthenticatedView } from "../../../components/views";
import { useEventQuery } from "../../../generated/types";
import { EventOptionsScreenProps, SplashEventOptionsScreenProps } from "../../../stacks/common/EventOptionScreens";

const withUserIsAdmin = (WrappedComponent: React.FC<EventOptionsScreenProps>) => {
    const Component: React.FC<SplashEventOptionsScreenProps> = (props) => {
        const { eventId } = props.route.params

        const { data: event, loading } = useEventQuery({ variables: { eventId: eventId || "" }})

        if(loading) return <LoadingAuthenticatedView />
        else if(event?.event) {
            return (event.event.isAdmin)?
                    (
                        <WrappedComponent
                            event={event.event}
                            {...props}
                        />
                    ) : (
                        <Text>
                            No permission
                        </Text>
                    )
        }
        else return <Text>error</Text>
    }
    return Component
}

/*
const SplashEventOptionsScreen: React.FC<SplashEventOptionsScreenProps> = (props) => {
    const { eventId } = props.route.params

    const { data: event, loading } = useEventQuery({ variables: { eventId: eventId || "" }})

    if(loading) return <LoadingAuthenticatedView />
    else if(event?.event) {
        return (event.event.isAdmin)?
                (
                    <EventOptionsScreen
                        event={event.event}
                        {...props}
                    />
                ) : (
                    <Text>
                        No permission
                    </Text>
                )
    }
    else return <Text>error</Text>
}*/

export default withUserIsAdmin