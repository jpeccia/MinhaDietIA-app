import { View, Text } from 'react-native'
import React from 'react'
import { useDataStore } from '@/store/data'

export default function Nutrition() {
    const user = useDataStore(state => state.user)
    
    console.log(user)

  return (
    <View>
      <Text>gg</Text>
    </View>
  )
}