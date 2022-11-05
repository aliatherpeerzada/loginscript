import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../conts/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const Input = ({ label,
    iconName,
    error,
    password,
    onFocus = () => { },
    ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
const [hidePassword,setHidePassword]=useState(password);
    return (
        <View style={{ marginBottom: 20 }}>

            <Text style={styles.label}>{label}</Text>

            <View style={[styles.inputContainer,
            {
                borderColor: error
                    ? COLORS.red
                    : isFocused
                        ? COLORS.darkBlue
                        : COLORS.light
            }]}>
                <Icon name={iconName}
                    style={styles.icon} />
                <TextInput 
                secureTextEntry={hidePassword}

                {...props}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true)
                    }}

                    onBlur={() => {
                        setIsFocused(false)
                    }}

                    style={styles.inputField}
                />
          {password && (
            <Icon style={{fontSize:22,color:COLORS.darkBlue}}
            onPress={()=>setHidePassword(!hidePassword)}
            name={hidePassword?'eye-outline':'eye-off-outline'}/>
          )}
            
          
          
            </View>

            {error && (           <Text style={styles.error}>{error}</Text>
 )}
        </View>
    )
}

const styles = StyleSheet.create({

    inputContainer: {
        height: 55,
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        alignItems: 'center'
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: COLORS.grey
    },
    icon: {
        fontSize: 22,
        color: COLORS.darkBlue,
        marginRight: 10,

    },
    inputField: {
        fontSize:16,
        color: COLORS.darkBlue,
        flex: 1
    },
    error:{
        color:COLORS.red,
        fontSize:12,
        marginTop:7
    }
})
export default Input