const API_URL = 'http://10.84.205.65:5000/api';

export const api = {
  register: async (
    name: string,
    email: string,
    password: string
  ) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    return response.json();
  },

  login: async (
    email: string,
    password: string
  ) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return response.json();
  },


  getQuizByLesson: async (lessonId: string) => {
  const response = await fetch(
    `${API_URL}/quizzes/lesson/${lessonId}`
  );

  return response.json();
},

submitQuiz: async (
    quizId: string,
    answers: number[],
    token: string
  ) => {
    const response = await fetch(
      `${API_URL}/quizzes/${quizId}/submit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          answers,
        }),
      }
    );

    return response.json();
  },

  getProfile: async (token: string) => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  },

  getProgress: async (token: string) => {
    const response = await fetch(`${API_URL}/progress`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  },

  getLessons: async () => {
    const response = await fetch(`${API_URL}/lessons`);
    return response.json();
  },

  getLesson: async (lessonId: string) => {
    const response = await fetch(
      `${API_URL}/lessons/${lessonId}`
    );
    return response.json();
  },

  getQuiz: async (quizId: string) => {
  const response = await fetch(
    `${API_URL}/quizzes/${quizId}`
  );

  return response.json();
},
};