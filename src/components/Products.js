import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const getDatos = async () => {
        try {
          let res = await axios.get("http://127.0.0.1:5500/users.json");
    
          if (res.statusText !== 'OK') {
            throw {
              err: true,
              status: res.status,
              statusText: !res.statusText ? "Ocurrio un error" : res.statusText,
            };
          }
    
          let data = await res.data;
    
          setProductos([...data]);
    
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }; 
      getDatos()
  }, [])
 
  
  return (
      <>
      {productos.map((product) => {
        return (
          <Card sx={{ maxWidth: 345 }} key={product.id}>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.descripcion}
              </Typography>
            </CardContent>
            <CardActions>
              <p>{product.categoria}</p>
              <p>{product.precio}</p>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
};

export default Products;
