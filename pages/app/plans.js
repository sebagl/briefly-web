
export default function PlansRedirect() {
  return null;
}
  
export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: 'stream-readers://profile/suscription',
      permanent: false,
    },
  };
}