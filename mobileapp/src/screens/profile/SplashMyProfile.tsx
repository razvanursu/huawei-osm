import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "@rneui/base";
import { Icon } from "@rneui/themed";
import React from "react";
import { LoadingAuthenticatedView } from "../../components/views";
import { User } from "../../models/user";
import { useMyProfile } from "../../services/userService";
import { MyProfileStackParamList } from "../../stacks/MyProfileStack";
import ProfileScreen from "./ProfileScreen";

type SplashMyProfileProps = NativeStackScreenProps<MyProfileStackParamList, 'MyProfile'>;

const SplashProfile: React.FC<SplashMyProfileProps> = (props) => {
    const { data: myProfile, loading: isProfileLoading } = useMyProfile()

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