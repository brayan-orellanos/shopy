import React from "react";

const MercadoPago = () => {
  const products = [
    {
      title: "mesa1",
      description: "mesa",
      quantity: 1,
      currency_id: "COP",
      unit_price: 200,
    },
    {
      title: "mesa2",
      description: "mesa",
      quantity: 3,
      currency_id: "COP",
      unit_price: 300,
    },
    {
      title: "mesa3",
      description: "mesa",
      quantity: 4,
      currency_id: "COP",
      unit_price: 500,
    },
  ];

  const productsObject = {
    products: products,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:4040/checkout", {
        method: "POST",
        body: JSON.stringify(productsObject),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      return res
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
        <input type="hidden" name="items" />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default MercadoPago;
