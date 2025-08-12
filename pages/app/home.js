import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AppHomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('stream-readers://home/inicio'); // Use the encoded URL for client-side redirection
  }, [router]);

  return null;
} 