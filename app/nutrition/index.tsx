import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { useDataStore } from '@/store/data'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { colors } from '@/constants/colors'
import { Data } from '@/types/data'
import { Link } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'

interface ResponseData {
    data: Data
}

export default function Nutrition() {
    const user = useDataStore(state => state.user)
    
    const { data, isFetching, error } = useQuery({
        queryKey: ["nutrition"],
        queryFn: async () => {
            try {
                if(!user){
                    throw new Error("Failed to load nutrition")
                }
            const response = await api.get<ResponseData>("/teste")

            return response.data.data
            } catch (err) {
                console.log(err)
            }
        }
    })

    if(isFetching){
        return(
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Estamos gerando sua dieta!</Text>
                <Text style={styles.loadingText}>Consultando IA.....</Text>
            </View>
        )
    }

    if(error){
        return(
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Falha ao gerar dieta!</Text>
                <Link href="/">
                    <Text style={styles.loadingText}>Tente novamente</Text>
                </Link>
            </View>
        )
    }

  return (
    <View style={styles.container}>
        <View style={styles.containerHeader}>
            <View style={styles.contentHeader}>
                <Text style={styles.title}>Minha dieta</Text>
                 <Pressable style={styles.buttonShare}>
                    <Text style={styles.buttonShareText}>Compartilhar</Text>
                 </Pressable>
            </View>
        </View>
        <ScrollView style={{ paddingLeft: 16, paddingRight: 16, flex:1 }}>
                {data && Object.keys(data).length > 0 && (
                    <>
                        <Text style={styles.name}>Eai {data.nome}!</Text>
                        <Text style={styles.objective}>Segue sua dieta com foco em: {data.objetivo}</Text>
                        <Text style={styles.objective}>Fiz o calculo aqui, e você precisa consumir {data.calorias} calorias!</Text>

                        <Text style={styles.label}>Refeições:</Text>
                        <ScrollView>
                            <View style={styles.foods}>
                                {data.refeicoes.map( (refeicao) => (
                                    <View key={refeicao.nome}style={styles.food}>
                                        <View style={styles.foodHeader}>
                                            <Text style={styles.foodName}>{refeicao.nome}</Text>
                                            <Ionicons name="restaurant" size={16} color="#000" />
                                        </View>

                                        <View style={styles.foodContent}>
                                            <Feather name="clock" size={14} color="#000" />
                                            <Text>Horário: {refeicao.horario}</Text>
                                        </View>

                                        <Text style={styles.foodText}>Alimentos:</Text>
                                        {refeicao.alimentos.map(alimento => (
                                            <Text key={alimento}>{alimento}</Text>
                                        ))}
                                    </View>
                                ))}
                            </View>

                            <View style={styles.suplemments}>
                                <Text style={styles.foodName}>Dica de suplementos:</Text>
                                {data.suplementos.map( item => (
                                    <Text key={item}>{item}</Text>
                                ))}
                            </View>

                            <Pressable style={styles.button}>
                                <Text style={styles.buttonText}>Gerar nova dieta</Text>
                            </Pressable>
                        </ScrollView>
                    </>
                )}
            </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    loading:{
        flex:1,
        backgroundColor: colors.background
    },
    loadingText:{
        fontSize:18,
        color:colors.white,
        marginBottom:4,
        justifyContent: 'center'
    },
    container:{
        backgroundColor: colors.background,
        flex:1
    },
    containerHeader:{
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingTop: 60,
        paddingBottom: 20,
        marginBottom: 16
    },
    contentHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16
    },
    title:{
        fontSize: 30,
        color: colors.background,
        fontWeight: 'bold'
    },
    buttonShare:{
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 4
    },
    buttonShareText:{
        color: colors.white,
        fontWeight: '500'
    },
    name:{
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold'
    },
    objective:{
        color: colors.white,
        fontSize: 16,
        marginBottom: 24
    },
    label:{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    foods:{
        backgroundColor: colors.white,
        padding: 14,
        borderRadius: 8,
        marginTop: 8,
        gap: 8
    },
    food:{
        backgroundColor: 'rgba(208, 208, 208, 0.40)',
        padding: 8,
        borderRadius: 8
    },
    foodHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4
    },
    foodName:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    foodContent:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    foodText:{
        fontSize: 16,
        marginBottom: 4,
        marginTop: 14
    },
    suplemments:{
        backgroundColor: colors.white,
        marginTop: 14,
        marginBottom: 14,
        padding: 14,
        borderRadius: 8
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
