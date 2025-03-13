import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useDataStore } from '@/store/data'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { colors } from '@/constants/colors'
import { Data } from '@/types/data'
import { Link } from 'expo-router'

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
    <View>
      <Text>gg</Text>
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
    }
})