import { Background } from '@/background/Background';
import { VerticalFeatureElement } from '@/feature/VerticalFeatureElement';
import { VerticalFeatureElementColumn } from '@/feature/VerticalFeatureElementColumn';
import { VerticalFeatureRow } from '@/feature/VerticalFeatureRow';
import { LandingSection } from '@/layouts/LandingSection';

/**
 * List of features shown vertically with a complete description.
 * @component
 */
const VerticalFeatures = () => (
  <>
    <Background color="bg-gray-100">
      <LandingSection>
        <VerticalFeatureRow
          title="Your title here"
          image={{
            src: '/assets/images/feature.svg',
            alt: 'Generated social media visuals',
          }}
          subtitle="Awesome feature"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis
            rutrum urna, ut ultricies lorem. Quisque scelerisque tincidunt
            velit, consectetur vehicula lectus convallis ut.
          </p>
          <VerticalFeatureElement
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3M12 12l8-4.5M12 12v9M12 12L4 7.5" />
              </svg>
            }
            title="Your title here"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis
            rutrum urna, ut ultricies lorem.
          </VerticalFeatureElement>
          <VerticalFeatureElement
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M3 21v-4a4 4 0 114 4H3M21 3A16 16 0 008.2 13.2M21 3a16 16 0 01-10.2 12.8M10.6 9a9 9 0 014.4 4.4" />
              </svg>
            }
            title="Your title here"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis
            rutrum urna, ut ultricies lorem.
          </VerticalFeatureElement>
          <VerticalFeatureElement
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M3 12h1m8-9v1m8 8h1M5.6 5.6l.7.7m12.1-.7l-.7.7M9 16a5 5 0 116 0 3.5 3.5 0 00-1 3 2 2 0 01-4 0 3.5 3.5 0 00-1-3M9.7 17h4.6" />
              </svg>
            }
            title="Your title here"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis
            rutrum urna, ut ultricies lorem.
          </VerticalFeatureElement>
        </VerticalFeatureRow>
      </LandingSection>
    </Background>

    <LandingSection>
      <VerticalFeatureRow
        title="Your title here"
        image={{
          src: '/assets/images/feature3.svg',
          alt: 'Generated social share image for Jamstack',
        }}
        subtitle="Awesome feature"
        reverse
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          malesuada nisi tellus, non imperdiet nisi tempor at:
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <VerticalFeatureElementColumn
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2M16 4h2a2 2 0 012 2v2M16 20h2a2 2 0 002-2v-2" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
            title="Your title here"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis
            rutrum urna, ut ultricies lorem.
          </VerticalFeatureElementColumn>
          <VerticalFeatureElementColumn
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="M4 19h16M4 15l4-6 4 2 4-5 4 4" />
              </svg>
            }
            title="Your title here"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis
            rutrum urna, ut ultricies lorem.
          </VerticalFeatureElementColumn>
        </div>
      </VerticalFeatureRow>
    </LandingSection>
  </>
);

export { VerticalFeatures };
