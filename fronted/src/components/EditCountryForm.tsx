import React, { useState } from 'react';
import { useParams, useNavigate, data } from 'react-router-dom';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useQuery } from 'react-query';
import { getCountry } from '../services/countryService';
import { useSetRecoilState } from 'recoil';
import '../styles/EditCountryForm.scss';

import { useRecoilValue } from 'recoil';
import { selectedCountryState } from '../recoil/atoms';

interface Country {
  _id: string;
  name: string;
  region: string;
  population: number;
  flag?: string;
}

const EditCountryForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const setEditingCountryName = useSetRecoilState(selectedCountryState);
  const navigate = useNavigate();

  //   const { data: country, isLoading, isError } = useQuery<Country>(['country', id], () => getCountry(id!));
  // //   console.log(data);

  const {
    data: country,
    isLoading,
    isError,
  } = useQuery<Country>(['country', id], () => getCountry(id!), {
    onSuccess: (data) => {
      // עדכון שם המדינה ב-Recoil כשהנתונים נטענים בהצלחה
      setEditingCountryName(data.name);
    },
  });

  const [openModal, setOpenModal] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    region: Yup.string().required('Region is required'),
    population: Yup.number()
      .required('Population is required')
      .min(1, 'Population must be greater than 0'),
    flag: Yup.string().url('Invalid URL').optional(),
  });

  const handleSubmit = (values: Country) => {
    // שליחת הנתונים המעודכנים לשרת
    fetch(`/api/countries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(() => {
        setEditingCountryName('');
        navigate('/');
      })
      .catch((error) => console.error('Error updating country:', error));
  };

  const handleCancel = (formik: any) => {
    if (JSON.stringify(country) !== JSON.stringify(formik.values)) {
      setOpenModal(true);
    } else {
      setEditingCountryName('');
      navigate('/');
    }
  };

  const handleCloseModal = (confirmed: boolean) => {
    setOpenModal(false);
    if (confirmed) {
      setEditingCountryName('');
      navigate('/');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !country) return <div>Error loading country</div>;

  return (
    <>
      <Dialog open>
        <DialogTitle>
          {' '}
          <p>Edit {country.name}</p>
        </DialogTitle>
        <Formik
          initialValues={country}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <DialogContent>
                <Field
                  name="name"
                  label="Name"
                  as={TextField}
                  margin="dense"
                  fullWidth
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik.handleChange(e);
                    setEditingCountryName(e.target.value); // עדכון ה-Recoil State
                  }}
                />
                <Field
                  name="region"
                  label="Region"
                  as={TextField}
                  margin="dense"
                  fullWidth
                  error={formik.touched.region && Boolean(formik.errors.region)}
                  helperText={formik.touched.region && formik.errors.region}
                />
                <Field
                  name="population"
                  label="Population"
                  as={TextField}
                  margin="dense"
                  type="number"
                  fullWidth
                  error={
                    formik.touched.population &&
                    Boolean(formik.errors.population)
                  }
                  helperText={
                    formik.touched.population && formik.errors.population
                  }
                />
                <Field
                  name="flag"
                  label="Flag URL"
                  as={TextField}
                  margin="dense"
                  fullWidth
                  error={formik.touched.flag && Boolean(formik.errors.flag)}
                  helperText={formik.touched.flag && formik.errors.flag}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCancel(formik)} color="secondary">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  disabled={
                    formik.isSubmitting || !formik.dirty || !formik.isValid
                  }
                >
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      {/* Modal to confirm cancel */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to leave without saving your changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseModal(false)} color="secondary">
            No
          </Button>
          <Button onClick={() => handleCloseModal(true)} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCountryForm;
