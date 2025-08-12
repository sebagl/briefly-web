
export default function LearningRedirect() {
  return null;
}
  
export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: 'stream-readers://home/learning',
      permanent: false,
    },
  };
}