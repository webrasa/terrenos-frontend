import { Meta } from '@/layouts/Meta';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import type { IndexTranslations } from '@/types/Translation';
import { AppConfig } from '@/utils/AppConfig';

const Index = ({ general, tripSection }: IndexTranslations) => {
  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={general.title}
        description={general.description}
        image={AppConfig.image_url}
      />
      <Navbar />
      {tripSection.title}
      <Footer />
    </div>
  );
};

export default Index;
