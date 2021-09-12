import React from 'react';
import { ButtonOpacity, Title } from './style'
import { TouchableOpacityProps } from 'react-native';

//type ButtonProps = TouchableOpacityProps

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title,...rest }: ButtonProps) {
  return (
    <ButtonOpacity
      activeOpacity={0.4}
      {...rest}
    >
      <Title>
        {title}
      </Title>
    </ButtonOpacity>
  )
}

