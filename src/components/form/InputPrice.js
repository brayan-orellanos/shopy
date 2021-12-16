import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import TextField from "@mui/material/TextField";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
    props,
    ref
  ) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  });

  const InputPrice = () => {
    NumberFormatCustom.propTypes = {
      name: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
    };
  
    const [values, setValues] = React.useState({
      precio: "",
    });
  
    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    };

    return (
        <TextField
        label="Precio"
        value={values.numberformat}
        onChange={handleChange}
        name="precio"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        variant="outlined"
      />
    )
}

export default InputPrice;