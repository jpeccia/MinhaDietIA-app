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

    const objectiveOptions = [
        { label: "Perder Peso", value: "Perder Peso" },
        { label: "Manter Peso", value: "Manter Peso" },
        { label: "Ganhar Massa Muscular", value: "Ganhar Massa Muscular" },
        { label: "Melhorar Performance Física", value: "Melhorar Performance Física" },
        { label: "Alimentação Saudável", value: "Alimentação Saudável" },
        { label: "Aumentar Energia e Disposição", value: "Aumentar Energia e Disposição" },
        { label: "Dieta Terapêutica", value: "Dieta Terapêutica" },
    ];

    const levelOptions = [
        { label: "Sedentário (Pouca ou nenhuma atividade física)", value: "sedentario" },
        { label: "Leve (Exercício leve 1-3 dias por semana)", value: "Leve (Exercício leve 1-3 dias por semana)" },
        { label: "Moderado (Exercício moderado 3-5 dias por semana)", value: "Moderado (Exercício moderado 3-5 dias por semana)" },
        { label: "Intenso (Exercício intenso 6-7 dias por semana)", value: "Intenso (Exercício intenso 6-7 dias por semana)" },
        { label: "Atleta (Treino diário muito intenso ou trabalho físico pesado)", value: "Atleta (Treino diário muito intenso ou trabalho físico pesado)" },
    ]

    const foodOptions = [
        { label: "Sem preferências", value: "Sem preferências" },
        { label: "Vegetariano", value: "vVegetariano" },
        { label: "Vegano", value: "Vegano" },
        { label: "Low Carb", value: "low carb" },
        { label: "Cetogênica", value: "Cetogênica" },
        { label: "Paleo", value: "Paleo" },
        { label: "Mediterrânea", value: "Mediterranea" },
        { label: "Rica em Proteínas", value: "Rica em Proteínas" },
        { label: "Rica em Fibras", value: "Rica em Fibras" },
    ]

  return (
        <View style={styles.container}>
            <Header step={"Passo 2"} title={"Quase lá!"}/>

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Sexo:</Text>
                <Select
                  control={control}
                  name="gender"
                  placeholder='Selecione o seu sexo'
                  error={errors.gender?.message} 
                  options={genderOptions}                
                  />

                <Text style={styles.label}>Objetivo:</Text>
                <Select
                  control={control}
                  name="objective"
                  placeholder='Selecione o seu objetivo'
                  error={errors.objective?.message} 
                  options={objectiveOptions}                
                  />

                <Text style={styles.label}>Selecione o nivel de atividade física:</Text>
                <Select
                  control={control}
                  name="level"
                  placeholder='Selecione o nivel de atividade física'
                  error={errors.level?.message} 
                  options={levelOptions}                
                  />

                <Text style={styles.label}>Selecione sua preferência alimentar:</Text>
                <Select
                  control={control}
                  name="foodPreference"
                  placeholder='Selecione sua preferência alimentar'
                  error={errors.foodPreference?.message} 
                  options={foodOptions}                
                  />
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