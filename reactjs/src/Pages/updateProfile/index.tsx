import React, { useState, useEffect } from 'react';
import { Button, Container } from '@mui/material';
import TextInput from '../../common/TextInput';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateUserProfile } from '../../redux/services/authService';
import { Heading } from '../../common/Heading';

const UpdateProfile: React.FC = () => {
    const [formData, setFormData] = useState({
        name:"",
        email: '',
        phone: '',
        mobile: '',
        zipCode: '',
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.user);

    useEffect(() => {
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            mobile: user.mobile || '',
            zipCode: user.zipCode || '',
        });
    }, [user]);

    const handleChange = (name: string) => (value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(formData)
            await dispatch(updateUserProfile(formData)).unwrap();
            navigate('/profile');
        } catch (error) {
            console.error("error", error);
        }
    };

    return (
        <Container maxWidth="sm">
           <Heading label='update profile'/>
            <form onSubmit={handleSubmit}>
                <TextInput type="text" label="Name" value={formData.name} update={handleChange('name')} />
                <TextInput type="email" label="Email" value={formData.email} update={handleChange('email')} />
                <TextInput label="Phone" value={formData.phone} update={handleChange('phone')} />
                <TextInput label="Mobile" value={formData.mobile} update={handleChange('mobile')} />
                <TextInput label="Zip Code" value={formData.zipCode} update={handleChange('zipCode')} />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update Profile
                </Button>
            </form>
        </Container>
    );
};

export default UpdateProfile;
