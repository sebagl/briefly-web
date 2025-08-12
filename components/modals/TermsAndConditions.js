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
            Al utilizar nuestra plataforma de audiolibros en español, Stream Readers (en adelante, la "Plataforma"), usted acepta regirse por los siguientes términos y condiciones:
        </p>
        <ol>
          <li>
          Suscripción y acceso al contenido.<br/>
            1.1. Al suscribirse a en nuestra membresia, usted obtiene una suscripción que le brinda acceso ilimitado a nuestro contenido de audiolibros en español.<br/>
            1.2. Usted es responsable de mantener la confidencialidad de su cuenta y de todas las actividades que ocurran bajo su nombre de usuario y contraseña.<br/>
            1.3. Nos reservamos el derecho de suspender o cancelar su cuenta en caso de violación de estos términos y condiciones o de cualquier conducta que consideremos inapropiada.
          </li>
          <li>
          Propiedad intelectual.<br/>
            2.1. Todos los derechos de propiedad intelectual relacionados con nuestra Plataforma y su contenido, incluidos los audiolibros, son propiedad de Stream Readers, LLC o de sus respectivos propietarios.<br/>
            2.2. Usted acepta no copiar, distribuir, transmitir, mostrar, vender, licenciar o explotar de ninguna otra forma el contenido de nuestra Plataforma sin nuestro consentimiento previo por escrito.
          </li>
          <li>
          Responsabilidad y limitación de responsabilidad.<br/>
            3.1. Nos esforzamos por ofrecer un servicio de calidad, pero no garantizamos que nuestra Plataforma esté libre de errores, interrupciones o que el contenido sea exacto o completo.<br/>
            3.2. No seremos responsables por daños directos, indirectos, incidentales, especiales o consecuentes, incluyendo pérdida de beneficios, que puedan surgir del uso o la imposibilidad de usar nuestra Plataforma.
          </li>
          <li>
          Ley aplicable y jurisdicción.<br/>
            4.1. Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del Estado de Florida, Estados Unidos.<br/>
            4.2. Cualquier disputa que surja en relación con estos términos y condiciones estará sujeta a la jurisdicción exclusiva de los tribunales estatales y federales ubicados en el condado de Miami-Dade, Florida.
          </li>
          <li>
            Al aceptar estos términos y condiciones, también otorga su consentimiento para que utilicemos su información personal para fines de marketing, de acuerdo con nuestra Política de Privacidad.
          </li>
          <li>
            Acuerdo de Licencia de Usuario Final de Aplicación Licenciada (EULA Estándar)<br/>
            Las aplicaciones disponibles a través de la App Store se otorgan bajo licencia, no se venden a usted. Su licencia para cada Aplicación está sujeta a su aceptación previa de este Acuerdo de Licencia de Usuario Final de Aplicación Licenciada ("EULA Estándar") o un acuerdo de licencia de usuario final personalizado entre usted y el Proveedor de la Aplicación ("EULA Personalizado"), si se proporciona uno. Su licencia para cualquier aplicación de Apple bajo este EULA Estándar o EULA Personalizado es otorgada por Apple, y su licencia para cualquier aplicación de terceros bajo este EULA Estándar o EULA Personalizado es otorgada por el Proveedor de la Aplicación de ese tercero. Cualquier Aplicación que esté sujeta a este EULA Estándar se denomina "Aplicación Licenciada". El Proveedor de la Aplicación o Apple, según corresponda ("Licenciante"), se reserva todos los derechos sobre la Aplicación Licenciada no expresamente otorgados a usted bajo este EULA Estándar.
            <br/>
            a. Alcance de la Licencia: El Licenciante le otorga una licencia no transferible para usar la Aplicación Licenciada en cualquier producto de Apple que usted posea o controle y según lo permitido por las Reglas de Uso. Los términos de este EULA Estándar regirán cualquier contenido, material o servicios accesibles desde o comprados dentro de la Aplicación Licenciada, así como las actualizaciones proporcionadas por el Licenciante que reemplacen o complementen la Aplicación Licenciada original, a menos que dicha actualización esté acompañada de un EULA Personalizado. Salvo lo dispuesto en las Reglas de Uso, usted no puede distribuir ni hacer disponible la Aplicación Licenciada en una red donde podría ser utilizada por múltiples dispositivos al mismo tiempo. No puede transferir, redistribuir o sublicenciar la Aplicación Licenciada y, si vende su Dispositivo Apple a un tercero, debe eliminar la Aplicación Licenciada del Dispositivo Apple antes de hacerlo. No puede copiar (excepto según lo permitido por esta licencia y las Reglas de Uso), desensamblar, intentar derivar el código fuente de, modificar o crear trabajos derivados de la Aplicación Licenciada, cualquier actualización o cualquier parte de la misma (excepto y solo en la medida en que dicha restricción sea prohibida por la ley aplicable o en la medida en que lo permitan los términos de la licencia que rigen el uso de cualquier componente de código abierto incluido con la Aplicación Licenciada).
            <br/>
            b. Consentimiento para el Uso de Datos: Usted acepta que el Licenciante pueda recopilar y usar datos técnicos e información relacionada, incluidos, entre otros, información técnica sobre su dispositivo, sistema y software de aplicación, y periféricos, que se recopila periódicamente para facilitar la provisión de actualizaciones de software, soporte de producto y otros servicios para usted (si los hay) relacionados con la Aplicación Licenciada. El Licenciante puede usar esta información, siempre que esté en una forma que no lo identifique personalmente, para mejorar sus productos o para proporcionarle servicios o tecnologías.
            <br/>
            c. Terminación: Este EULA Estándar está en vigor hasta que usted o el Licenciante lo terminen. Sus derechos bajo este EULA Estándar terminarán automáticamente si no cumple con cualquiera de sus términos.
            <br/>
            d. Servicios Externos: La Aplicación Licenciada puede permitir el acceso a los servicios y sitios web del Licenciante y/o de terceros (colectivamente e individualmente, "Servicios Externos"). Usted acepta usar los Servicios Externos bajo su propio riesgo. El Licenciante no es responsable de examinar o evaluar el contenido o la precisión de los Servicios Externos de terceros, y no será responsable de dichos Servicios Externos de terceros. Los datos mostrados por cualquier Aplicación Licenciada o Servicio Externo, incluidos, entre otros, información financiera, médica y de ubicación, son solo para fines informativos generales y no están garantizados por el Licenciante ni sus agentes. No utilizará los Servicios Externos de manera incompatible con los términos de este EULA Estándar o que infrinja los derechos de propiedad intelectual del Licenciante o de terceros. Usted acepta no usar los Servicios Externos para acosar, abusar, acechar, amenazar o difamar a ninguna persona o entidad, y que el Licenciante no es responsable de dicho uso. Los Servicios Externos pueden no estar disponibles en todos los idiomas o en su país de origen, y pueden no ser apropiados o estar disponibles para su uso en una ubicación en particular. En la medida en que elija usar dichos Servicios Externos, usted es el único responsable de cumplir con cualquier ley aplicable. El Licenciante se reserva el derecho de cambiar, suspender, eliminar, desactivar o imponer restricciones o límites de acceso a cualquier Servicio Externo en cualquier momento sin previo aviso o responsabilidad hacia usted.
            <br/>
            e. SIN GARANTÍA: USTED RECONOCE Y ACEPTA EXPRESAMENTE QUE EL USO DE LA APLICACIÓN LICENCIADA ES BAJO SU PROPIO RIESGO. HASTA EL MÁXIMO PERMITIDO POR LA LEY APLICABLE, LA APLICACIÓN LICENCIADA Y CUALQUIER SERVICIO REALIZADO O PROPORCIONADO POR LA APLICACIÓN LICENCIADA SE PROPORCIONAN "TAL CUAL" Y "SEGÚN DISPONIBILIDAD", CON TODOS LOS DEFECTOS Y SIN GARANTÍA DE NINGÚN TIPO, Y EL LICENCIANTE RENUNCIA POR LA PRESENTE A TODAS LAS GARANTÍAS Y CONDICIONES CON RESPECTO A LA APLICACIÓN LICENCIADA Y CUALQUIER SERVICIO, YA SEA EXPRESA, IMPLÍCITA O ESTATUTARIA, INCLUYENDO, PERO NO LIMITADO A, LAS GARANTÍAS IMPLÍCITAS Y/O CONDICIONES DE COMERCIABILIDAD, CALIDAD SATISFACTORIA, IDONEIDAD PARA UN PROPÓSITO PARTICULAR, PRECISIÓN, DISFRUTE TRANQUILO Y NO INFRACCIÓN DE DERECHOS DE TERCEROS. NINGUNA INFORMACIÓN O CONSEJO ORAL O ESCRITO DADO POR EL LICENCIANTE O SU REPRESENTANTE AUTORIZADO CREARÁ UNA GARANTÍA. SI LA APLICACIÓN LICENCIADA O LOS SERVICIOS DEMUESTRAN SER DEFECTUOSOS, USTED ASUME EL COSTO TOTAL DE TODOS LOS SERVICIOS, REPARACIONES O CORRECCIONES NECESARIOS. ALGUNAS JURISDICCIONES NO PERMITEN LA EXCLUSIÓN DE GARANTÍAS IMPLÍCITAS O LIMITACIONES A LOS DERECHOS ESTATUTARIOS APLICABLES DE UN CONSUMIDOR, POR LO QUE LAS EXCLUSIONES Y LIMITACIONES ANTERIORES PUEDEN NO APLICARSE A USTED.
            <br/>
            f. Limitación de Responsabilidad: EN LA MEDIDA EN QUE NO ESTÉ PROHIBIDO POR LA LEY, EN NINGÚN CASO EL LICENCIANTE SERÁ RESPONSABLE DE LESIONES PERSONALES O DE NINGÚN DAÑO INCIDENTAL, ESPECIAL, INDIRECTO O CONSECUENTE, INCLUYENDO, SIN LIMITACIÓN, DAÑOS POR PÉRDIDA DE BENEFICIOS, PÉRDIDA DE DATOS, INTERRUPCIÓN DEL NEGOCIO O CUALQUIER OTRO DAÑO O PÉRDIDA COMERCIAL, QUE SURJA DE O ESTÉ RELACIONADO CON SU USO O INCAPACIDAD PARA USAR LA APLICACIÓN LICENCIADA, INDEPENDIENTEMENTE DE LA TEORÍA DE RESPONSABILIDAD (CONTRATO, AGRAVIO U OTRA) Y AUNQUE EL LICENCIANTE HAYA SIDO ADVERTIDO DE LA POSIBILIDAD DE TALES DAÑOS. ALGUNAS JURISDICCIONES NO PERMITEN LA LIMITACIÓN DE RESPONSABILIDAD POR LESIONES PERSONALES O DAÑOS INCIDENTALES O CONSECUENTES, POR LO QUE ESTA LIMITACIÓN PUEDE NO APLICARSE A USTED. En ningún caso la responsabilidad total del Licenciante hacia usted por todos los daños (que no sean los requeridos por la ley aplicable en casos de lesiones personales) excederá la cantidad de cincuenta dólares ($50.00). Las limitaciones anteriores se aplicarán incluso si el remedio anterior falla en su propósito esencial.
            <br/>
            g. No puede usar o exportar o reexportar la Aplicación Licenciada excepto según lo autorizado por la ley de los Estados Unidos y las leyes de la jurisdicción en la que se obtuvo la Aplicación Licenciada. En particular, pero sin limitación, la Aplicación Licenciada no puede exportarse o reexportarse (a) a ningún país embargado por los EE. UU. o (b) a cualquier persona en la Lista de Nacionales Especialmente Designados del Departamento del Tesoro de EE. UU. o en la Lista de Personas Denegadas del Departamento de Comercio de EE. UU. o en la Lista de Entidades. Al usar la Aplicación Licenciada, usted declara y garantiza que no se encuentra en ninguno de esos países ni en ninguna de esas listas. También acepta que no utilizará estos productos para ningún propósito prohibido por la ley de los Estados Unidos, incluidos, entre otros, el desarrollo, diseño, fabricación o producción de armas nucleares, misiles o armas químicas o biológicas.
            <br/>
            h. La Aplicación Licenciada y la documentación relacionada son "Artículos Comerciales", como se define en 48 C.F.R. §2.101, que consisten en "Software Comercial para Computadoras" y "Documentación de Software Comercial para Computadoras", como se usan dichos términos en 48 C.F.R. §12.212 o 48 C.F.R. §227.7202, según corresponda. De acuerdo con 48 C.F.R. §12.212 o 48 C.F.R. §227.7202-1 a 227.7202-4, según corresponda, el Software Comercial para Computadoras y la Documentación de Software Comercial para Computadoras se otorgan bajo licencia a los usuarios finales del Gobierno de EE. UU. (a) solo como Artículos Comerciales y (b) con solo aquellos derechos que se otorgan a todos los demás usuarios finales conforme a los términos y condiciones aquí establecidos. Derechos no publicados reservados bajo las leyes de derechos de autor de los Estados Unidos.
            <br/>
            i. Excepto en la medida expresamente prevista en el párrafo siguiente, este Acuerdo y la relación entre usted y Apple se regirán por las leyes del Estado de California, excluyendo sus disposiciones sobre conflictos de leyes. Usted y Apple acuerdan someterse a la jurisdicción personal y exclusiva de los tribunales ubicados dentro del condado de Santa Clara, California, para resolver cualquier disputa o reclamo que surja de este Acuerdo. Si (a) no es ciudadano de EE. UU.; (b) no reside en EE. UU.; (c) no está accediendo al Servicio desde EE. UU.; y (d) es ciudadano de uno de los países identificados a continuación, por la presente acepta que cualquier disputa o reclamo que surja de este Acuerdo se regirá por la ley aplicable establecida a continuación, sin tener en cuenta ningún conflicto de disposiciones legales, y por la presente se somete irrevocablemente a la jurisdicción no exclusiva de los tribunales ubicados en el estado, provincia o país identificado a continuación cuya ley rija:
            <br/>
            Si es ciudadano de cualquier país de la Unión Europea o Suiza, Noruega o Islandia, la ley y el foro gobernantes serán las leyes y los tribunales de su lugar de residencia habitual.
            <br/>
            Específicamente excluida de la aplicación a este Acuerdo está la ley conocida como la Convención de las Naciones Unidas sobre la Venta Internacional de Bienes.
          </li>
        </ol>
      </div>
    </ReactModal>
  );
}

export default TermsAndConditions;
