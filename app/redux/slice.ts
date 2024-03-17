import {createSlice} from '@reduxjs/toolkit';
import {fetchQuestions} from './thunk';

export interface Question {
  category: string;
  id: string;
  text: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: {
    text: string;
  };
}

interface GameState {
  questions: Question[];
  currentQuestionNumber: number;
  score: number;
  isFetchingQuestions: boolean;
  error: string | null;
  nickname: string;
  avatarUrl: string;
}

const initialState: GameState = {
  questions: [],
  currentQuestionNumber: 0,
  score: 0,
  isFetchingQuestions: false,
  error: null,
  nickname: '',
  avatarUrl: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentQuestionNumber(state, action) {
      state.currentQuestionNumber = action.payload;
    },
    increaseScore(state) {
      state.score += 1;
    },
    setSelectedNickname(state, action) {
      state.nickname = action.payload;
    },
    setSelectedAvatarUrl(state, action) {
      state.avatarUrl = action.payload;
    },
    resetGame(state) {
      state.questions = [];
      state.currentQuestionNumber = 0;
      state.score = 0;
      state.isFetchingQuestions = false;
      state.error = null;
      state.nickname = '';
      state.avatarUrl = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchQuestions.pending, state => {
        state.isFetchingQuestions = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.isFetchingQuestions = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.isFetchingQuestions = false;
        state.error =
          action.error.message || 'Failed to fetch trivia questions';
      });
  },
});

export const {
  setCurrentQuestionNumber,
  increaseScore,
  setSelectedNickname,
  setSelectedAvatarUrl,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
