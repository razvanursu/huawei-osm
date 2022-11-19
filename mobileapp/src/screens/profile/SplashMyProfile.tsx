import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "@rneui/base";
import { Icon } from "@rneui/themed";
import React from "react";
import { LoadingAuthenticatedView } from "../../components/views";
import { User } from "../../models/user";
import { useMyProfile } from "../../services/userService";
import { MapStackParamList } from "../../stacks/MapStack";
import ProfileScreen from "./ProfileScreen";

type SplashMyProfileProps = NativeStackScreenProps<MapStackParamList, 'MyProfile'>;

const SplashProfile: React.FC<SplashMyProfileProps> = (props) => {
    const { data: myProfile, loading: isProfileLoading } = useMyProfile()

    if(isProfileLoading) return <LoadingAuthenticatedView />
    //TODO consider error cases
    if(myProfile)
        //TODO add title
        return (
            <ProfileScreen
                user={myProfile as User}
                {...props}
            />
        )
    else return <Text>error</Text>
}

export default SplashProfile