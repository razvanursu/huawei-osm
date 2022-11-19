import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { Avatar, Button, LinearProgress, Text } from "@rneui/themed";
import { useAuth } from '../../context/AuthContext';
import { FollowerScreenTabs } from './FollowersListScreen';
import { FullProfileFragment, MyProfileDocument, ProfileDocument, useFollowUserMutation, useUnfollowUserMutation } from '../../generated/types';
import { CommonScreenParamList } from '../../stacks/common/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import EditProfileOverlay from '../../components/Overlays/EditProfileOverlay';
import { User } from '../../models/user';

const QuantityInfo = ({ number, label, onPress }: { number: number, label: string, onPress?: () => void}) => {

  return (
    <Pressable style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={onPress}>
      <Text h4 style={{ alignItems: 'center', justifyContent: 'center' }}>
        {number}
      </Text>

      <Text h4 style={{ alignItems: 'center', justifyContent: 'center', color: "grey0" }}>
        {label}
      </Text>
    </Pressable>
  )
}

interface ProfileScreenProps {
  user: User
  navigation: any
}

const BADGE_SIZE = 80

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, navigation }) => {
  const [editProfile, setEditProfile] = React.useState(false)

  React.useEffect(() => navigation.setOptions({ headerShown: true, title: user.username }), [navigation, user.username]);

  return (
    <View style={{ display: "flex", alignItems: 'center', width: "100%", height: "100%", paddingTop: 20, backgroundColor: "white" }}>
      
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <Avatar
          size={150}
          rounded
          source={{ uri: "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
        />
      </View>

      <Text h3 style={{ marginBottom: 20, color: "grey0" }}>
        {user.username}
      </Text>

      <Text h4 style={{ marginBottom: 5, color: "red" }}>
        First Mate
      </Text>

      <Text h4 style={{ marginBottom: 30 }}>
        Level {user.currentLevel}
      </Text>
      
      <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 10, marginBottom: 20 }}>
        <View style={{ borderRadius: 10, borderWidth: 1, borderColor: "grey0", height: 30, width: "100%", justifyContent: "center", alignItems: "center" }}>
        <View style={{ left: 0, top: 0, position: "absolute", borderBottomLeftRadius: 8, borderTopLeftRadius: 8, zIndex: -1, backgroundColor: "green", width: "50%", height: "100%" }} />
          <Text h4>
            1000 / 1000 XP
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 10, marginBottom: 10, justifyContent: "space-evenly" }}>
        <Avatar
            size={BADGE_SIZE}
            source={require('../../../assets/badges/badge1.png')}
        />
        <Avatar
            size={BADGE_SIZE}
            source={require('../../../assets/badges/badge2.png')}
        />
        <Avatar
            size={BADGE_SIZE}
            source={require('../../../assets/badges/badge3.png')}
        />
      </View>

      <View style={{ width: "100%", paddingHorizontal: 50, marginBottom: 10 }}>
        {/*<Button title="Edit Profile" color={"grey1"} onPress={() => navigation.navigate('EditProfile', { profile })} />*/}
      </View>
      
    </View>
  );
}

export default ProfileScreen