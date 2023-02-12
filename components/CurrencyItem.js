import { StyleSheet, TouchableOpacity,Text, View } from "react-native"

const CurrencyItem=({symbol,rate})=>{
    return(
    <View 
        style={styles.container}
        >
        <Text style={styles.title}>{symbol}</Text>
        <Text style={styles.title}>{rate}</Text>
    </View>
    )
}

const styles=StyleSheet.create({
    container:{
        padding: 20,
        margin:12,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#315240"
        
    },
    title: {
        fontSize: 24,
        fontWeight:'600',
        color:'white',
        textAlign:'center'
      },
});
export default CurrencyItem;