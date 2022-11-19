import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "@rneui/base";
import { Icon } from "@rneui/themed";
import React from "react";
import { LoadingAuthenticatedView } from "../../components/views";
import { useAuth } from "../../context/AuthContext";
import { useMyProfileQuery, useProfileQuery } from "../../generated/types";
import { MyProfileStackParamList } from "../../stacks/MyProfileStack";
import ProfileScreen from "./ProfileScreen";

type SplashMyProfileProps = NativeStackScreenProps<MyProfileStackParamList, 'MyProfile'>;

const SplashProfile: React.FC<SplashMyProfileProps> = (props) => {
    const { userID } = useAuth()

    const { data, loading: isProfileLoading } = useMyProfileQuery()

    React.useEffect(() => {
        props.navigation.setOptions({
          headerRight: () => (
            <Icon name="settings" onPress={() => props.navigation.push("Settings")} />
          ),
        });

    }, [props.navigation]);

    const isLoading = isProfileLoading

    if(isLoading) return <LoadingAuthenticatedView />
    //TODO consider error cases
    if(data && data.myProfile)
        //TODO add title
        return (
            <ProfileScreen
                profile={data.myProfile}
                {...props}
            />
        )
    else return <Text>error</Text>
}

export default SplashProfile