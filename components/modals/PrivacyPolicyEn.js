import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useModalsContext } from '../../context_providers';
import Button from '../common';

function PrivacyPolicyEn(props) {
  const {togglePrivacy} = useModalsContext();

  const handleClose = () => {
    if (props.isOpen) {
      togglePrivacy();
    }
    if (props.onClose) props.onClose();
  };

  useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);
  return (
    <ReactModal
      isOpen={props.isOpen}
      style={{
        overlay: {backgroundColor: 'rgba(0,0,0,0.5)',  zIndex: 99999},
        content: {color: 'black', height: '70%', top: '10%'},
      }}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      parentSelector={
        () => document.body
      }
    >
      <Button variant="close" size="large" onClick={handleClose}/>

      <h1 style={{textAlign: 'center'}}>Privacy Policy</h1>

      <div style={{overflow: 'scroll'}}>
        <p>
        At Stream Readers, LLC (hereinafter, "we" or "our"), we are committed to protecting your privacy and ensuring the confidentiality of the personal information you provide when using our audiobook app, called Briefly Books (hereinafter, the "Platform"). This Privacy Policy establishes how we collect, use, and protect your personal information. By accessing and using our Platform, you accept the terms described in this policy.
        </p>
        <ol>
          <li>Personal information collected.<br/>
                1.1. When registering on our Platform, we will collect your first name and email address. This data is necessary to create and manage your account on Briefly Books.
          </li>
          <li>Use of information.<br/>
                2.1. We will use your personal information for the following purposes:<br/>
                a) Process your registration and manage your account on our Platform.<br/>
                b) Provide you with unlimited access to our audiobook content.<br/>
                c) Send you service-related communications, such as payment confirmations, updates, or changes to the Platform.<br/>
                d) Conduct marketing activities, including sending promotional messages and special offers about our products and services, both by email and other means of communication.
          </li>
          <li>
            Information storage and protection<br/>
                3.1. All personal information collected will be stored on secure servers and treated in accordance with best practices and appropriate security measures to protect it against unauthorized access, disclosure, or alteration.<br/>
                3.2. We do not sell or share your personal information with unaffiliated third parties, except in cases necessary for the operation of our Platform and compliance with the law.
          </li>
          <li>
            Cookies and similar technologies.<br/>
                4.1. We use cookies and similar technologies to improve your experience on the Platform and collect statistical data about the use of our services. These technologies may collect information about your device, such as your IP address, browser type, and pages visited. You can manage cookie preferences in your browser settings.
          </li>
          <li>
            Links to third-party websites.<br/>
                5.1. Our Platform may contain links to third-party websites. We are not responsible for the privacy practices of such sites and recommend that you review the privacy policies of each website you visit.
          </li>
          <li>
            Data subject rights<br/>
                6.1. You have rights over your personal information and can exercise the following rights:<br/>
                a) Access, correct, or update your personal information.<br/>
                b) Request deletion of your personal information, subject to our legal and operational obligations.<br/>
                c) Withdraw your consent to the processing of your personal information.<br/>
                d) Object to the processing of your personal information for direct marketing purposes.<br/>
                e) Request limitation of the processing of your personal information.<br/>
          </li>
          <li>
            Changes to the privacy policy.<br/>
                7.1. We may update this Privacy Policy occasionally to reflect changes in our practices and services. We will notify you of any relevant changes by posting the updated version on our Platform.
          </li>
          <li>
            Account and Associated Data Deletion Request.<br/>
            8.1. If you wish to request the deletion of your account and associated data, please follow the steps below:
              a) Send an email to contacto@streamreaders.com with the subject "Account Deletion Request".
              b) Include your username and any other information necessary to identify your account.
              c) Our support team will confirm receipt of your request and initiate the account deletion process.
              
            8.2. Data Deletion Details:
              a) Once a valid deletion request is received, we will delete your account and associated data within 1 week.

            8.3. For any additional questions or concerns, please contact our support team at contacto@streamreaders.com.
          </li>
          <li>
          Financial Information.<br/>
            
            9.1. We use Stripe, an external payment service provider, to process transactions on our Platform. When making a payment, you will be asked to provide certain financial information, such as your credit card number and expiration date. This information is collected and stored securely directly by Stripe, and we do not have access to your credit card information.

            9.2. Stripe uses and processes your financial information in accordance with its own privacy policy. We recommend that you review Stripe's privacy policy to learn more about how your financial information is handled and protected.

            9.3. We use the financial information provided by Stripe (such as transaction history) to bill you for our services and manage your account.

            9.4. We also accept payments on Android and iOS devices using the payment processing services of those platforms.
          </li>
          <li>
          Subscription and access to content.<br/>
            
            10.1. When registering on our Platform, you obtain a subscription that gives you unlimited access to our Spanish audiobook content.

            10.2. The available subscription plans are as follows:<br/>
                - **Monthly Subscription
                - **Quarterly Subscription 
                - **Annual Subscription

            10.3. You are responsible for maintaining the confidentiality of your account and all activities that occur under your username and password.

            10.4. We reserve the right to suspend or cancel your account in case of violation of these terms and conditions or any conduct we deem inappropriate.
          </li>
        </ol>
      </div>
    </ReactModal>
  );
}

export default PrivacyPolicyEn; 