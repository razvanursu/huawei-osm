import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Tab, TabView, Text } from "@rneui/themed";
import React from "react"
import { View } from "react-native"
import ProfileEventEntry from "../../components/EventEntry/ProfileEventEntry";
import { CustomTab, CustomTabItem, CustomTabViewItem } from "../../components/Tab/CustomTab";
import UserEntry from "../../components/UserEntry/UserEntry";
import { useFollowersQuery, useFollowingUsersQuery } from "../../generated/types";
import { CommonScreenParamList } from "../../stacks/common/common";

type LoadingFollowersListScreenProps = NativeStackScreenProps<CommonScreenParamList, 'FollowerList'>;

const LoadingFollowersListScreen: React.FC<LoadingFollowersListScreenProps> = (props) => {
    if(!props.route.params?.userId) return <Text>no userID</Text>

    props.navigation.setOptions({ title: props.route.params.name })

    return (
        <FollowersListScreen
            userId={props.route.params.userId}
            index={props.route.params.index}
            {...props}
        />
    )
}

interface UserListTabProps {
    userId: string
    goToProfile: (id: string) => void
}

const FollowersTab: React.FC<UserListTabProps> = ({ userId, goToProfile }) => {
    const { data } = useFollowersQuery({ variables: { userId }})

    return (
        <>
            {data && data.profile && data.profile.followers.map((user) =>
                <UserEntry key={user.id} profile={user} onPress={() => goToProfile(user.id)}/>
            )}
        </>
    )
}

const FollowingTab: React.FC<UserListTabProps> = ({ userId, goToProfile }) => {
    const { data } = useFollowingUsersQuery({ variables: { userId }})

    return (
        <>
            {data && data.profile && data.profile.followingUsers.map((user) =>
                <UserEntry key={user.id} profile={user} onPress={() => goToProfile(user.id)} />
            )}
        </>
    )
}

/*const EventsTab: React.FC<{ userId: string }> = ({ userId }) => {
    const { data: events } = useUserEventsQuery({ variables: { userId }})

    return (
        <>
            {events && events.userEvents.map((eventParticipant) =>
                <ProfileEventEntry key={eventParticipant.event.id} eventParticipant={eventParticipant} />
            )}
        </>
    )
}*/

export enum FollowerScreenTabs {
    Events = 0,
    Follower = 1,
    Following = 2
}

interface FollowersListScreenProps extends LoadingFollowersListScreenProps {
    userId: string;
    index?: FollowerScreenTabs;
}

const FollowersListScreen: React.FC<FollowersListScreenProps> = ({ userId, index: defaultIndex, navigation }) => {
    const [index, setIndex] = React.useState(defaultIndex || FollowerScreenTabs.Follower);

    return (
        <>
            <CustomTab
                value={index}
                onChange={(idx) => setIndex(idx)}
            >
                <CustomTabItem
                    title="Events"
                />
                <CustomTabItem
                    title="Followers"
                />
                <CustomTabItem
                    title="Following"
                />
            </CustomTab>
            <TabView value={index} onChange={setIndex}>
                <CustomTabViewItem>
                    {/*<EventsTab userId={userId} />*/}
                </CustomTabViewItem>
                <CustomTabViewItem>
                    <FollowersTab userId={userId} goToProfile={(userId: string) => navigation.push("Profile", { userId })} />
                </CustomTabViewItem>
                <CustomTabViewItem>
                    <FollowingTab userId={userId} goToProfile={(userId: string) => navigation.push("Profile", { userId })} />
                </CustomTabViewItem>
            </TabView>
        </>
    )
}

export default LoadingFollowersListScreen