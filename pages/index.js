export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/suscribete',
      permanent: false,
    },
  };
}

export default function Index() {
  return null;
}
