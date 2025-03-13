import { colors } from "../../constants/colors"
import { Pressable, StyleSheet, View, Text, ScrollView} from 'react-native'
import { Header } from "@/components/header"
import Input from "@/components/input"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { router } from "expo-router"
import { useDataStore } from "@/store/data"

const schema = z.object({
    name: z.string().min(1, { message: 'O nome é obrigatório'}),
    age: z.string().min(1, { message: 'A idade é obrigatório'}),
    height: z.string().min(1, { message: 'A altura é obrigatório'}),
    weight: z.string().min(1, { message: 'O peso é obrigatório'}),
})

type FormData = z.infer<typeof schema>

export default function Step(){
    
    const { control, handleSubmit, formState: { errors, isValid }} = 
    useForm({
        resolver: zodResolver(schema)
    })

    const setPageOne = useDataStore(state => state.setPageOne)

    function handleCreate(data: FormData) {
        setPageOne({
            name: data.name,
            weight: data.weight,
            age: data.age,
            height: data.height
        })

        router.push('/create')
    }

    return (
        <View style={styles.container}>
            <Header step={"Passo 1"} title={"🎯 Vamos começar!"} />
    
            <ScrollView style={styles.content}>
                <Text style={styles.label}>👤 Nome:</Text>
                <Input
                    name="name"
                    control={control}
                    placeholder="Como você quer ser chamado? 🤔"
                    error={errors.name?.message}
                    keyboardType="default"
                />
    
                <Text style={styles.label}>🎂 Idade:</Text>
                <Input
                    name="age"
                    control={control}
                    placeholder="Quantos anos você tem? 🧐"
                    error={errors.age?.message}
                    keyboardType="numeric"
                />
    
                <Text style={styles.label}>📏 Sua altura atual:</Text>
                <Input
                    name="height"
                    control={control}
                    placeholder="Ex: 1.80m ⬆️"
                    error={errors.height?.message}
                    keyboardType="numeric"
                />
    
                <Text style={styles.label}>⚖️ Seu peso atual:</Text>
                <Input
                    name="weight"
                    control={control}
                    placeholder="Ex: 80kg 🏋️"
                    error={errors.weight?.message}
                    keyboardType="numeric"
                />
    
                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}>🚀 Avançar</Text>
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