import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useModalsContext } from '../../context_providers';
import Button from '../common';

function PrivacyPolicy(props) {
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
        En Stream Readers, LLC (en adelante, "nosotros" o "nuestra"), nos comprometemos a proteger su privacidad y asegurar la confidencialidad de la información personal que nos proporcione al utilizar nuestra plataforma de audiolibros en español, llamada Stream Readers (en adelante, la "Plataforma"). Esta Política de Privacidad establece cómo recopilamos, utilizamos y protegemos su información personal. Al acceder y utilizar nuestra Plataforma, acepta los términos descritos en esta política.
        </p>
        <ol>
          <li>Información personal recopilada.<br/>
                1.1. Al registrarse en nuestra Plataforma, recopilaremos su primer nombre y dirección de correo electrónico. Estos datos son necesarios para crear y gestionar su cuenta en Stream Readers.
          </li>
          <li>Uso de la información.<br/>
                2.1. Utilizaremos su información personal con los siguientes propósitos:<br/>
                a) Procesar su registro y administrar su cuenta en nuestra Plataforma.<br/>
                b) Proporcionarle acceso ilimitado a nuestro contenido de audiolibros.<br/>
                c) Enviarle comunicaciones relacionadas con el servicio, como confirmaciones de pago, actualizaciones o cambios en la Plataforma.<br/>
                d) Realizar actividades de marketing, incluido el envío de mensajes promocionales y ofertas especiales sobre nuestros productos y servicios, tanto por correo electrónico como por otros medios de comunicación.
          </li>
          <li>
            Almacenamiento y protección de la información<br/>
                3.1. Toda la información personal recopilada se almacenará en servidores seguros y se tratará de acuerdo con las mejores prácticas y medidas de seguridad apropiadas para protegerla contra el acceso no autorizado, la divulgación o la alteración.<br/>
                3.2. No vendemos ni compartimos su información personal con terceros no afiliados, excepto en los casos necesarios para el funcionamiento de nuestra Plataforma y el cumplimiento de la ley.
          </li>
          <li>
            Cookies y tecnologías similares.<br/>
                4.1. Utilizamos cookies y tecnologías similares para mejorar su experiencia en la Plataforma y recopilar datos estadísticos sobre el uso de nuestros servicios. Estas tecnologías pueden recopilar información sobre su dispositivo, como su dirección IP, tipo de navegador y páginas visitadas. Puede gestionar las preferencias de cookies en la configuración de su navegador.
          </li>
          <li>
            Enlaces a sitios web de terceros.<br/>
                5.1. Nuestra Plataforma puede contener enlaces a sitios web de terceros. No nos hacemos responsables de las prácticas de privacidad de dichos sitios y le recomendamos revisar las políticas de privacidad de cada sitio web que visite.
          </li>
          <li>
            Derechos del titular de los datos<br/>
                6.1. Usted tiene derechos sobre su información personal y puede ejercer los siguientes derechos:<br/>
                a) Acceder, corregir o actualizar su información personal.<br/>
                b) Solicitar la eliminación de su información personal, sujeto a nuestras obligaciones legales y operativas.<br/>
                c) Retirar su consentimiento para el procesamiento de su información personal.<br/>
                d) Oponerse al procesamiento de su información personal para fines de marketing directo.<br/>
                e) Solicitar la limitación del procesamiento de su información personal.<br/>
          </li>
          <li>
            Cambios en la política de privacidad.<br/>
                7.1. Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en nuestras prácticas y servicios. Le notificaremos cualquier cambio relevante publicando la versión actualizada en nuestra Plataforma.
          </li>
          <li>
            Solicitud de Eliminación de Cuenta y Datos Asociados.<br/>
            8.1. Si desea solicitar la eliminación de su cuenta y de los datos asociados, por favor, siga los pasos a continuación:
              a) Envíe un correo electrónico a contacto@streamreaders.com con el asunto “Solicitud de Eliminación de Cuenta”.
              b) Incluya su nombre de usuario y cualquier otra información necesaria para identificar su cuenta.
              c) Nuestro equipo de soporte confirmará la recepción de su solicitud e iniciará el proceso de eliminación de la cuenta.
              
            8.2. Detalles de la Eliminación de Datos:
              a) Una vez recibida una solicitud de eliminación válida, eliminaremos su cuenta y los datos asociados dentro de 1 semana.

            8.3. Para cualquier pregunta o inquietud adicional, por favor, póngase en contacto con nuestro equipo de soporte en contacto@streamreaders.com.
          </li>
          <li>
          Información Financiera.<br/>
            
            9.1. Utilizamos Stripe, un proveedor de servicios de pago externo, para procesar las transacciones en nuestra Plataforma. Al realizar un pago, se le pedirá que proporcione cierta información financiera, como el número de su tarjeta de crédito y la fecha de vencimiento. Esta información se recopila y almacena de forma segura directamente por Stripe, y no tenemos acceso a la información de su tarjeta de crédito.

            9.2. Stripe utiliza y procesa su información financiera de acuerdo con su propia política de privacidad. Le recomendamos que revise la política de privacidad de Stripe para obtener más información sobre cómo se maneja y protege su información financiera.

            9.3. Utilizamos la información financiera proporcionada por Stripe (como el historial de transacciones) para facturarle por nuestros servicios y gestionar su cuenta.

            9.4. Aceptamos tambien pagos en dispositivos Android e iOS utilizando los servicios de procesamiento de pagos de esas plataformas.
          </li>
          <li>
          Suscripción y acceso al contenido.<br/>
            
            10.1. Al registrarse en nuestra Plataforma, usted obtiene una suscripción que le brinda acceso ilimitado a nuestro contenido de audiolibros en español.

            10.2. Los planes de suscripción disponibles son los siguientes:<br/>
                - **Suscripción Mensual 
                - **Suscripción Trimestral 
                - **Suscripción Anual

            10.3. Usted es responsable de mantener la confidencialidad de su cuenta y de todas las actividades que ocurran bajo su nombre de usuario y contraseña.

            10.4. Nos reservamos el derecho de suspender o cancelar su cuenta en caso de violación de estos términos y condiciones o de cualquier conducta que consideremos inapropiada.
          </li>
        </ol>
      </div>
    </ReactModal>
  );
}

export default PrivacyPolicy;
