import Image from 'next/image';
import loader from '@/app/assets/loader.gif';

const LoadingPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Image src={loader} height={65} width={65} alt="Loading ..." />
    </div>
  );
};

export default LoadingPage;
