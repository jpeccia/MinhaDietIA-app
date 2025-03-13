import { Pressable, StyleSheet, View, Text, ScrollView} from 'react-native'
import React from 'react'
import { Header } from "@/components/header"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { colors } from '@/constants/colors'
import Select from '@/components/input/select'
import { useDataStore } from '@/store/data'
import { router } from 'expo-router'

const schema = z.object({
    gender: z.string().min(1, { message: 'O sexo é obrigatório'}),
    objective: z.string().min(1, { message: 'A objetivo é obrigatório'}),
    level: z.string().min(1, { message: 'Selecione seu nivel'}),
    foodPreference: z.string().min(1, { message: 'Selecione sua preferencia alimentar'}),
})

type FormData = z.infer<typeof schema>

export default function index() {

    const { control, handleSubmit, formState: { errors, isValid }} = 
    useForm({
        resolver: zodResolver(schema)
    })

        const setPageTwo = useDataStore(state => state.setPageTwo)
    
        function handleCreate(data: FormData) {
            setPageTwo({
                gender: data.gender,
                objective: data.objective,
                level: data.level,
                foodPreference: data.foodPreference
            })
    
            router.push('/finish')
        }

        const genderOptions = [
            { label: "🧑 Masculino", value: "masculino" },
            { label: "👩 Feminino", value: "feminino" },
        ];
        
        const objectiveOptions = [
            { label: "🔥 Perder Peso", value: "Perder Peso" },
            { label: "⚖️ Manter Peso", value: "Manter Peso" },
            { label: "💪 Ganhar Massa Muscular", value: "Ganhar Massa Muscular" },
            { label: "🏃‍♂️ Melhorar Performance Física", value: "Melhorar Performance Física" },
            { label: "🥗 Alimentação Saudável", value: "Alimentação Saudável" },
            { label: "⚡ Aumentar Energia e Disposição", value: "Aumentar Energia e Disposição" },
            { label: "🩺 Dieta Terapêutica", value: "Dieta Terapêutica" },
        ];
        
        const levelOptions = [
            { label: "🛋️ Sedentário (Pouca ou nenhuma atividade física)", value: "sedentario" },
            { label: "🚶‍♂️ Leve (Exercício leve 1-3 dias por semana)", value: "leve" },
            { label: "🏋️ Moderado (Exercício moderado 3-5 dias por semana)", value: "moderado" },
            { label: "🔥 Intenso (Exercício intenso 6-7 dias por semana)", value: "intenso" },
            { label: "🥇 Atleta (Treino diário muito intenso ou trabalho físico pesado)", value: "atleta" },
        ];
        
        const foodOptions = [
            { label: "🍽️ Sem preferências", value: "sem_preferencias" },
            { label: "🥦 Vegetariano", value: "vegetariano" },
            { label: "🌱 Vegano", value: "vegano" },
            { label: "🥩 Low Carb", value: "low_carb" },
            { label: "🥑 Cetogênica", value: "cetogenica" },
            { label: "🍗 Paleo", value: "paleo" },
            { label: "🍷 Mediterrânea", value: "mediterranea" },
            { label: "🍖 Rica em Proteínas", value: "rica_em_proteinas" },
            { label: "🌾 Rica em Fibras", value: "rica_em_fibras" },
        ];
        
        return (
            <View style={styles.container}>
                <Header step={"Passo 2"} title={"🚀 Quase lá!"} />
        
                <ScrollView style={styles.content}>
                    <Text style={styles.label}>👤 Sexo:</Text>
                    <Select
                        control={control}
                        name="gender"
                        placeholder="Selecione o seu sexo"
                        error={errors.gender?.message}
                        options={genderOptions}
                    />
        
                    <Text style={styles.label}>🎯 Objetivo:</Text>
                    <Select
                        control={control}
                        name="objective"
                        placeholder="O que você quer alcançar?"
                        error={errors.objective?.message}
                        options={objectiveOptions}
                    />
        
                    <Text style={styles.label}>🏃‍♂️ Nível de atividade física:</Text>
                    <Select
                        control={control}
                        name="level"
                        placeholder="Escolha seu ritmo de treino!"
                        error={errors.level?.message}
                        options={levelOptions}
                    />
        
                    <Text style={styles.label}>🍽️ Preferência alimentar:</Text>
                    <Select
                        control={control}
                        name="foodPreference"
                        placeholder="Como gosta de se alimentar?"
                        error={errors.foodPreference?.message}
                        options={foodOptions}
                    />
        
                    <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                        <Text style={styles.buttonText}>👉 Avançar</Text>
                    </Pressable>
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
    },
    button:{
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText:{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})