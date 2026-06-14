import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://chamakkala-travels.vercel.app';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const Seo = ({ title, description, path, ogImage }) => {
  const fullTitle = title ? `${title} | Chamakkala Travels` : 'Chamakkala Travels | Neendoor, Kottayam, Kerala – Travel Agency';
  const fullDescription = description || 'Chamakkala Travels – Your trusted travel partner in Neendoor, Kottayam, Kerala. Book flights, trains, buses and plan bespoke trips with us.';
  const url = `${SITE_URL}${path || '/'}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

const LocalBusinessJsonLd = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'Chamakkala Travels',
        url: SITE_URL,
        telephone: '+919495684965',
        email: 'info@chamakalatravels.com',
        description: 'Kottayam-based travel agency offering flight, train and bus bookings, tour packages, and bespoke trip planning.',
        image: DEFAULT_OG_IMAGE,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Pravattom Junction, Neendoor P. O',
          addressLocality: 'Kottayam',
          addressRegion: 'Kerala',
          postalCode: '686601',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 9.680042,
          longitude: 76.504138,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:30',
            closes: '20:00',
          },
        ],
        sameAs: [
          'https://wa.me/919495684965',
        ],
        areaServed: {
          '@type': 'City',
          name: 'Kottayam',
        },
      })}
    </script>
  </Helmet>
);

export { Seo, LocalBusinessJsonLd };
