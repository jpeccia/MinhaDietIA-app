import { Pressable, StyleSheet, View, Text, ScrollView} from 'react-native'
import React from 'react'
import { Header } from "@/components/header"
import Input from "@/components/input"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { colors } from '@/constants/colors'
import Select from '@/components/input/select'

const schema = z.object({
    gender: z.string().min(1, { message: 'O sexo é obrigatório'}),
    objective: z.string().min(1, { message: 'A objetivo é obrigatório'}),
    level: z.string().min(1, { message: 'Selecione seu nivel'}),
    foodPreference: z.string().min(1, { message: 'Selecione sua preferencia alimentar'}),
})

export default function index() {

    const { control, handleSubmit, formState: { errors, isValid }} = 
    useForm({
        resolver: zodResolver(schema)
    })

    const genderOptions = [
        { label: "Masculino", value: "masculino"},
        { label: "Feminino", value: "feminino"},
    ]

  return (
        <View style={styles.container}>
            <Header step={"Passo 2"} title={"Finalizando dieta"}/>

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Sexo:</Text>
                <Select
                  control={control}
                  name="gender"
                  placeholder='Selecione o seu sexo'
                  error={errors.gender?.message} 
                  options={genderOptions}                />
            </ScrollView>
        </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background
    },
    content:{
        paddingLeft: 16,
        paddingRight: 16
    },
    label:{
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8
    }
})