import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputCategory from "./form/InputCategory";
import InputSubmit from "./form/InputSubmit";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AgregarNuevoInput from "./form/AgregarNuevoInput";
import { DropzoneArea } from "material-ui-dropzone";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
// import LoadingButton from '@mui/lab/LoadingButton';

const FormProduct = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fileObjects, setFileObjects] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nombre: ""
    }
  });

  const useStyles = makeStyles((theme) => ({
    DropzoneArea: () => ({
      fontWeight: 10,
      margin: 0,
      padding: 0
    })
  }));

  const classes = useStyles();

  const changeName = (e) => setNombre(e.target.value);

  const changeDescripcion = (e) => setDescripcion(e.target.value);

  const handledSubmit = async (e) => {
    const data = new FormData(e.target);

    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //     "content-type": "multipart/form-data"
      //   }
      // };

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
        textAlign: "center",
        paddingRight: "16px"
      }}
      id="formProduct"
      onSubmit={handleSubmit(handledSubmit)}
    >
      <h1>Añadir nuevo producto</h1>

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
            name="nombre"
            {...(errors.nombre && { error: true })}
            {...register("nombre", {
              required: "El nombre es requerido"
            })}
            value={nombre}
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
            name="precio"
            InputProps={{
              endAdornment: <InputAdornment position="end">COP</InputAdornment>,
              type: "number"
            }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <InputCategory />
        </Grid>

        <Grid item xs={12} container spacing={2} className="dictionariImages">
          <AgregarNuevoInput />
        </Grid>

        <Grid item xs={12}>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Arrastra o selecciona las imagenes"}
            onChange={(files) => {
              console.log(files);
              setFileObjects(fileObjects.concat(files));
            }}
            aria-describedby="xd"
            filesLimit={10}
            dropzoneClass={classes.DropzoneArea}
            inputProps={{ name: "imagesDropzone" }}
          />
        </Grid>

        <input
          type="hidden"
          name="images"
          value={JSON.stringify(fileObjects)}
        />

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Descripcion"
            name="descripcion"
            multiline
            rows={4}
            value={descripcion}
            onChange={changeDescripcion}
          />
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
