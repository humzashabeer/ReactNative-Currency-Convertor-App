import { View,StyleSheet,Text, TextInput, TouchableOpacity, Modal, Button, FlatList } from "react-native"
import React,{useState,useEffect} from "react";
import CurrencyListItem from "../components/CurrencyListItem";
import Constants from "../models/Constants";
import CurrencyItem from "../components/CurrencyItem";

const ConverterScreen=()=>{
    const [amountTextInput,setAmountText] = useState('');
    const [currency,setCurrency] = useState("Select Currency");
    const [showModal,setShowModal] = useState(false);

    const [rates,setRates] = useState([]);

    const [currencyData,setCurrencyData] = useState([]);

    const [selectedSymbol,setSelectedSymbol]=useState('USD');
    const [selectedRate,setSelectedRate]=useState(1);
 
    const getCurrencyRates = async () => {
        try {
          const response = await fetch(Constants.KfetchLatestRatesApi+"?app_id="+Constants.KappId);
          const json = await response.json();

          var rates = []
          let result = Object.entries(json.rates);

          result.forEach((item)=>{
            const value = item[1];
            const key = item[0];
            rates.push({symbol: key, rate: value});
          })
          console.log(rates);
          setCurrencyData(rates);
          
        } catch (error) {
          console.error(error);
        } finally {
        //   setLoading(false);
        }
      };
      
      useEffect(() => {
        getCurrencyRates();
      }, []);
      
      function selectedItem({item}) {
        setSelectedSymbol(prev => prev = item.symbol);
        setSelectedRate(item.rate);
    }

    function calculateRates() {
        setCurrency(selectedSymbol);
        var rt = []
        const sourceToUSD = amountTextInput/selectedRate;
        currencyData.forEach((item)=>{
            const val = item.rate*sourceToUSD
            rt.push({symbol: item.symbol, rate: val});
        })
        setShowModal(false);
        setRates(rt);
    }

    const renderItem = ({ item }) =>{
        const backgroundColor = item.symbol === selectedSymbol ? 'gray' : '#E9F6EF';
        const color = item.symbol === selectedSymbol ? 'white' : 'black';

        return(<CurrencyListItem title={item.symbol} backgroundColor={{backgroundColor}} textColor={{color}} onPress={()=>{
            selectedItem(item={item});
        }}/>)
    };

    const renderCurrencyItem = ({ item }) =>{
        return(<CurrencyItem symbol={item.symbol} rate={item.rate}/>)
    };

    const CurrencyList=()=>(
        <View style={styles.currencyListContainer}>
            <View style={styles.toolBarContainer}>
                <Button title="Cancel" onPress={()=>{
                    setShowModal(false);
                }}/>
                <Button title="Convert" onPress={()=>{
                    calculateRates();
                }}/>
            </View>
            <FlatList
            data={currencyData}
            renderItem={renderItem}
            keyExtractor={(item)=> item.symbol}
            extraData={selectedSymbol}
            />
        </View>
    )

    return(
        <View style={styles.container}>
            <Text style={styles.TextStyle}> Currency Convertor </Text>
            <TextInput  
            style={styles.InputFieldsStyle} 
            value={amountTextInput}
            onChangeText={setAmountText}
            placeholder="Enter Amount"
            keyboardType='number-pad'
            />
            <TouchableOpacity 
                style={styles.InputFieldsStyle}
                onPress={()=>{
                    setShowModal(true)
                }}
            >
                <Text>{currency}</Text>
            </TouchableOpacity>
            <FlatList
            data={rates}
            renderItem={renderCurrencyItem}
            keyExtractor={(item)=> item.symbol}
            extraData={rates}
            />
            <Modal 
            visible={showModal} 
            transparent={true}
            animationType="slide"
            >
                <CurrencyList/>
            </Modal>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center'
    },
    InputFieldsStyle:{
        height: 50,
        marginTop:10,
        marginStart: 20,
        marginEnd:20,
        padding:12,
        borderWidth: 1,
        borderRadius:12,
        color:'black',
        backgroundColor:'gray',
        lineHeight:13
      },
      currencyListContainer:{
        flex: 1,
        justifyContent: "center",
        marginTop: 150,
        backgroundColor:'white'
      },
      toolBarContainer:{
          height:60,
          flexDirection:'row',
          justifyContent:'space-around',
          alignItems:'center',
          backgroundColor:'#E9F6EF'
          
      },
      TextStyle:{

        fontSize:30,
        fontWeight:'bold',
        margin:30
      }
})

export default ConverterScreen;