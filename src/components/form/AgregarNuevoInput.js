import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const AgregarNuevoInput = () => {
  const [inputList, setInputList] = useState([{ color: "", imagen: "" }]);
  const [file, setFile] = useState(null)

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle input file change
  const handleFileChange = (e, index) => {
    const { name } = e.target;
    const list = [...inputList];
    list[index][name] = e.target.files[0].name;
    setInputList(list);
    console.log(file)
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { color: "", imagen: "" }]);
  };


  return (
    <>
      {inputList.map((x, i) => {
        return (
          <Grid
            item
            xs={12}
            container
            spacing={2}
            className="containInput"
            key={i}
            enviofile={file}
          >
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="color"
                  valuedefault={x.color}
                  onChange={(e) => handleInputChange(e, i)}
                  name='color'
                  className="colors"
                />
              </Grid>

              <Grid item xs={5} sx={{ display: "flex", alignItems: "center" }}>
                <input
                  accept="image/*"
                  style={{ display: "block" }}
                  type="file"
                  value={x.name}
                  onChange={(e) => {
                    handleFileChange(e, i);
                    setFile(e.target.files)
                  }}
                  name="imagen"
                  className="images"
                />
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {inputList.length !== 1 && (
                  <Tooltip title="Eliminar color">
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleRemoveClick(i)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
            </Grid>

            {inputList.length - 1 === i && (
              <Tooltip title="Agregar otro color">
                <Fab
                  color="primary"
                  aria-label="add"
                  sx={{ marginLeft: "auto" }}
                  onClick={() => {
                    handleAddClick();
                  }}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            )}
            <input
              style={{ display: "block" }}
              type="hidden"
              onChange={(e) => handleInputChange(e, i)}
              // name={`imagen ${i}`}
              className="images"
              name="colors"
              value={JSON.stringify(inputList)}
            />
          </Grid>
        );
      })}
    </>
  );
};

export default AgregarNuevoInput;
