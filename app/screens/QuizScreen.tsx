import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {fetchQuestions} from '../redux/thunk';
import {
  increaseScore,
  setCurrentQuestionNumber,
  resetGame,
} from '../redux/slice';
import {shuffle} from 'lodash';
import {colors} from '../styles/colors';
import {moderateScale} from 'react-native-size-matters';
import {typography} from '../styles/typography';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {shuffleArray} from '../helpers/helper';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/core';

const AnimatedLogo = require('../assets/logo.json');

const timerValue = 30;

export const QuizScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const currentQuestionNumber = useSelector(
    (state: RootState) => state.game.currentQuestionNumber,
  );
  const questions = useSelector((state: RootState) => state.game.questions);
  const nickname = useSelector((state: RootState) => state.game.nickname);
  const avatarUrl = useSelector((state: RootState) => state.game.avatarUrl);
  const isLoading = useSelector(
    (state: RootState) => state.game.isFetchingQuestions,
  );
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timer, setTimer] = useState(timerValue); // Initial timer value set to 30 seconds

  const buttonBackgroundColor = useSharedValue(colors.blue); // Initial background color of the button

  const handleNextQuestion = useCallback(() => {
    setSelectedOption(null);
    setTimer(timerValue);
    dispatch(setCurrentQuestionNumber(currentQuestionNumber + 1));
  }, [currentQuestionNumber, dispatch]);

  useEffect(() => {
    dispatch(fetchQuestions());
    return () => {
      dispatch(resetGame());
    };
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentQuestionNumber]);

  // Effect to move to the next question when the timer reaches 0
  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
  }, [handleNextQuestion, timer]);

  useEffect(() => {
    if (currentQuestionNumber >= 10) {
      navigation.navigate('ScoreScreen');
    }
  }, [currentQuestionNumber, navigation]);

  useEffect(() => {
    if (questions[currentQuestionNumber]) {
      const options = [
        questions[currentQuestionNumber]?.correctAnswer,
        ...questions[currentQuestionNumber]?.incorrectAnswers,
      ];
      const shuffledOptionsArray = shuffleArray(options);
      setShuffledOptions(shuffledOptionsArray);
    }
  }, [currentQuestionNumber, questions]);

  const handleAnswerSelection = (selected: string) => {
    setSelectedOption(selected);
    const currentQuestion = questions[currentQuestionNumber];

    // Check if the selected option is the correct answer
    const isCorrectAnswer = selected === currentQuestion.correctAnswer;

    if (isCorrectAnswer) {
      // If the selected option is correct, increase the score
      buttonBackgroundColor.value = withTiming(colors.green, {duration: 500});
      dispatch(increaseScore());
    } else {
      // incorrect
      buttonBackgroundColor.value = withTiming(colors.red, {duration: 500});
    }

    // Proceed to the next question
    setTimeout(() => {
      setSelectedOption(null);
      setTimer(timerValue);
      dispatch(setCurrentQuestionNumber(currentQuestionNumber + 1));
    }, 800);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const renderAnswerButton = (option: string, index: number) => {
    const isSelected = option === selectedOption;
    const isCorrect =
      option === questions[currentQuestionNumber]?.correctAnswer;

    return (
      <Animatable.View
        key={index}
        animation={isSelected ? (isCorrect ? 'bounceIn' : 'shake') : undefined}
        duration={isSelected ? 500 : 0}
        style={[
          styles.answerButtonContainer,
          isSelected && {
            backgroundColor: isCorrect ? colors.green : colors.red,
          },
        ]}>
        <TouchableOpacity
          style={styles.answerButton}
          onPress={() => handleAnswerSelection(option)}
          disabled={isSelected}>
          <Text style={styles.answerButtonText}>{option}</Text>
        </TouchableOpacity>
        {isSelected && (
          <Icon
            name={isCorrect ? 'lightbulb-on' : 'lightbulb'}
            size={30}
            color={isCorrect ? colors.yellow : colors.orange}
            style={{position: 'absolute', right: 0}}
          />
        )}
      </Animatable.View>
    );
  };

  const timerColor = () => {
    if (timer <= timerValue / 4) {
      return colors.red;
    } else if (timer <= timerValue / 2) {
      return colors.orange;
    } else {
      return colors.blue;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.timer, {color: timerColor()}]}>{timer}</Text>

      <Image source={{uri: avatarUrl}} style={[styles.avatar]} />
      <Text style={styles.name}>{nickname}</Text>
      <Text style={styles.question}>
        {currentQuestionNumber + 1}/{questions.length}
      </Text>
      <Text style={styles.questionText}>
        {questions[currentQuestionNumber]?.question.text}
      </Text>
      {/* Display shuffled answer options */}
      {shuffledOptions.map((option, index) =>
        renderAnswerButton(option, index),
      )}

      <LottieView source={AnimatedLogo} style={styles.logo} autoPlay loop />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.beige,
    paddingHorizontal: 15,
  },
  name: {
    fontSize: typography.lg,
    marginBottom: 10,
    fontWeight: 'bold',
    letterSpacing: 1.3,
    color: colors.darkgrey,
  },
  question: {
    fontSize: typography.lg,
    letterSpacing: 1.5,
    color: colors.darkgrey,
    fontWeight: '500',
  },
  questionText: {
    fontSize: typography.md,
    marginBottom: 14,
    textAlign: 'center',
    color: colors.blue,
    fontWeight: '500',
  },
  avatar: {
    height: 160,
    width: 160,
    borderRadius: 160 / 2,
    borderWidth: 5,
    borderColor: colors.teal,
    margin: moderateScale(3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
  },
  logo: {
    width: moderateScale(160),
    height: moderateScale(160),
  },
  selectedAnswerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answerButtonContainer: {
    backgroundColor: colors.blue,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerButton: {
    width: '100%',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  answerButtonText: {
    color: 'white',
    fontSize: typography.md,
  },
  timer: {
    fontSize: moderateScale(40),
    fontWeight: '500',
    position: 'absolute',
    top: 10,
    right: 15,
  },
});
