import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ButtonGroup } from '@rneui/themed';
export default function Question({ route, navigation }){
  const { data, index, userAnswers } = route.params;
  const question = data[index];
  const [selectedIndex, setSelectedIndex] = useState(
    question.type === 'multiple-answer' ? [] : null
  );
  const isMultipleAnswer = question.type === 'multiple-answer';
  const handleSelect = (i) =>{
    if (isMultipleAnswer) {
      setSelectedIndex(prev =>
        prev.includes(i)
          ? prev.filter(item => item !== i)
          : [...prev, i]
      );
    } else {
      setSelectedIndex(i);
    }
  };
  const handleNext = () =>{
    const updatedAnswers = [...userAnswers, selectedIndex];
    if (index + 1 < data.length) {
      navigation.replace('Question', {
        data,
        index: index + 1,
        userAnswers: updatedAnswers
      });
    } else {
      navigation.replace('Summary', {
        data,
        userAnswers: updatedAnswers
      });
    }
  };
  return (
    <View>
      <Text>{question.prompt}</Text>
      <ButtonGroup
        buttons={question.choices}
        vertical
        onPress={handleSelect}
        selectedIndexes={isMultipleAnswer ? selectedIndex : undefined}
        selectedIndex={!isMultipleAnswer ? selectedIndex : undefined}
        testID="choices"
      />
      <Button
        title="Next"
        testID="next-question"
        onPress={handleNext}
        disabled={
          isMultipleAnswer
            ? selectedIndex.length === 0
            : selectedIndex === null
        }
      />
    </View>
  );
}