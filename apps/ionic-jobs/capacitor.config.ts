import { CapacitorConfig } from '@capacitor/cli';

let config: CapacitorConfig;

const baseConfig: CapacitorConfig = {
  appId: 'uk.co.homecareservicecentre',
  appName: 'Homecare',
  webDir: 'www',
  bundledWebRuntime: false
};

switch (process.env.NODE_ENV) {
  case 'production':
    console.log('Production copy');
    config = {
      ...baseConfig,
      android: {
        flavor: 'production',
      }
    };
    break;
  case 'staging':
    console.log('Staging copy');
    config = {
      ...baseConfig,
      android: {
        flavor: 'staging',
      },
    };
    break;
}

export default config;
