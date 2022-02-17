import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'uk.co.homecareservicecentre',
  appName: 'Homecare',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    hostname: 'homecareservicecentre.com'
  }
};

export default config;
