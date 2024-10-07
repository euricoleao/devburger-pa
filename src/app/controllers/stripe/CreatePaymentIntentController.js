
import  * as Yup from 'yup';

const stripe = require("stripe")('sk_test_51Q5UQ0JI9YkLUX2omSrRBMIMR8xlf6SpNaBJqhUXXo2wJ3fP24fatUkLQ2T2S5vHHJoNqsNDg4UgkMTN1x307CDu007wnPW53G');




//const stripe = new Stripe(process.config.STRIPE_SECRET_KEY);
const CalculateOrderAmount = (items) => {
  const total = items.reduce((acc, current) => {
    return current.price * current.quantity + acc;
  }, 0);

  return total;
}


class CreatePaymentIntentController {
  async store(request, response) {
    const schema = Yup.object().shape({
      products: Yup.array()
      .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
            price: Yup.number().required(),
          }),
        ),

    });
    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { products } = request.body;

    const amount = CalculateOrderAmount(products)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'brl',
       automatic_payment_methods: {
        enabled: true,
      },

    });

    response.json({
      clientSecret: paymentIntent.client_secret,
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });

  }
}

export default new CreatePaymentIntentController();
