import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function InputSubmit () {
  return (
    <Button variant="contained" endIcon={<SendIcon />} type="submit">
      Enviar
    </Button>
  );
}
