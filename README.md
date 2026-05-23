# TodoApp

A simple To-Do application built with React Native and Expo.

## Features

- Add and delete tasks
- Mark tasks as completed
- Set task priority (High / Medium / Low)
- Change priority of existing tasks by tapping the colored dot
- Filter tasks by All / Active / Done
- Progress bar showing completion percentage
- Data persistence with AsyncStorage

## Tech Stack

- React Native
- Expo
- TypeScript
- AsyncStorage

## Getting Started

```bash
npm install
npx expo start
```

Then scan the QR code with Expo Go (iOS / Android) or press `i` for iOS simulator.

## Project Structure

```
src/
  app/
    index.tsx       # Main screen
    _layout.tsx     # Root layout
  components/
    TaskItem.tsx    # Single task component
  constants/
    colors.ts       # Theme colors
    types.ts        # Shared types
  hooks/
    useTasks.ts     # Task logic + AsyncStorage
```
