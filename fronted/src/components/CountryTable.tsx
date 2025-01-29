

import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  getCountries,
  deleteCountry,
  updateCountry,
} from '../services/countryService';
import '../styles/CountryTable.scss';

interface Country {
  _id: string;
  name: string;
  region: string;
  population: number;
  flag?: string;
}

const CountryTable = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: countries, isLoading } = useQuery<Country[]>(
    'countries',
    getCountries,
  );

  const updateMutation = useMutation(
    (updatedCountry: Country) =>
      updateCountry(updatedCountry._id, updatedCountry),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('countries');
      },
    },
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this country?')) {
      await deleteCountry(id);
      queryClient.invalidateQueries('countries');
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'region', headerName: 'Region', width: 150 },
    { field: 'population', headerName: 'Population', width: 150 },
    {
      field: 'flag',
      headerName: 'Flag',
      width: 100,
      renderCell: (params: any) => (
        <img
          src={params.value}
          alt={`${params.row.name} flag`}
          style={{ width: '50px', height: '30px' }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: any) => (
        <div className="country-table">
          <Button
            variant="contained"
            onClick={() => navigate(`/edit/${params.row._id}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <DataGrid
        rows={countries || []}
        columns={columns}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default CountryTable;
