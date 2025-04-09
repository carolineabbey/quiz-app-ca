import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Question from './components/Question';
import Summary from './components/Summary';
const Stack = createNativeStackNavigator();
const questions = [
  {
    prompt: "What is the capitol of Florida?",
    type: "multiple-choice",
    choices: ["Orlando", "Tallahassee", "Tampa", "Miami"],
    correct: 1 
  },
  {
    prompt: "Select all places that are located in Florida.",
    type: "multiple-answer",
    choices: ["The Everglades", "The Great Lakes", "Walt Disney World", "The Grand Canyon"],
    correct: [0, 2] 
  },
  {
    prompt: "Florida shares a border with Virginia.",
    type: "true-false",
    choices: ["True", "False"],
    correct: 1 
  }
];
export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Question"
          component={Question}
          initialParams={{ data: questions, index: 0, userAnswers: [] }}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen name="Summary" component={Summary}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
