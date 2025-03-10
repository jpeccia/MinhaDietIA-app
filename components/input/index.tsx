import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function index() {
  return (
    <View style={styles.container}>
        <TextInput 
            placeholder='Digite algo...'
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 16
    }
})