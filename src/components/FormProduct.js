import React from "react";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputPrice from "./form/InputPrice";
import InputCategory from "./form/InputCategory";
import InputSubmit from "./form/InputSubmit";
import axios from "axios";

const FormProduct = () => {
  const handledSubmit = async (e) => {
    e.preventDefault();

    try {
        const data = new FormData(e.target)
        console.log(e.target)
    
        const res = await axios.post('http://localhost:8080/createProduct', data)
            // json = await res.json()
    
        console.log(res)
        // console.log(json)
        return res
    
    } catch (err) {
        console.log(err)
    }


    console.log(e.target)
  };

  return (
    <form
      onSubmit={handledSubmit}
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      id="formProduct"
    >
      <TextField id="outlined-basic" label="Nombre" variant="outlined" name="nombre"/>
      <InputPrice />
      <InputCategory />
      <TextField
        id="outlined-multiline-static"
        label="Descripcion"
        name="description"
        multiline
        rows={4}
      />
      <InputSubmit />
    </form>
  );
};

export default FormProduct;
