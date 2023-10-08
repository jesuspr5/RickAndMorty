import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { characterActions } from "../../application/actions/entities/character";
import { modalInfoActions } from "../../application/actions/ui/modalInfo";
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
    const characterNames = characters.data ? characters.data.map(character => character.name) : [];


    return (
        <View>
            {characterNames.map((name, index) => (
                <Text key={index}>{name}</Text>
            ))}
        </View>
    )
}