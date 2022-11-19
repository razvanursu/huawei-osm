import * as React from 'react'
import { View } from 'react-native'

const AuthView: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <View style={{ paddingTop: 100, display: "flex", paddingHorizontal: 20 }}>
            {children}
        </View>
    )
}

export default AuthView