import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "@rneui/themed";
import React from "react";
import { Pressable, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { MyProfileStackParamList } from "../../stacks/MyProfileStack";

type SettingsScreenProps = NativeStackScreenProps<MyProfileStackParamList, 'Settings'>;

const SettingsScreen: React.FC<SettingsScreenProps> = (props) => {
    const { logout } = useAuth()

    return (
        <View>
            {/* Logout */}
            <Pressable>
                <View style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Button
                        title="Logout"
                        onPress={logout}
                    />
                </View>
            </Pressable>
        </View>
    )
}

export default SettingsScreen