import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputCategory from "./form/InputCategory";
import InputSubmit from "./form/InputSubmit";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AgregarNuevoInput from "./form/AgregarNuevoInput";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
import DropZone from "./form/DropZone";
// import LoadingButton from '@mui/lab/LoadingButton';

const FormProduct = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setError
  } = useForm();

  const changeName = (e) => setNombre(e.target.value);

  const changeDescripcion = (e) => setDescripcion(e.target.value);

  const formSubmit = async (dato) => {
    // e.preventDefault();
    console.log(dato);
    const data = new FormData(dato);

    try {
      const config = {
        headers: {
          // "Content-Type": "application/x-www-form-urlencoded",
          "content-type": "multipart/form-data"
        }
      };

      const res = await fetch("http://localhost:4242/create", {
        method: "post",
        body: data
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: 1100,
        paddingRight: "16px"
      }}
      id="formProduct"
      onSubmit={handleSubmit(formSubmit)}
    >
      <h1 style={{ textAlign: "center" }}>Añadir nuevo producto</h1>

      <Grid
        container
        spacing={2}
        maxWidth="sm"
        width={"100%"}
        sx={{ margin: "0 auto" }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            // inputProps={{ onChange: (el) => handleChange(el) }}
            {...(errors.nombre && { error: true })}
            {...register("nombre", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Este campo solo acepta texto"
              }
            })}
            name="nombre"
            value={nombre}
            InputProps={{
              type: "text"
            }}
            onChange={changeName}
          />
          {errors.nombre && (
            <p style={{ margin: "5px 0 0", color: "red", textAlign: "start" }}>
              {errors.nombre.message}
            </p>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Precio"
            InputProps={{
              endAdornment: <InputAdornment position="end">COP</InputAdornment>,
              type: "number"
            }}
            variant="outlined"
            {...(errors.precio && { error: true })}
            {...register("precio", {
              required: "Este campo es requerido",
              minLength: {
                value: 6,
                message: "El minimo de caracteres es 6"
              },
              maxLength: {
                value: 12,
                message: "El maximo de caracteres es 12"
              }
            })}
          />
          {errors.precio && (
            <p style={{ margin: "5px 0 0", color: "red", textAlign: "start" }}>
              {errors.precio.message}
            </p>
          )}
        </Grid>

        <Grid item xs={12}>
          <InputCategory />
        </Grid>

        <Grid item xs={12} container spacing={2} className="dictionariImages">
          <AgregarNuevoInput />
        </Grid>

        <Grid item xs={12}>
          <DropZone></DropZone>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Descripcion"
            multiline
            rows={4}
            defaultValue={descripcion}
            onChange={changeDescripcion}
            {...(errors.descripcion && { error: true })}
            {...register("descripcion", {
              required: "Este campo es requerido",
              maxLength: {
                value: 255,
                message: "el maximo de caracteres es 255"
              }
            })}
          />
          {errors.descripcion && (
            <p style={{ margin: "5px 0 0", color: "red", textAlign: "start" }}>
              {errors.descripcion.message}
            </p>
          )}
        </Grid>

        <Grid item xs={12}>
          <InputSubmit />
        </Grid>
      </Grid>

      <Link to="/Productos">List products</Link>
    </Box>
  );
};

export default FormProduct;
