import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51MFe1KSJF4MNWCD9AiHbl2o4wXoyJs1GcIz0bu85A6JwSwuveETx0j8rJDcn4ebn77sTrfeqgWUnt4G70cUmibEM00OjRBGNc3"
);

export const lambdaHandler = async (event, context) => {
  try {
    const prices = await stripe.prices.list({
      // lookup_keys: ['Basic plan', 'Premium','Enterprise'],
      // limit: 3,
      expand: ["data.product"],
    });

    return {
      headers: {
        "Access-Control-Allow-Origin": "*",

        "Access-Control-Allow-Credentials": true,
      },
      statusCode: 200,
      body: JSON.stringify(prices.data),
    };
  } catch (err) {
    return err;
  }
};
