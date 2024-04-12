import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import TextInput from '../../common/TextInput';
import { userLogin } from '../../redux/services/authService';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../../common/Heading';
import useSnackbar from '../../hooks/useSnackbar';
const initialState = {
    email: '',
    password: '',
}
const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState(initialState);
    const { showSnackbar, SnackbarComponent } = useSnackbar();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleChange = (name: string) => (value: string) => {
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(userLogin(formData)).unwrap().then(data => {
            if (data.success) navigate("/home", { replace: true })
        }).catch((error) => {
            showSnackbar(String(error), "error")
        })
    };
    return <Container maxWidth="sm">
        <Heading label='Login' />
        <form onSubmit={handleSubmit}>
            <TextInput type="email" label="Email" value={formData.email} update={handleChange('email')} />
            <TextInput type="password" label="Password" value={formData.password} update={handleChange('password')} />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
            </Button>
        </form>
        {SnackbarComponent}
    </Container>
};
export default LoginForm;
