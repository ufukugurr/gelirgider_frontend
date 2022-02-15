import * as React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import http from '../services/http';
import { Navigation } from '../components/Navigation';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert, AlertTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link, Navigate, Route, useNavigate } from "react-router-dom";

const theme = createTheme();

export const NewTrasactions = () => {



    const [error, setError] = React.useState('');
    const [categories, setCategories] = React.useState<any[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        ;

        async function fetchAPI() {
            const response = await (await http.get('categories')).data.data;
            setCategories(response);
        }

        fetchAPI();

    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        const formData = new FormData(event.currentTarget);
        const response = await (await http.post('transactions', formData)).data;

        if (!response.success) {
            setError(response.message);
        } else {
            return navigate('/');
        }
    };


    return (
        <>
            <Navigation />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {error.length > 0 ? (<Alert severity="error">
                                    <AlertTitle>Hata</AlertTitle>
                                    {error}
                                </Alert>) : ''}
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                                    <Select
                                        required
                                        fullWidth
                                        label="Kategori"
                                        name="category_id"
                                        defaultValue=""
                                    >
                                        {categories.map((category, index) => {
                                            return (
                                                <MenuItem value={category.id} key={index}>{category.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Para Birimi</InputLabel>
                                    <Select
                                        required
                                        fullWidth
                                        label="Para Birimi"
                                        name="currency"
                                        defaultValue="TRY"

                                    >
                                        <MenuItem value="TRY">TRY</MenuItem>
                                        <MenuItem value="USD">USD</MenuItem>
                                        <MenuItem value="EUR">EUR</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="amount"
                                    label="Tutar"
                                    name="amount"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    label="Açıklama"
                                    name="description"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Kaydet
                        </Button>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
};