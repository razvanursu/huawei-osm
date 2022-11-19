import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "@rneui/base";
import React from "react";
import { LoadingAuthenticatedView } from "../../components/views";
import { useMyProfileQuery, useProfileQuery } from "../../generated/types";
import { CommonScreenParamList } from "../../stacks/common/common";
import { useUserProfile } from "../../services/userService";
import { MyProfileStackParamList } from "../../stacks/MyProfileStack";
import ProfileScreen from "./ProfileScreen";

type SplashProfileProps = NativeStackScreenProps<CommonScreenParamList, 'Profile'>;

const SplashProfile: React.FC<SplashProfileProps> = (props) => {
    const { data, loading: isProfileLoading } = useProfileQuery({ variables: { userId: props.route.params.userId }})

    const isLoading = isProfileLoading

    if(isLoading) return <LoadingAuthenticatedView />
    //TODO consider error cases
    if(data && data.profile)
        //TODO add title
        return (
            <ProfileScreen
                profile={data.profile}
                {...props}
            />
        )
    else return <Text>error</Text>
}

export default SplashProfile