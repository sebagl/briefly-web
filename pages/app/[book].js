
export default function BookRedirect() {
  return null;
}
  
export async function getServerSideProps(context) {
  const { book } = context.params;
    
  // Build the destination URL
  const destination = `stream-readers://book/${encodeURIComponent(book)}`;
  
  return {
    redirect: {
      destination: destination,
      permanent: false,
    },
  };
}