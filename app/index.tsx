import { colors } from "../constants/colors"
import { Pressable, StyleSheet, View, Image, Text} from 'react-native'
import { Link } from "expo-router"

export default function Index(){
  return (
      <View style={styles.container}>
        <Image 
        source={require('../assets/images/health-and-wellness-logo-therapeutic-and-holistic-health-center-logo-png_268619-removebg-preview.png')}
        />
        <Text style={styles.title}>
          Minha Diet<Text style={{ color: colors.white }}>IA!</Text>
        </Text>

        <Text style={styles.text}>
          A dieta criada do seu jeito com inteligência artificial!
        </Text>

      <Link href="/step" asChild>
      <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Criar minha dieta</Text>
        </Pressable>
      </Link>
      </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  title:{
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.green
  },
  text:{
    fontSize: 16,
    color: colors.white,
    width: 240,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8
  },
  button:{
    backgroundColor: colors.blue,
    width: '100%',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34
  },
  buttonText:{
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
})