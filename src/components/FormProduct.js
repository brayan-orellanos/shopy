import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputPrice from "./form/InputPrice";
import InputCategory from "./form/InputCategory";
import InputSubmit from "./form/InputSubmit";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { textAlign } from "@mui/system";
import AgregarNuevoInput from "./form/AgregarNuevoInput";
import { DropzoneArea } from "material-ui-dropzone";
import { makeStyles } from "@mui/styles";
import { Link } from 'react-router-dom';
// import LoadingButton from '@mui/lab/LoadingButton';

const FormProduct = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fileObjects, setFileObjects] = useState([])

  const useStyles = makeStyles((theme) => ({
    DropzoneArea: () => ({
      fontWeight: 10,
      margin: 0,
      padding: 0,
    }),
  }));

  const classes = useStyles();

  const changeName = (e) => {
    setNombre(e.target.value);
  };

  const changeDescripcion = (e) => {
    setDescripcion(e.target.value);
  };

  
  const handledSubmit = async (e) => {
    // setFileObjects([])
    e.preventDefault();

    try {
      const data = new FormData(e.target);
      const image = e.target.imagen.files[0]
      data.append("picture", image)
      console.log(e.target);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const res = await axios.post(
        "http://localhost:8080/createProduct",
        data,
        config
      );

      console.log(res);

      if (res.status === 200) {
        console.log("los datos se han enviado correctamente");
      } else {
        console.log("a ocurrido un error");
      }

      return res;
    } catch (err) {
      console.log(err);
    }

    console.log(e.target);

  };

  return (
    <Box
      onSubmit={handledSubmit}
      component="form"
      sx={{
        width: 1100,
        maxWidth: "100%",
        textAlign: "center",
        margin: "0 auto",
      }}
      id="formProduct"
    >
      <h1>Añadir nuevo producto</h1>

      <Grid container spacing={2} maxWidth="sm" sx={{ margin: "0 auto" }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            name="nombre"
            value={nombre}
            onChange={changeName}
          />
        </Grid>

        <Grid item xs={6}>
          <InputPrice />
        </Grid>

        <Grid item xs={12}>
          <InputCategory />
        </Grid>

        <Grid item xs={12} container spacing={2} className="dictionariImages">
          <AgregarNuevoInput/>
        </Grid>

        <Grid item xs={12}>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Arrastra o selecciona las imagenes, maximo(2)"}
            onChange={(files) => {
              console.log(files)
              setFileObjects([].concat(fileObjects, files))
            }}
            aria-describedby="xd"
            filesLimit={2}
            dropzoneClass={classes.DropzoneArea}
            name="images"
          />
        </Grid>

        <input type="hidden" name="images" value={JSON.stringify(fileObjects)}/>

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
