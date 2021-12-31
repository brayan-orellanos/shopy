import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ColorizeIcon from "@mui/icons-material/Colorize";

const AgregarNuevoInput = () => {
  const [inputList, setInputList] = useState([{ color: "", imagen: "" }]);
  const [file, setFile] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [num, setNum] = useState(null);
  const open = Boolean(anchorEl);
  const limitInputs = 10;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColor = (ele) => {
    const $btnMenu = document.querySelectorAll('#basic-button')
    const $inputColor = document.querySelectorAll('#input-color')

    $btnMenu[num].style.backgroundColor = ele.target.getAttribute('color')
    $inputColor[num].value = ele.target.getAttribute('colorName')

    const list = [...inputList];
    list[num]['color'] = ele.target.getAttribute('color');
    setInputList(list);

    console.log(inputList)
  };

  // handle input change
  const handleInputChange = (e) => {
    console.log(e)
  };

  // handle input file change
  const handleFileChange = (e, index) => {
    const { name } = e.target;
    const list = [...inputList];
    list[index][name] = e.target.files[0].name;
    setInputList(list);
    console.log(file);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    if(inputList.length < limitInputs) setInputList([...inputList, { color: "", imagen: "" }]);
  };

  const colors = [
    ["azul", "#2447f2"],
    ["rojo", "#f22424"],
    ["verde", "#008000"],
    ["marron", "#573b14"],
  ];

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
              <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  disableFocusRipple={false}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(e)=>{
                    handleClick(e);
                    setNum(i)
                  }}
                  sx={{borderRadius: '50%', width:'70px', height:'70px', minWidth:'0'}}
                >
                  <ColorizeIcon sx={{fill:'#fff'}}/>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                    "className":"colors"
                  }}
                >
                  {colors.map((el, index) => {
                    return (
                      <MenuItem
                        key={index}
                        onClick={(e) => {
                          handleColor(e);
                          handleClose();
                        }}
                        color={el[1]}
                        colorname={el[0]}
                        style={{backgroundColor: el[1], width: '35px', height: '35px', margin: '5px', borderRadius: '50%'}}
                      ></MenuItem>
                    );
                  })}
                </Menu>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label='Color'
                  valuedefault={x.color}
                  onChange={(e) => handleInputChange(e)}
                  name="color"
                  className="colors"
                  id="input-color"
                  // disabled
                  focused
                />
              </Grid>

              <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
                <input
                  accept="image/*"
                  style={{ display: "block" }}
                  type="file"
                  value={x.name}
                  onChange={(e) => {
                    handleFileChange(e, i);
                    setFile(e.target.files);
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
