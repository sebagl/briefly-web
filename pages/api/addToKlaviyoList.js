import axios from 'axios';

// Your Klaviyo config
const klaviyoPrivateKey = process.env.KLAVIYO_PRIVATE_KEY;
const klaviyoNewsletterListId = process.env.KLAVIYO_NEWSLETTER_LIST_ID;

export default async function handler(req, res) {
  try {
    const data = req.body;

    const axiosResponse = await axios({
      method: 'post',
      url: `https://a.klaviyo.com/api/v2/list/${klaviyoNewsletterListId}/members`,
      params: {
        api_key: klaviyoPrivateKey,
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        profiles: [
          {
            email: data.email,
            // Adding the user's first name
            $first_name: data.displayName,
            // Adding phone number if you wish to provide that data as well
            // phone_number: data.phone_number,
          },
        ],
      },
    });

    console.log('Klaviyo response:', axiosResponse.data); // eslint-disable-line no-console
    res.status(200).json({ result: 'Email added to Klaviyo list successfully' });
  } catch (error) {
    console.error('Error adding email to Klaviyo list:', error); // eslint-disable-line no-console
    res.status(500).json({ error: 'Failed to add email to Klaviyo list' });
  }
}
