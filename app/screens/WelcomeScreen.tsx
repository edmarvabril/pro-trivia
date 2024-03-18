import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {colors} from '../styles/colors';
import {moderateScale} from 'react-native-size-matters';
import {typography} from '../styles/typography';
import LottieView from 'lottie-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {setSelectedNickname, setSelectedAvatarUrl} from '../redux/slice';
import {useNavigation} from '@react-navigation/native';
import {CustomAlert} from '../components/CustomAlert';
import * as Animatable from 'react-native-animatable';
import Sound from 'react-native-sound';

const bgSound = new Sound('bgm.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('Error loading sound: ', error);
  }
});

const startSound = new Sound('start.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('Error loading sound: ', error);
  }
});

const tapSound = new Sound('tap.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('Error loading sound: ', error);
  }
});

const avatarUrls = Array.from(
  {length: 20},
  (_, index) => `https://api.multiavatar.com/prosol${index}.png`,
);

export const WelcomeScreen = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>();
  const [nickname, setNickname] = useState<string | undefined>();
  const [showAlert, setShowAlert] = useState(false);

  const scale = useSharedValue(1);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  bgSound.setNumberOfLoops(-1);

  useEffect(() => {
    bgSound.play();
    return () => {
      bgSound.stop();
    };
  }, []);

  // Function to start the pulsing animation
  const startPulseAnimation = useCallback(() => {
    scale.value = withRepeat(
      withTiming(1.3, {duration: 500}),
      -1, // -1 means infinite repeat
      true, // reverse: true will repeat the animation in reverse
    );
  }, [scale]);

  // Function to stop the pulsing animation
  const stopPulseAnimation = useCallback(() => {
    scale.value = withTiming(1);
  }, [scale]);

  // Animated style for the button
  const animatedPulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const setAvatar = useCallback(
    (selected: string) => {
      if (selected === selectedAvatar) {
        setSelectedAvatar(undefined);
      } else {
        setSelectedAvatar(selected);
      }
    },
    [selectedAvatar],
  );

  const renderAvatar = useCallback(
    (avatarUrl: string) => {
      const isSelected = selectedAvatar === avatarUrl;

      return (
        <Animated.View style={[isSelected && animatedPulseStyle]}>
          <TouchableOpacity
            onPress={() => {
              tapSound.play();
              setAvatar(avatarUrl);
            }}
            onPressIn={startPulseAnimation}
            onPressOut={stopPulseAnimation}>
            <Image
              source={{uri: avatarUrl}}
              style={[styles.avatar, isSelected && styles.isSelectedAvatar]}
            />
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [
      animatedPulseStyle,
      selectedAvatar,
      setAvatar,
      startPulseAnimation,
      stopPulseAnimation,
    ],
  );

  const handleStartGame = useCallback(() => {
    if (nickname && selectedAvatar) {
      startSound.play();
      // set the nickname and avatar URL in the Redux store
      dispatch(setSelectedNickname(nickname!));
      dispatch(setSelectedAvatarUrl(selectedAvatar!));

      // Navigate to the Quiz screen
      navigation.navigate('QuizScreen');
    } else {
      setShowAlert(true);
    }
  }, [dispatch, navigation, nickname, selectedAvatar]);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.Text
        animation="tada"
        iterationCount="infinite"
        duration={2500}
        style={styles.title}>
        Welcome to Pro-Trivia
      </Animatable.Text>
      {selectedAvatar ? (
        <Animated.Image
          source={{uri: selectedAvatar}}
          style={[styles.selectedAvatar, animatedPulseStyle]}
        />
      ) : (
        <View style={[styles.selectedAvatar]}>
          <Text style={[styles.avatarText]}>PICK YOUR AVATAR</Text>
        </View>
      )}

      <TextInput
        placeholder="NICKNAME"
        style={styles.nicknameInput}
        value={nickname}
        autoCapitalize="none"
        onChangeText={setNickname}
      />
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={1500}>
        <TouchableOpacity onPress={handleStartGame} style={[styles.playButton]}>
          <Text style={styles.playButtonText}>PLAY</Text>
        </TouchableOpacity>
      </Animatable.View>
      <KeyboardAvoidingView>
        <FlatList
          scrollEnabled={false}
          numColumns={5}
          data={avatarUrls}
          renderItem={({item}) => renderAvatar(item)}
        />
      </KeyboardAvoidingView>
      <CustomAlert visible={showAlert} onClose={() => setShowAlert(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orange,
    alignItems: 'center',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    borderWidth: 1,
    borderColor: colors.teal,
    margin: moderateScale(3),
    opacity: 0.5,
  },
  isSelectedAvatar: {
    borderWidth: 5,
    opacity: 1,
  },
  title: {
    fontSize: typography.xl,
    color: colors.blue,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: moderateScale(40),
    marginBottom: moderateScale(10),
  },
  nicknameInput: {
    backgroundColor: colors.white,
    width: '50%',
    textAlign: 'center',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    fontSize: typography.lg,
    borderRadius: 5,
    padding: moderateScale(5),
  },
  selectedAvatar: {
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
  avatarText: {
    fontSize: typography.md,
    color: colors.beige,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  playButton: {
    backgroundColor: colors.green,
    paddingHorizontal: moderateScale(50),
    paddingVertical: moderateScale(10),
    borderRadius: 5,
    marginBottom: moderateScale(20),
  },
  playButtonText: {
    fontSize: typography.lg,
    color: colors.white,
    letterSpacing: 2,
    fontWeight: '600',
  },
});
