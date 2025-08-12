import axios from 'axios';


const klaviyoPrivateKey = process.env.KLAVIYO_PRIVATE_KEY;

export default async function handler(req, res) {
  
  // Rest of the API logic
  const data = req.body;
  const klaviyoEvent = {
    data: {
      type: 'event',
      attributes: {
        profile: {
          $email: data.email,
        },
        metric: {
          name: 'First Purchase Completed',
        },
        properties: {
          userName: data.displayName,
        },
      },
    },
  };

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Klaviyo-API-Key ${klaviyoPrivateKey}`
  };

  try {
    const klaviyoResponse = await axios.post('https://a.klaviyo.com/api/events/', klaviyoEvent, { headers });
    console.log('Klaviyo response:', klaviyoResponse.data); // eslint-disable-line no-console
    res.status(200).json({ result: 'Event sent to Klaviyo successfully' });
  } catch (error) {
    console.error('Error sending event to Klaviyo:', error); // eslint-disable-line no-console
    res.status(500).json({
      error: 'unknown',
      message: 'Failed to send event to Klaviyo',
      details: error
    });
  }
}
