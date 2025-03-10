import { colors } from "../../constants/colors"
import { Pressable, StyleSheet, View, Image, Text} from 'react-native'
import { Header } from "@/components/header"

export default function Step(){
    return(
        <View>
            <Header step={"Passo 1"} title={"Vamos começar"}/>
        </View>
    )
}