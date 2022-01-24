import React from "react";

const MercadoPago = () => {
  let loc = window.location.origin
   
  const products = [
    {
      id: "1",
      title: "cama",
      picture_url: `${loc}/src/images/cama-vitelli-front.jpg`,
      description: "cama ortopedica",
      quantity: 1,
      currency_id: "COP",
      unit_price: 2000,
    },
    {
      id:"2",
      title: "silla",
      picture_url: `${loc}/src/images/silla.jpg`,
      description: "silla de madera con tres patas",
      quantity: 2,
      currency_id: "COP",
      unit_price: 3000,
    },
    {
      id: "3",
      title: "mesa",
      picture_url: `${loc}/src/images/mesa.jpg`,
      description: "mesa de madera",
      quantity: 2,
      currency_id: "COP",
      unit_price: 5000,
    },
  ];


  const handleLs = () => {
    localStorage.setItem('items', 'varios');
  }

  // arreglo.map(el => {
  //   const {title, quantityProduct, price} = el

  //   let nuevoProducto = {
  //     title,
  //     quantity: quantityProduct,
  //     currency_id: "COP",
  //     unit_price: Number(price)/Number(quantityProduct)
  //   }

  //   products.push(nuevoProducto);
  // })

  // const productsObject = {
  //   products: products,
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let res = await fetch("http://localhost:4040/checkout", {
  //       method: "POST",
  //       body: JSON.stringify(productsObject),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     console.log(res);

  //     return res
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <form action="http://localhost:8080/checkout" method="POST">
        <input type="hidden" value={JSON.stringify(products)} name='items'/>
        <input type="submit" value="Enviar" onClick={handleLs}/>
      </form>
    </div>
  );
};

export default MercadoPago;
