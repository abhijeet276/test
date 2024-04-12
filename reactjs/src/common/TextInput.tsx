import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface ITextInput {
    label: string;
    value: string;
    update: (value: string) => void;
}
export type TextInputProps = ITextInput & TextFieldProps;

const TextInput: React.FC<TextInputProps> = ({ label, update, size = "small", ...props }) => {
    return (
        <TextField
            label={label}
            fullWidth
            size={size}
            margin="normal"
            variant="outlined"
            onChange={(e) => update(e.target.value)}
            {...props}
        />
    );
};

export default TextInput;