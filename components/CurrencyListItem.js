import { StyleSheet, TouchableOpacity,Text } from "react-native"

const CurrencyListItem=({title,onPress,backgroundColor, textColor})=>{
    return(
    <TouchableOpacity 
        style={[styles.container,backgroundColor]}
        onPress={onPress}
        >
        <Text style={[styles.title,textColor]}>{title}</Text>
    </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    container:{
        padding: 20,
        margin:12,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#E9F6EF"
        
    },
    title: {
        fontSize: 24,
        fontWeight:'600',
        color:'black',
        textAlign:'center'
      },
});
export default CurrencyListItem;