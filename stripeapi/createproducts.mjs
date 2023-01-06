import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51MFe1KSJF4MNWCD9AiHbl2o4wXoyJs1GcIz0bu85A6JwSwuveETx0j8rJDcn4ebn77sTrfeqgWUnt4G70cUmibEM00OjRBGNc3"
);

export const CreateProductHandler = async (event, context) => {
  const events = JSON.parse(event.body);
  let options = {
    name: events.name,
    default_price_data: {
      currency: "INR",
      unit_amount_decimal: events.amount,
      recurring: { interval: events.interval },
    },
    description: events.Description,
  };
  try {
    const product = await stripe.products.create(options);
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",

        "Access-Control-Allow-Credentials": true,
      },
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return { body: error };
  }

  //   return{
  // body:events.amount
  // }
};
