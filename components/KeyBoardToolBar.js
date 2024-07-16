import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

const KeyBoardToolBar = () => {

    const toolBarList = [
        {
            id:1,
            name:'quote',
            activePath:require('../assets/quote-tool-active.png'),
            inActivePath:require('../assets/quote-tool-inactive.png'),
        },
        
        {
            id:2,
            name:'quote',
            activePath:require('../assets/quote-tool-active.png'),
            inActivePath:require('../assets/calendar-tool-inactive.png'),
        },
        {
            id:3,
            name:'quote',
            activePath:require('../assets/quote-tool-active.png'),
            inActivePath:require('../assets/clock-tool-inactive.png'),
        },
        {
            id:4,

            name:'quote',
            activePath:require('../assets/quote-tool-active.png'),
            inActivePath:require('../assets/tea-tool-inactive.png'),
        },
        {
            id:5,

            name:'quote',
            activePath:require('../assets/quote-tool-active.png'),
            inActivePath:require('../assets/money-tool-inactive.png'),
        },
        
    ]

    const [highlightedId, setHighlightedId] = useState(1)

  return (

    <View 
        className=" py-2 px-4 flex-row items-center "

            style={{
                height:50,
                transform: [{ translateY: 12 }],
                backgroundColor:'#F3F4F7'
            }}>
                {
                    toolBarList.map((toolItem, index)=>(
                        <ToolItem 
                            toolItem={toolItem}
                            key={index}
                            ifHighlighted={highlightedId === toolItem.id}
                            setHighlightedId={setHighlightedId}
                        />
                    ))
                }
            </View>
  )
}

const ToolItem = ({ifHighlighted, ifActive, toolItem, setHighlightedId})=>{

    return (
       <>
       {
        ifHighlighted ? (
            <TouchableOpacity
            
            className="mr-2 flex justify-center items-center"
                style={{
                    width:46,
                    height:34,
                    borderRadius:10,
                    backgroundColor:'#D0D5DF' 
                }}
            >
                <Image 
                style={{
                    width:22,
                    height:22
                }}
                    source={toolItem.activePath}
    
                />
            </TouchableOpacity>
        ):(
            <TouchableOpacity

            onPress={()=>{
                setHighlightedId(toolItem.id)
            }}
            className="mr-2 flex justify-center items-center"
                style={{
                    width:46,
                    height:34,
                    borderRadius:10,
                    backgroundColor: 'transparent' 
                }}
            >
                 {
                    ifActive ? (
                        <Image 
                        style={{
                            width:22,
                            height:22
                        }}
                            source={toolItem.activePath}
            
                        />
                    ):(
                        <Image 
                        style={{
                            width:22,
                            height:22
                        }}
                            source={toolItem.inActivePath}
            
                        />
                    )
                 }
            </TouchableOpacity>
        )
       }
       </>
    )
}

export default KeyBoardToolBar