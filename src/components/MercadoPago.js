import React from "react";

const MercadoPago = () => {
  const products = [
    {
      title: "mesa1",
      description:"mesa",
      quantity: 1,
      currency_id: "COP",
      unit_price: 200,
    },
    {
        title: "mesa2",
        description:"mesa",
        quantity: 3,
        currency_id: "COP",
        unit_price: 300,
      },
      {
        title: "mesa3",
        description:"mesa",
        quantity: 4,
        currency_id: "COP",
        unit_price: 500,
      }
  ];

  return (
    <div>
      <form action="http://localhost:8080/checkout" method="POST">
          <input type="hidden" value={JSON.stringify(products)} name='items'/>
        <input type="submit" value="Enviar"/>
      </form>
    </div>
  );
};

export default MercadoPago;

//   const productsObject = {
//     products: products,
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let res = await fetch("http://localhost:8080/checkout", {
//         method: "POST",
//         body: JSON.stringify(products),
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) {
//         let err = {
//           err: true,
//           status: res.status,
//           statusText: !res.statusText ? "Ocurrio un error" : res.statusText,
//         };
//         throw err;
//       }

//       let json = await res.json();

//       console.log(json);
//     } catch (err) {
//       console.log(err);
//     }
//   };


