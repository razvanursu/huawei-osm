import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { Avatar, Button, Text } from "@rneui/themed";
import { useAuth } from '../../context/AuthContext';
import { FollowerScreenTabs } from './FollowersListScreen';
import { FullProfileFragment, MyProfileDocument, ProfileDocument, useFollowUserMutation, useUnfollowUserMutation } from '../../generated/types';
import { CommonScreenParamList } from '../../stacks/common/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import EditProfileOverlay from '../../components/Overlays/EditProfileOverlay';

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
  profile: FullProfileFragment
  navigation: any
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ profile, navigation }) => {
  const { userID } = useAuth()

  const [editProfile, setEditProfile] = React.useState(false)

  React.useEffect(() => navigation.setOptions({title: profile.username}), [navigation, profile.username]);

  const [followUserMutation] = useFollowUserMutation({
    refetchQueries: [
      {query: ProfileDocument, variables: { userId: profile.id }},
    ],
    onCompleted: () => {
        
    },
    onError: (error) => console.log(error),
  })

  const [unfollowUserMutation] = useUnfollowUserMutation({
    refetchQueries: [
      {query: ProfileDocument, variables: { userId: profile.id }},
    ],
    onCompleted: () => {
        
    },
    onError: (error) => console.log(error),
  })

  console.log(profile.profilePicture)
  const followUser = useCallback(() => followUserMutation({ variables: { userId: profile.id }}), [profile.id])
  const unfollowUser = useCallback(() => unfollowUserMutation({ variables: { userId: profile.id }}), [profile.id])
  
  return (
    <View style={{ display: "flex", alignItems: 'center', width: "100%", paddingTop: 50 }}>
      
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Avatar
          size={150}
          rounded
          source={{ uri: `${profile.profilePicture}?${new Date()}` || "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg" }}
        />
      </View>

      <Text h2>
        {profile.name}
      </Text>

      <Text h4 style={{ marginBottom: 30, color: "grey0" }}>
        @{profile.username}
      </Text>

      <View>
        {userID === profile.id?(
          <Button
            title="Edit Profile"
            onPress={() => setEditProfile(true)}
          />
        ):(
          <Button
            title={profile.followingRelation?"Unfollow":"Follow"}
            onPress={profile.followingRelation?unfollowUser:followUser}
          />
        )}
      </View>
      
      <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 10, marginBottom: 10 }}>
        {/*<QuantityInfo
          label={"Events"}
          number={profile.eventsNumber}
          onPress={() => navigation.navigate("FollowerList", { userId: profile.id, name: profile.name, index: FollowerScreenTabs.Events })}
        />*/}
        <QuantityInfo
          label={"Followers"}
          number={profile.followersNumber || 0}
          onPress={() => navigation.navigate("FollowerList", { userId: profile.id, name: profile.name, index: FollowerScreenTabs.Follower })}
        />
        <QuantityInfo
          label={"Following"}
          number={profile.followingUsersNumber || 0}
          onPress={() => navigation.navigate("FollowerList", { userId: profile.id, name: profile.name, index: FollowerScreenTabs.Following })}
        />
      </View>

      <View style={{ width: "100%", paddingHorizontal: 50, marginBottom: 10 }}>
        {/*<Button title="Edit Profile" color={"grey1"} onPress={() => navigation.navigate('EditProfile', { profile })} />*/}
      </View>

      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <Text h4>
          {profile.bio}
        </Text> 
      </View>

      <EditProfileOverlay
        profile={profile}
        visible={editProfile}
        onClose={() => setEditProfile(false)}
      />
      
    </View>
  );
}

export default ProfileScreen