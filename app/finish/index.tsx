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
import Input from '@/components/input'

const schema = z.object({
    foodRestrictions: z.string().min(1, { message: 'Selecione se há restrições alimentares'}),
    numberMeals: z.string().min(1, { message: 'Selecione a quantidade de refeições ao dia'}),
    useSuplementation: z.string().min(1, { message: 'Selecione se há uso de suplementação'}),
})

type FormData = z.infer<typeof schema>

export default function index() {

    const { control, handleSubmit, formState: { errors, isValid }} = 
    useForm({
        resolver: zodResolver(schema)
    })

        const setPageThree = useDataStore(state => state.setPageThree)
    
        function handleCreate(data: FormData) {
            setPageThree({
                foodRestrictions: data.foodRestrictions,
                numberMeals: data.numberMeals,
                useSuplementation: data.useSuplementation,
            })

            router.push('/nutrition')
        }

    const foodRestrictionOptions = [
        { label: "Sem restrições", value: "Sem restrições" },
        { label: "Sem Glúten (Doença celíaca ou intolerância)", value: "Sem Glúten (Doença celíaca ou intolerância)" },
        { label: "Sem Lactose (Intolerância à lactose)", value: "Sem Lactose (Intolerância à lactose)" },
        { label: "Alergia a Oleaginosas (Nozes, castanhas, amendoim)", value: "Alergia a Oleaginosas (Nozes, castanhas, amendoim)" },
        { label: "Diabetes (Controle de açúcar e carboidratos)", value: "Diabetes (Controle de açúcar e carboidratos)" },
        { label: "Hipertensão (Baixo consumo de sódio)", value: "Hipertensão (Baixo consumo de sódio)" },
        { label: "Doença Renal (Controle de proteínas e sódio)", value: "Doença Renal (Controle de proteínas e sódio)" },
    ]


    const useSuplementationOptions = [
        { label: "Sim", value: "Sim" },
        { label: "Não", value: "Não" },
    ]

    return (
        <View style={styles.container}>
            <Header step={"Passo 3"} title={"Finalizando 🚀"} />
    
            <ScrollView style={styles.content}>
                <Text style={styles.label}>🔥 Escolha sua restrição alimentar:</Text>
                <Select
                    control={control}
                    name="foodRestrictions"
                    placeholder="Sem glúten? Sem lactose? Escolha aqui!"
                    error={errors.foodRestrictions?.message}
                    options={foodRestrictionOptions}
                />
    
                <Text style={styles.label}>🍽️ Quantas refeições no dia?</Text>
                <Input
                    name="numberMeals"
                    control={control}
                    placeholder="Ex: 3 (ou mais se a fome bater!)"
                    error={errors.numberMeals?.message}
                    keyboardType="numeric"
                />
    
                <Text style={styles.label}>💊 Vai usar suplementos?</Text>
                <Select
                    control={control}
                    name="useSuplementation"
                    placeholder="Wheyzinho? Creatina? Escolha aqui!"
                    error={errors.useSuplementation?.message}
                    options={useSuplementationOptions}
                />
    
                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}>🔥 Bora criar essa dieta!</Text>
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