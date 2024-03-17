import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import {resetGame} from '../redux/slice';
import {colors} from '../styles/colors';
import {useNavigation} from '@react-navigation/core';

export const ScoreScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const score = useSelector((state: RootState) => state.game.score);
  const nickname = useSelector((state: RootState) => state.game.nickname);
  const avatarUrl = useSelector((state: RootState) => state.game.avatarUrl);

  const handleRestartGame = () => {
    dispatch(resetGame());
    navigation.navigate('WelcomeScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: avatarUrl}} style={styles.avatar} />
      <Text style={styles.nickname}>{nickname}</Text>
      <Text style={styles.scoreText}>You scored {score} out of 10!</Text>
      <TouchableOpacity
        style={styles.restartButton}
        onPress={handleRestartGame}>
        <Text style={styles.restartButtonText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.beige,
    paddingHorizontal: 15,
  },
  avatar: {
    height: 160,
    width: 160,
    borderRadius: 80,
    marginBottom: 20,
  },
  nickname: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: colors.blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
