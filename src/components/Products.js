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
      <div spacing={2} sx={{ margin: "0 auto", display: 'flex', gap: '10px' }}>
      {productos.map((product, i) => {
        return (
          <Card sx={{width: '300px', display: 'inline-block', margin: '20px' }} key={i}>
            <CardMedia
              component="img"
              height="140"
              image={`http://127.0.0.1:5500/src/images/${JSON.parse(product.images)[0].path}`}
              alt={`${JSON.parse(product.images)[0]}`}
              onMouseOver={e => {
                if(JSON.parse(product.images).length > 1) {
                  e.target.src = `http://127.0.0.1:5500/src/images/${JSON.parse(product.images)[1].path}`
                }
              }}

              onMouseOut={e => {
                e.target.src = `http://127.0.0.1:5500/src/images/${JSON.parse(product.images)[0].path}`
              }}
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
    </div>
  );
};

export default Products;
