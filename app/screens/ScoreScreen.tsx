import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import {resetGame} from '../redux/slice';
import {colors} from '../styles/colors';
import {useNavigation} from '@react-navigation/core';
import {typography} from '../styles/typography';
import * as Animatable from 'react-native-animatable';

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
      <Animatable.Image
        animation="bounce"
        iterationCount="infinite"
        source={{uri: avatarUrl}}
        style={styles.avatar}
      />
      <Text style={styles.nickname}>{nickname}</Text>
      <Text style={styles.scoreText}>You scored {score} out of 10!</Text>
      <Animatable.View animation="pulse" iterationCount="infinite">
        <TouchableOpacity
          style={styles.restartButton}
          onPress={handleRestartGame}>
          <Text style={styles.restartButtonText}>Restart Game</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pink,
    paddingHorizontal: 15,
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: colors.blue,
  },
  nickname: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.darkgrey,
  },
  scoreText: {
    fontSize: typography.xl,
    marginBottom: 20,
    color: colors.darkgrey,
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
