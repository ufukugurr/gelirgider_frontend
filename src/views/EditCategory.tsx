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
import { useNavigate, useParams } from "react-router-dom";

const theme = createTheme();

export const EditCategory = () => {

    const { id } = useParams();

    const [error, setError] = React.useState('');

    const [cashFlowDirection, setCashFlowDirection] = React.useState('');
    const [name, setName] = React.useState('');

    const navigate = useNavigate();

    React.useEffect(() => {

        async function fetchAPI() {
            const formResponse = await (await http.get(`categories/${id}`)).data.data;
            setCashFlowDirection(formResponse.cash_flow_direction);
            setName(formResponse.name);
        }

        fetchAPI();

    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        const formData = new URLSearchParams();
        formData.append('name', name);
        formData.append('cash_flow_direction', cashFlowDirection);


        const response = await (await http.put(`categories/${id}`, formData, {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        })).data;

        if (!response.success) {
            setError(response.message);
        } else {
            return navigate('/categories');
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
                                    <InputLabel id="demo-simple-select-label">Türü</InputLabel>
                                    <Select
                                        required
                                        fullWidth
                                        label="Türü"
                                        name="cash_flow_direction"
                                        defaultValue="1"
                                        value={cashFlowDirection}
                                        onChange={event => setCashFlowDirection(event.target.value)}
                                    >
                                        <MenuItem value="1">Gelir</MenuItem>
                                        <MenuItem value="-1">Gider</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    label="Adı"
                                    name="name"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
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