import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import TextInput from '../../common/TextInput';
import { UserResponse } from '../../../types/IUser';
import { useNavigate } from 'react-router-dom';
import useGeolocation from '../../hooks/useGeoLocation';
import { useAppDispatch } from '../../redux/hooks';
import { userSignup } from '../../redux/services/authService';
import { Heading } from '../../common/Heading';
import useSnackbar from '../../hooks/useSnackbar';
const initialState = {
    name: '',
    email: '',
    password: '',
    phone: '',
    mobile: '',
    zipCode: '',
}
const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState(initialState);
    const { loaded, coordinates, error } = useGeolocation();
    const { showSnackbar, SnackbarComponent } = useSnackbar();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleChange = (name: string) => (value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(userSignup({ ...formData, lang: coordinates?.longitude, lat: coordinates?.latitude })).unwrap().then(data => {
            if (data.success) navigate("/login");
        }).catch((error) => {
            showSnackbar(String(error), "error")
        })
    };
    return (
        <Container maxWidth="sm">
            <Heading label='Register' />
            <form onSubmit={handleSubmit}>
                <TextInput label="Name" value={formData.name} update={handleChange('name')} />
                <TextInput type="email" label="Email" value={formData.email} update={handleChange('email')} />
                <TextInput type="password" label="Password" value={formData.password} update={handleChange('password')} />
                <TextInput label="Phone" value={formData.phone} update={handleChange('phone')} />
                <TextInput label="Mobile" value={formData.mobile} update={handleChange('mobile')} />
                <TextInput label="Zip Code" value={formData.zipCode} update={handleChange('zipCode')} />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
            </form>
            {SnackbarComponent}
        </Container>
    );
};

export default RegisterForm;
