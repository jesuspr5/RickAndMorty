import React, { useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { characterActions } from "../../application/actions/entities/character";
import { modalInfoActions } from "../../application/actions/ui/modalInfo";
import Carousel from 'react-native-snap-carousel';


export function Characters(params) {
    const characters = useSelector(store => store.entities.character.character);


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(characterActions.fetchCharacters())
    }, []);

    useEffect(() => {
        if (characters.success) {
            dispatch(modalInfoActions.closeModal())
        }
    }, [characters.success])
    // const characterNames = characters.data ? characters.data.map(character => character.name) : [];
    const characterData = characters.data || []; // Ensure characterData is an array

    const renderItem = ({ item, index }) => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: item.image }} style={{ width: 300, height: 300 }} />

            <Text>{item.name}</Text>
            <Text>{item.species}</Text>
            <Text>{item.gender}</Text>
        </View>
    );
    return (

        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Carousel
                    layout={"default"}
                    data={characterData}
                    sliderWidth={400}
                    itemWidth={250}
                    renderItem={renderItem}
                />
            </View>

        </ScrollView>

    )
}