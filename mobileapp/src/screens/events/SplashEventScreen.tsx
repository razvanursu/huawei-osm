import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "@rneui/themed";
import React from "react";
import { LoadingAuthenticatedView } from "../../components/views";
import { useAuth } from "../../context/AuthContext";
import { useEventQuery } from "../../generated/types";
import { CommonScreenParamList } from "../../stacks/common/common";
import { HomeStackParamList } from "../../stacks/HomeStack";
import EventScreen from "./EventScreen";

export type SplashEventScreenProps = NativeStackScreenProps<CommonScreenParamList, 'Event'>;


const SplashEventScreen: React.FC<SplashEventScreenProps> = (props) => {
    const { eventId } = props.route.params

    const { data, loading } = useEventQuery({ variables: { eventId: eventId }})

    if(loading) return <LoadingAuthenticatedView />
    else if(data?.event) {
        console.log(data.event.id)
        return (
            <EventScreen
                event={data.event}
                {...props}
            />
        )
    }
    else return <Text>error</Text>
}

export default SplashEventScreen