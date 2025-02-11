
import { useQuery, useMutation, useQueryClient } from "react-query";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getCountries,
  deleteCountry,
  updateCountry,
} from "../services/countryService";
import "../styles/CountryTable.scss";
import { ICountry } from "../types/country";
import "react-toastify/dist/ReactToastify.css";

const CountryTable = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  
  const { data: countries, isLoading } = useQuery<ICountry[]>(
    "countries",
    getCountries,
  );


  const updateMutation = useMutation(
    (updatedCountry: ICountry) =>
      updateCountry(updatedCountry._id, updatedCountry),
    {
      onSuccess: (_, updatedCountry) => {
        queryClient.setQueryData<ICountry[]>("countries", (oldData) => {
          if (!oldData) return [];
          return oldData.map((country) =>
            country._id === updatedCountry._id ? updatedCountry : country
          );
        });
      },
    }
  );


  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      await deleteCountry(id);
      queryClient.setQueryData<ICountry[]>("countries", (oldData) => {
        if (!oldData) return [];
        return oldData.filter((country) => country._id !== id);
      });
    }
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "region", headerName: "Region", width: 150 },
    { field: "population", headerName: "Population", width: 150 },
    {
      field: "flag",
      headerName: "Flag",
      width: 100,
      renderCell: (params: any) => (
        <img
          src={params.value}
          alt={`${params.row.name} flag`}
          style={{ width: "50px", height: "30px" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: any) => (
        <div>
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
    <div className="table-container">
      <DataGrid
        rows={countries || []}
        columns={columns}
        getRowId={(row) => row._id}
        autoHeight
      />
    </div>
  );
};

export default CountryTable;
