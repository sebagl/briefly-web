import axios from 'axios';
import { buffer } from 'micro';
import Stripe from 'stripe';

// Stripe requires secret keys to listen to events
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const email = session.customer_email; // Replace this with actual email

      const klaviyoEvent = {
        token: process.env.KLAVIYO_PUBLIC_KEY,
        event: 'Purchase',
        customer_properties: {
          $email: email,
        },
      };
    

      axios
        .post('https://a.klaviyo.com/api/track', `data=${klaviyoEvent}`)
        .then((klaviyoRes) => {
          console.log('Klaviyo response:', klaviyoRes.data); // eslint-disable-line no-console
          if (!klaviyoRes.data.success) {
            console.error('Failed to send event to Klaviyo'); // eslint-disable-line no-console
          }
        })
        .catch((err) => {
          console.error('Error sending event to Klaviyo:', err); // eslint-disable-line no-console
        });
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default webhookHandler;
