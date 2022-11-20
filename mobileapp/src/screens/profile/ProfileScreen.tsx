import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { Avatar, Icon, Text } from "@rneui/themed";
import { User } from '../../models/user';
import { useAuth } from '../../context/AuthContext';

const PirateFlag = require('../../../assets/icons/coin.png')
const KnightFlag = require('../../../assets/icons/knight.png')

interface ProfileScreenProps {
  user: User
  navigation: any
}

const BADGE_SIZE = 80

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, navigation }) => {

  const { logout } = useAuth()

  React.useEffect(() => navigation.setOptions({ headerShown: true, title: user.username }), [navigation, user.username]);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon name="logout" onPress={logout} />
      ),
    });
  }, [navigation, logout]);

  return (
    <View style={{ display: "flex", alignItems: 'center', width: "100%", height: "100%", paddingTop: 20, backgroundColor: "white" }}>
      
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <Avatar
          size={150}
          rounded
          source={user.id === 2?require("../../../assets/icons/colombo.png"):require("../../../assets/icons/amerigo.png")}
        />
      </View>

      <Text h3 style={{ marginBottom: 20, color: "grey0" }}>
        {user.username}
      </Text>

      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <Avatar
            size={40}
            rounded
            source={user.guild === 1?PirateFlag:KnightFlag}
        />
      </View>

      <Text h4 style={{ marginBottom: 5, color: "red" }}>
        {user.guild === 1?'Captain':'Lancelot'}
      </Text>

      <Text h4 style={{ marginBottom: 30 }}>
        Level {user.currentLevel} - {user.currentXp} XP
      </Text>
      
      <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 10, marginBottom: 20 }}>
        <View style={{ borderRadius: 10, borderWidth: 1, borderColor: "grey0", height: 30, width: "100%", justifyContent: "center", alignItems: "center" }}>
        <View style={{ left: 0, top: 0, position: "absolute", borderBottomLeftRadius: 8, borderTopLeftRadius: 8, zIndex: -1, backgroundColor: "green", width: Math.floor((user.levelXp * 100) / user.levelMaxXp).toString() + "%", height: "100%" }} />
          <Text h4>
            {user.levelXp} / {user.levelMaxXp} XP
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