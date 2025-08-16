import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import Button from '../common';
import { useModalsContext } from '../../context_providers';

function TermsAndConditions(props) {
  const {toggleTerms} = useModalsContext();

  const handleClose = () => {
    if (props.isOpen) {
      toggleTerms();
    }
    if (props.onClose) props.onClose();
  };

  useEffect(() => {
    return () => {
      handleClose;
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

      <h1 style={{textAlign: 'center'}}>Terms and Conditions</h1>

      <div style={{overflow: 'scroll'}}>
        <p>
            By using our audiobook platform, Briefly (hereinafter, the "Platform"), you agree to be bound by the following terms and conditions:
        </p>
        <ol>
          <li>
          Subscription and access to content.<br/>
            1.1. By subscribing to our membership, you obtain a subscription that grants you unlimited access to our audiobook content.<br/>
            1.2. You are responsible for maintaining the confidentiality of your account and for all activity that occurs under your username and password.<br/>
            1.3. We reserve the right to suspend or cancel your account in the event of a violation of these terms and conditions or any conduct we deem inappropriate.
          </li>
          <li>
          Intellectual property.<br/>
            2.1. All intellectual property rights related to our Platform and its content, including audiobooks, are the property of Stream Readers, LLC or their respective owners.<br/>
            2.2. You agree not to copy, distribute, transmit, display, sell, license, or otherwise exploit any content from our Platform without our prior written consent.
          </li>
          <li>
          Liability and limitation of liability.<br/>
            3.1. We strive to provide a quality service, but we do not warrant that our Platform will be free of errors or interruptions, or that the content will be accurate or complete.<br/>
            3.2. We will not be liable for any direct, indirect, incidental, special, or consequential damages, including loss of profits, arising from the use of or inability to use our Platform.
          </li>
          <li>
          Governing law and jurisdiction.<br/>
            4.1. These terms and conditions will be governed by and construed in accordance with the laws of the State of Florida, United States.<br/>
            4.2. Any dispute arising in connection with these terms and conditions will be subject to the exclusive jurisdiction of the state and federal courts located in Miami-Dade County, Florida.
          </li>
          <li>
            By accepting these terms and conditions, you also consent to our use of your personal information for marketing purposes, in accordance with our Privacy Policy.
          </li>
          <li>
            Licensed Application End User License Agreement (Standard EULA)<br/>
            Apps made available through the App Store are licensed, not sold, to you. Your license to each App is subject to your prior acceptance of this Licensed Application End User License Agreement ("Standard EULA") or a custom end user license agreement between you and the Application Provider ("Custom EULA"), if one is provided. Your license to any Apple App under this Standard EULA or Custom EULA is granted by Apple, and your license to any third‑party App under this Standard EULA or Custom EULA is granted by the Application Provider of that third‑party App. Any App that is subject to this Standard EULA is referred to as a "Licensed Application". The Application Provider or Apple, as applicable (the "Licensor"), reserves all rights in the Licensed Application not expressly granted to you under this Standard EULA.
            <br/>
            a. Scope of License: The Licensor grants you a non‑transferable license to use the Licensed Application on any Apple‑branded products that you own or control and as permitted by the Usage Rules. The terms of this Standard EULA will govern any content, materials, or services accessible from or purchased within the Licensed Application, as well as updates provided by the Licensor that replace or supplement the original Licensed Application, unless such update is accompanied by a Custom EULA. Except as provided in the Usage Rules, you may not distribute or make the Licensed Application available over a network where it could be used by multiple devices at the same time. You may not transfer, redistribute, or sublicense the Licensed Application, and if you sell your Apple Device to a third party, you must remove the Licensed Application from the Apple Device before doing so. You may not copy (except as permitted by this license and the Usage Rules), reverse engineer, disassemble, attempt to derive the source code of, modify, or create derivative works of the Licensed Application, any updates, or any part thereof (except as and only to the extent any foregoing restriction is prohibited by applicable law or to the extent as may be permitted by the terms of any open‑source components included with the Licensed Application).
            <br/>
            b. Consent to Use of Data: You agree that the Licensor may collect and use technical data and related information, including but not limited to technical information about your device, system and application software, and peripherals, that is gathered periodically to facilitate the provision of software updates, product support, and other services to you (if any) related to the Licensed Application. The Licensor may use this information, as long as it is in a form that does not personally identify you, to improve its products or to provide services or technologies to you.
            <br/>
            c. Termination: This Standard EULA is effective until terminated by you or the Licensor. Your rights under this Standard EULA will terminate automatically if you fail to comply with any of its terms.
            <br/>
            d. External Services: The Licensed Application may enable access to the Licensor’s and/or third‑party services and websites (collectively and individually, "External Services"). You agree to use the External Services at your sole risk. The Licensor is not responsible for examining or evaluating the content or accuracy of any third‑party External Services, and will not be liable for such third‑party External Services. Data displayed by any Licensed Application or External Service, including but not limited to financial, medical, and location information, is for general informational purposes only and is not guaranteed by the Licensor or its agents. You will not use the External Services in any manner that is inconsistent with the terms of this Standard EULA or that infringes the intellectual property rights of the Licensor or any third party. You agree not to use the External Services to harass, abuse, stalk, threaten, or defame any person or entity, and that the Licensor is not responsible for any such use. External Services may not be available in all languages or in your country of origin, and may not be appropriate or available for use in any particular location. To the extent you choose to use such External Services, you are solely responsible for compliance with any applicable laws. The Licensor reserves the right to change, suspend, remove, disable, or impose access restrictions or limits on any External Services at any time without notice or liability to you.
            <br/>
            e. NO WARRANTY: YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT USE OF THE LICENSED APPLICATION IS AT YOUR SOLE RISK. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE LICENSED APPLICATION AND ANY SERVICES PERFORMED OR PROVIDED BY THE LICENSED APPLICATION ARE PROVIDED "AS IS" AND "AS AVAILABLE", WITH ALL FAULTS AND WITHOUT WARRANTY OF ANY KIND, AND THE LICENSOR HEREBY DISCLAIMS ALL WARRANTIES AND CONDITIONS WITH RESPECT TO THE LICENSED APPLICATION AND ANY SERVICES, EITHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES AND/OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, QUIET ENJOYMENT, AND NON‑INFRINGEMENT OF THIRD‑PARTY RIGHTS. NO ORAL OR WRITTEN INFORMATION OR ADVICE GIVEN BY THE LICENSOR OR ITS AUTHORIZED REPRESENTATIVE SHALL CREATE A WARRANTY. SHOULD THE LICENSED APPLICATION OR SERVICES PROVE DEFECTIVE, YOU ASSUME THE ENTIRE COST OF ALL NECESSARY SERVICING, REPAIR, OR CORRECTION. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES OR LIMITATIONS ON A CONSUMER'S APPLICABLE STATUTORY RIGHTS, SO THE ABOVE EXCLUSIONS AND LIMITATIONS MAY NOT APPLY TO YOU.
            <br/>
            f. Limitation of Liability: TO THE EXTENT NOT PROHIBITED BY LAW, IN NO EVENT SHALL THE LICENSOR BE LIABLE FOR PERSONAL INJURY OR ANY INCIDENTAL, SPECIAL, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, LOSS OF DATA, BUSINESS INTERRUPTION, OR ANY OTHER COMMERCIAL DAMAGES OR LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OR INABILITY TO USE THE LICENSED APPLICATION, HOWEVER CAUSED, REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT, TORT, OR OTHERWISE) AND EVEN IF THE LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OF LIABILITY FOR PERSONAL INJURY, OR OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THIS LIMITATION MAY NOT APPLY TO YOU. In no event shall the Licensor’s total liability to you for all damages (other than as may be required by applicable law in cases involving personal injury) exceed fifty dollars ($50.00). The foregoing limitations will apply even if the above stated remedy fails of its essential purpose.
            <br/>
            g. You may not use or otherwise export or re‑export the Licensed Application except as authorized by United States law and the laws of the jurisdiction(s) in which the Licensed Application was obtained. In particular, but without limitation, the Licensed Application may not be exported or re‑exported (a) into any U.S. embargoed countries or (b) to anyone on the U.S. Treasury Department’s list of Specially Designated Nationals or the U.S. Department of Commerce’s Denied Person's List or Entity List. By using the Licensed Application, you represent and warrant that you are not located in any such country or on any such list. You also agree that you will not use these products for any purposes prohibited by United States law, including, without limitation, the development, design, manufacture, or production of nuclear, missile, or chemical or biological weapons.
            <br/>
            h. The Licensed Application and related documentation are "Commercial Items", as that term is defined at 48 C.F.R. §2.101, consisting of "Commercial Computer Software" and "Commercial Computer Software Documentation", as such terms are used in 48 C.F.R. §12.212 or 48 C.F.R. §227.7202, as applicable. Consistent with 48 C.F.R. §12.212 or 48 C.F.R. §§227.7202-1 through 227.7202-4, as applicable, the Commercial Computer Software and Commercial Computer Software Documentation are licensed to U.S. Government end users (a) only as Commercial Items and (b) with only those rights as are granted to all other end users pursuant to the terms and conditions herein. Unpublished rights reserved under the copyright laws of the United States.
            <br/>
            i. Except to the extent expressly provided in the following paragraph, this Agreement and the relationship between you and Apple shall be governed by the laws of the State of California, excluding its conflicts of law provisions. You and Apple agree to submit to the personal and exclusive jurisdiction of the courts located within Santa Clara County, California, to resolve any dispute or claim arising from this Agreement. If (a) you are not a U.S. citizen; (b) you do not reside in the U.S.; (c) you are not accessing the Service from the U.S.; and (d) you are a citizen of one of the countries identified below, then you hereby agree that any dispute or claim arising from this Agreement shall be governed by the applicable law set forth below, without regard to any conflict of law provisions, and you hereby submit irrevocably to the non‑exclusive jurisdiction of the courts located in the state, province, or country identified below whose law governs:
            <br/>
            If you are a citizen of any European Union country or of Switzerland, Norway, or Iceland, the governing law and forum shall be the laws and courts of your usual place of residence.
            <br/>
            The United Nations Convention on Contracts for the International Sale of Goods is expressly excluded from application to this Agreement.
          </li>
        </ol>
      </div>
    </ReactModal>
  );
}

export default TermsAndConditions;
