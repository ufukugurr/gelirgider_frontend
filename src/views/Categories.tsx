import * as React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColDef, GridValueGetterParams, trTR } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import http from '../services/http';
import { trTR as coreTrTR } from '@mui/material/locale';
import { Navigation } from '../components/Navigation';
import { Link, useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, IconButton, Typography } from '@mui/material';




const theme = createTheme({}, trTR, coreTrTR);

export const Categories = () => {

    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Kategori Adı', width: 200, type: 'dateTime' },
        { field: 'cash_flow_direction', headerName: 'Kategori', width: 150, valueFormatter: (params: any) => (params?.value == 1 ? 'Gelir' : 'Gider') },
        {
            field: "id",
            headerName: "İşlemler",
            sortable: false,
            width: 100,
            renderCell: (params) => {
                const onEdit = (e: any) => {
                    e.stopPropagation();
                    navigate(`/categories/${params.value}`);
                };

                const onDelete = (e: any) => {
                    e.stopPropagation();
                    http.delete(`categories/${params.value}`);
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
        const response = await (await http.get('categories')).data.data;
        setRows(response);
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
                    Yeni Kategori
                </Button>
                <div style={{ height: 400, width: '100%' }}>
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
        </ThemeProvider>
    );
};
