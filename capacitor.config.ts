import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.17af065c08e649a092944a50b07dc100',
  appName: 'sairents-simple-drive',
  webDir: 'dist',
  server: {
    url: "https://17af065c-08e6-49a0-9294-4a50b07dc100.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#1a365d'
    }
  }
};

export default config;