import { View, Text, StyleSheet, Pressable, ScrollView, Share } from 'react-native'
import React from 'react'
import { useDataStore } from '@/store/data'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { colors } from '@/constants/colors'
import { Data } from '@/types/data'
import { Link, router } from 'expo-router'
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
            const response = await api.post<ResponseData>("/api/dieta",{
                name: user.name,
                age: user.age,
                gender: user.gender,
                height: user.height,
                weight: user.weight,
                objective: user.objective,
                level: user.level,
                foodPreference: user.foodPreference,
                numberMeals: user.numberMeals,
                foodRestrictions: user.foodRestrictions,
                useSuplementation: user.useSuplementation
            })

            return response.data.data
            } catch (err) {
                console.log(err)
            }
        }
    })
    async function handleShare() {
        try {
            if (!data || Object.keys(data).length === 0) return;
    
            // Informações básicas
            const nome = data.nome || "Atleta Desconhecido";
            const objetivo = data.objetivo || "Virar um mito fitness";
            const calorias = data.calorias ? `${data.calorias} kcal` : "o máximo possível! 💪";
            const idade = data.idade ? `${data.idade} anos` : "uma idade lendária";
            const altura = data.altura ? `${data.altura}m` : "altura secreta";
            const peso = data.peso ? `${data.peso}kg` : "um peso misterioso";
            const sexo = data.sexo ? (data.sexo.toLowerCase() === "masculino" ? "👨" : "👩") : "🤖";
    
            // Suplementos
            const supplements = Array.isArray(data.suplementos) && data.suplementos.length > 0
                ? data.suplementos.join(", ")
                : "Nenhum suplemento recomendado. Você é naturalmente OP! 💪🔥";
    
            // Refeições
            const foods = Array.isArray(data.refeicoes) && data.refeicoes.length > 0
                ? data.refeicoes.map(item => {
                      const alimentos = Array.isArray(item.alimentos) && item.alimentos.length > 0
                          ? item.alimentos.join(", ")
                          : "Nada listado. Talvez um arroz com ovo? 🍚🥚";
    
                      return `🍽️ *${item.nome}* - ⏰ ${item.horario}\n🥗 *Alimentos:* ${alimentos}`;
                  }).join("\n\n")
                : "Nenhuma refeição cadastrada. Hora de devorar tudo que encontrar? 🍕🍔";
    
            // Mensagem final divertida
            const message = `📋 *Plano de Dieta Personalizado* 🎯
            
    🏋️ *Nome:* ${nome} ${sexo}
    🎯 *Objetivo:* ${objetivo}
    🔥 *Calorias diárias:* ${calorias}
    🎂 *Idade:* ${idade}
    📏 *Altura:* ${altura}
    ⚖️ *Peso:* ${peso}
    
    🍛 *Plano Alimentar:*
    ${foods}
    
    💊 *Dicas de Suplementação:*
    ${supplements}
    
    🚀 Agora é só seguir firme! Nada de furar a dieta... ou eu vou ficar de olho! 👀😂`;
    
            await Share.share({
                message: message
            });
    
        } catch (err) {
            console.log("Erro ao compartilhar:", err);
        }
    }
    

    if (isFetching) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>🍽️ Preparando sua dieta...</Text>
                <Text style={styles.loadingText}>A IA está consultando nutricionistas intergalácticos... 🚀</Text>
            </View>
        );
    }
    
    if (error) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>🚨 Ops! Falha ao gerar sua dieta.</Text>
                <Text style={styles.loadingText}>Parece que a IA foi almoçar e não voltou! 😅</Text>
                <Link href="/">
                    <Text style={[styles.loadingText, { textDecorationLine: "underline" }]}>
                        🍏 Tente novamente e vamos ver se ela já voltou!
                    </Text>
                </Link>
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>🥗 Minha Dieta</Text>
                    <Pressable style={styles.buttonShare} onPress={handleShare}>
                        <Text style={styles.buttonShareText}>📲 Compartilhar</Text>
                    </Pressable>
                </View>
            </View>
    
            <ScrollView style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
                {data && Object.keys(data).length > 0 ? (
                    <>
                        <Text style={styles.name}>🔥 E aí, {data.nome}!</Text>
                        <Text style={styles.objective}>
                            Seu foco é: <Text style={{ fontWeight: "bold" }}>{data.objetivo}</Text>
                        </Text>
                        <Text style={styles.objective}>
                            Fiz os cálculos com uma régua espacial e... você precisa de <Text style={{ fontWeight: "bold" }}>{data.calorias} calorias</Text> por dia!
                        </Text>
    
                        <Text style={styles.label}>🍽️ Refeições:</Text>
                        <View style={styles.foods}>
                            {Array.isArray(data.refeicoes) &&
                                data.refeicoes.map((refeicao) => (
                                    <View key={refeicao.nome} style={styles.food}>
                                        <View style={styles.foodHeader}>
                                            <Text style={styles.foodName}>{refeicao.nome}</Text>
                                            <Ionicons name="restaurant" size={16} color="#000" />
                                        </View>
    
                                        <View style={styles.foodContent}>
                                            <Feather name="clock" size={14} color="#000" />
                                            <Text>⏰ Horário: {refeicao.horario}</Text>
                                        </View>
    
                                        <Text style={styles.foodText}>🍏 Alimentos:</Text>
                                        {Array.isArray(refeicao.alimentos) &&
                                            refeicao.alimentos.map((alimento, index) => (
                                                <Text key={`${alimento}-${index}`}>✅ {alimento}</Text>
                                            ))}
                                    </View>
                                ))}
                        </View>
    
                        <View style={styles.suplemments}>
                            <Text style={styles.foodName}>💊 Dica de suplementos:</Text>
                            {Array.isArray(data.suplementos) &&
                                data.suplementos.map((item, index) => (
                                    <Text key={`${item}-${index}`}>⚡ {item}</Text>
                                ))}
                        </View>
    
                        <Pressable style={styles.button} onPress={() => router.replace("/")}>
                            <Text style={styles.buttonText}>🔄 Gerar nova dieta</Text>
                        </Pressable>
                    </>
                ) : (
                    <Text>🕵️‍♂️ Carregando...</Text>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    loading:{
        flex:1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center'
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
        marginBottom: 24
    },
    buttonText:{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})
