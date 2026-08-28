# Financial Literacy Mobile Application using Gamification

## Introduction

Financial literacy is an important skill for students and young adults because they increasingly make decisions related to spending, saving, budgeting, and credit.

However, traditional financial education can be difficult to sustain because it often lacks interaction and continuous engagement.

The proposed solution is a mobile-based financial learning platform that combines financial education with gamification to make learning interactive, accessible, and engaging.

## Problem Statement

Many students and young adults lack practical financial knowledge, resulting in poor budgeting, saving, and credit-related decisions.

The proposed application addresses this problem by providing structured financial education through interactive learning modules, quizzes, challenges, and gamification.

## Objectives

- Provide bite-sized financial learning modules.
- Cover budgeting, saving, credit, and investing.
- Use quizzes and challenges to reinforce learning.
- Track the user's learning progress.
- Calculate a personalized financial literacy score.
- Use XP, levels, badges, and streaks to encourage regular learning.
- Provide a leaderboard to increase engagement.

## Financial Learning Areas

The application focuses on the following financial topics:

- Budgeting
- Saving
- Credit
- Investing

## Learning and Assessment

The application is designed to provide:

- Bite-sized financial learning modules.
- Interactive quizzes.
- Challenges to reinforce financial concepts.
- Quiz scores and feedback.
- Learning progress tracking.

## Gamification

Gamification is used to make financial learning more engaging and interactive.

The planned gamification features include:

- XP
- Points
- Levels
- Badges
- Streaks
- Leaderboard

## Progress Monitoring

The application is designed to track:

- Learning completion
- Quiz performance
- User progress
- Financial literacy score

The collected progress information will be used to provide a personalized view of the user's financial learning journey.

## Authentication

The authentication module has currently been implemented to provide secure user access.

### Implemented Features

- User registration
- User login
- Duplicate email validation
- Password hashing using bcrypt
- JWT-based authentication
- MongoDB database integration
- Login error handling
- Registration error handling

### Registration Flow

```text
User
 ↓
Registration Form
 ↓
Backend API
 ↓
Check Existing Email
 ↓
 ┌─────────────────────┐
 │                     │
Already Exists       New User
 │                     │
 ↓                     ↓
Error Message       Hash Password
"Email already      ↓
registered"         Save to MongoDB
                       ↓
                    Generate JWT
                       ↓
                    Response
