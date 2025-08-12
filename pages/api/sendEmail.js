
import admin from 'firebase-admin';

// Your Firebase config
const config = {
  // replace with your actual config
};

if (!admin.apps.length) {
  admin.initializeApp(config);
}
const db = admin.firestore();

export default async function handler(req, res) {
  try {
    const data = req.body;
    const writeResult = await db.collection('mail').add({
      to: data.to,
      message: {
        subject: data.subject,
        replyTo: data.replyTo,
        text: data.text,
        html: data.html,
      },
    });

    console.log('Write result:', writeResult); // eslint-disable-line no-console
    res.status(200).json({ result: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error); // eslint-disable-line no-console
    res.status(500).json({ error: 'Failed to send email' });
  }
}
