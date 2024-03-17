import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchQuestions = createAsyncThunk(
  'game/fetchQuestions',
  async () => {
    const response = await fetch(
      'https://the-trivia-api.com/v2/questions?difficulties=easy',
    );
    if (!response.ok) {
      throw new Error('Failed to fetch trivia questions');
    }
    const data = await response.json();
    return data;
  },
);
