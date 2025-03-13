import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useDataStore } from '@/store/data'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { colors } from '@/constants/colors'

export default function Nutrition() {
    const user = useDataStore(state => state.user)
    
    const { data, isFetching, error } = useQuery({
        queryKey: ["nutrition"],
        queryFn: async () => {
            try {
                if(!user){
                    throw new Error("Failed to load nutrition")
                }
            const response = await api.get("/teste")

            console.log(response.data.data)
            return response.data.data
            } catch (err) {
                console.log(err)
            }
        }
    })

    if(isFetching){
        return(
            <View style={styles.loading}>
                <Text>Estamos gerando sua dieta!</Text>
                <Text>Consultando IA.....</Text>
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