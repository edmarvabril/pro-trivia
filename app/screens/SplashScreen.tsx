import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';
import {moderateScale} from 'react-native-size-matters';

import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const AnimatedLogo = require('../assets/logo.json');

export const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // hardoded "loading time"
    setTimeout(() => {
      navigation.navigate('WelcomeScreen');
    }, 3500);
  }, [navigation]);

  return (
    <View style={[styles.container]}>
      <View style={[styles.brandContainer]}>
        <LottieView source={AnimatedLogo} style={styles.logo} autoPlay loop />
        <Text style={[styles.brandName]}>Pro-Trivia</Text>
      </View>
      <SafeAreaView style={styles.footerContainer}>
        <Text style={styles.companyName}>Pro-Solutions Technology, Co.</Text>
        <Text style={styles.authorName}>
          A Sample App Project By Edmarv Allen Abril
        </Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    flex: 1,
  },
  brandContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: moderateScale(250),
  },
  footerContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  },
  brandName: {
    color: colors.beige,
    fontSize: typography.xl,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginTop: moderateScale(-30),
  },
  companyName: {
    fontSize: typography.sm,
    color: colors.beige,
  },
  authorName: {
    fontSize: typography.xs,
    color: colors.beige,
    marginTop: moderateScale(5),
  },
  logo: {
    width: moderateScale(250),
    height: moderateScale(250),
  },
});
