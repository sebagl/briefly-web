
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function AppDownloadButtons() {
  const appleButton = (
    <Link href="https://apps.apple.com/app/id6468820318" >
      <a target="_blank" rel="noopener noreferrer" >
        <Image alt="appleBtn" src={'/assets/apple-app.png'} height={70} width={200}/>
      </a>
    </Link>
  );
    
  const androidButton = (
    <Link href="https://play.google.com/store/apps/details?id=app.stream_readers" >
      <a target="_blank" rel="noopener noreferrer" >
        <Image alt="androidBtn" src={'/assets/android-app.png'} height={70} width={200}/>
      </a>
    </Link>
  );

  const getUserPlatform = () => {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) return 'iOS';
    if (/Android/i.test(navigator.userAgent)) return 'Android';
  };

  const platform = getUserPlatform();
  return (
    <div style={{marginLeft: '-10px', marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {platform === 'iOS' && appleButton}
      {platform === 'Android' && androidButton}
    </div>
  );
}

export default AppDownloadButtons;
