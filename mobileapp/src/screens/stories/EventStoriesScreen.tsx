import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "@rneui/themed";
import React from "react";
import { LoadingAuthenticatedView } from "../../components/views";
import { useEventStoriesQuery } from "../../generated/types";
import { CommonScreenParamList } from "../../stacks/common/common";
import { StoriesStackParamList } from "../../stacks/StoriesStack";
import StoryShow from "./StoryShow";

export type EventStoriesScreenProps = NativeStackScreenProps<StoriesStackParamList, 'EventStories'>;

const EventStoriesScreen: React.FC<EventStoriesScreenProps> = (props) => {
    const { navigation, route } = props

    const { data, loading } = useEventStoriesQuery({ variables: { eventId: route.params.eventId } })

    if(loading) return <LoadingAuthenticatedView />
    //TODO consider error cases
    if(data && data.eventStories)
        //TODO add title
        return (
            <StoryShow
                stories={data.eventStories}
                {...props}
            />
        )
    else return <Text>error</Text>

}

export default EventStoriesScreen