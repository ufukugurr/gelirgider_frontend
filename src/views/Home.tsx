import * as React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColDef, trTR } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import http from '../services/http';
import { trTR as coreTrTR } from '@mui/material/locale';
import { Navigation } from '../components/Navigation';
import CssBaseline from '@mui/material/CssBaseline';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Grid from '@mui/material/Grid';
import trLocale from 'date-fns/locale/tr';




const theme = createTheme({}, trTR, coreTrTR);

export const Home = () => {
    const navigate = useNavigate();

    const [rows, setRows] = React.useState([]);
    const [total, setTotal] = React.useState(0);

    const [fromDate, setFromDate] = React.useState<Date | null>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    const [toDate, setToDate] = React.useState<Date | null>(new Date());

    const columns: GridColDef[] = [
        { field: 'category', headerName: 'Kategori', width: 200, valueFormatter: (params: any) => (params?.value?.name), valueGetter: (params: any) => (params?.value?.name) },
        { field: 'created_at', headerName: 'İşlem Tarihi', width: 150, type: 'dateTime' },
        { field: 'amount', headerName: 'Tutar', width: 100, type: 'number' },
        { field: 'currency', headerName: 'Para Birimi', width: 100 },
        { field: 'description', headerName: 'Açıklama', width: 300 },
        {
            field: "id",
            headerName: "İşlemler",
            sortable: false,
            width: 100,
            renderCell: (params) => {
                const onEdit = (e: any) => {
                    e.stopPropagation();
                    navigate(`/${params.value}`);
                };

                const onDelete = (e: any) => {
                    e.stopPropagation();
                    http.delete(`transactions/${params.value}`);
                    fetchAPI();
                };

                return <>
                    <IconButton color="primary" onClick={onEdit} component="span">
                        <EditIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={onDelete} component="span">
                        <DeleteIcon />
                    </IconButton>
                </>;
            }
        }
    ];



    async function fetchAPI() {
        const response = await (await http.get('transactions', { params: { fromDate: fromDate, toDate: toDate } })).data;

        setTotal(response.total.try);

        setRows(response.data);
    }


    React.useEffect(() => {

        fetchAPI();

    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Navigation />
            <Container maxWidth="xl">
                <CssBaseline />

                <Button component={Link} to="new" variant="contained" startIcon={<AddIcon />} sx={{ my: '15px' }}>
                    Yeni Gelir/Gider
                </Button>

                <Grid container spacing={2} alignItems="center" sx={{ mb: '15px' }}>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Toplam TRY
                                </Typography>
                                <Typography variant="h6">
                                    {total}₺
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Card sx={{ py: '4px' }}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={trLocale}>
                                            <DatePicker
                                                mask='__.__.____'
                                                maxDate={toDate}
                                                label="Başlangıç"
                                                value={fromDate}
                                                onChange={value => setFromDate(value)}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={trLocale}>
                                            <DatePicker
                                                mask='__.__.____'
                                                maxDate={new Date()}
                                                label="Bitiş"
                                                value={toDate}
                                                onChange={value => setToDate(value)}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <Button onClick={() => {
                                            fetchAPI();
                                        }} variant="contained" sx={{ height: 55, width: '100%' }}>
                                            Getir
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[15]}
                        hideFooterSelectedRowCount
                        disableSelectionOnClick
                    />
                </div>
            </Container>
        </ThemeProvider >
    );
};
