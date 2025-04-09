import React from 'react';
import { View, Text } from 'react-native';
export default function Summary({ route }){
  const { data, userAnswers } = route.params;
  let score = 0;
  const isCorrect = (question, userAnswer) =>{
    if (Array.isArray(question.correct)) {
      return (
        Array.isArray(userAnswer) &&
        userAnswer.length === question.correct.length &&
        userAnswer.every((val) => question.correct.includes(val))
      );
    } else {
      return userAnswer === question.correct;
    }
  };
  return (
    <View>
      <Text testID="total">
        Total Score:{" "}
        {
          data.filter((q, i) => isCorrect(q, userAnswers[i])).length
        } / {data.length}
      </Text>
      {data.map((question, i) =>{
        const userAnswer = userAnswers[i];
        const correctAnswer = question.correct;
        const isMulti = Array.isArray(correctAnswer);
        const getStyle = (choiceIndex) =>{
          if (
            (isMulti && userAnswer?.includes(choiceIndex)) ||
            (!isMulti && userAnswer === choiceIndex)
          ) {
            if (
              (isMulti && correctAnswer.includes(choiceIndex)) ||
              (!isMulti && correctAnswer === choiceIndex)
            ) {
              return { fontWeight: 'bold' };
            } else {
              return { textDecorationLine: 'line-through' };
            }
          }
          return {};
        };
        return (
          <View key={i} style={{ marginTop: 20 }}>
            <Text>{question.prompt}</Text>
            {question.choices.map((choice, idx) => (
              <Text key={idx} style={getStyle(idx)}>
                {choice}
              </Text>
            ))}
          </View>
        );
      })}
    </View>
  );
}