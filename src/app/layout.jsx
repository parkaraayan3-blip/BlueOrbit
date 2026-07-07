import './globals.css';

export const metadata = {
  metadataBase: new URL('https://blueorbit.agency'),
  title: 'Blue Orbit | Premium Digital Agency',
  description: 'We craft immersive, state-of-the-art web experiences and luxury digital applications for brands that want to stand out. Let us elevate your digital presence.',
  openGraph: {
    title: 'Blue Orbit | Premium Digital Agency',
    description: 'We craft immersive, state-of-the-art web experiences and luxury digital applications.',
    url: 'https://blueorbit.agency',
    siteName: 'Blue Orbit',
    images: [
      {
        url: '/og-image.jpg', // Placeholder for actual OG image
        width: 1200,
        height: 630,
        alt: 'Blue Orbit Digital Agency Hero Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blue Orbit | Premium Digital Agency',
    description: 'We craft immersive, state-of-the-art web experiences and luxury digital applications.',
    images: ['/og-image.jpg'], // Placeholder for actual Twitter Card image
  },
  icons: {
    icon: '/favicon-small.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
