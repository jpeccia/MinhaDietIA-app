import { Pressable, StyleSheet, View, Text, ScrollView} from 'react-native'
import React from 'react'
import { Header } from "@/components/header"
import Input from "@/components/input"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { colors } from '@/constants/colors'

export default function index() {
  return (
        <View style={styles.container}>
            <Header step={"Passo 2"} title={"Finalizando dieta"}/>
        </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background
    }
})