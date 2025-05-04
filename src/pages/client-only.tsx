import { Header, Layout } from '@/components';
import { Config, UserProfile } from '@/modules';
import { useRoomInfo } from '@/modules/Room/hooks';

const ClientOnly = () => {
  const id = 'm9qjx3vl0c1118'; // Example room ID
  const { data } = useRoomInfo({ id });
  return (
    <Layout>
      <Header />
      <Config />
      <UserProfile />
      {data ? JSON.stringify(data, null, 2) : undefined}
    </Layout>
  );
};

export default ClientOnly;
