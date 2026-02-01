import HeaderWrapper from "@/components/home/HeaderWrapper";
import AppLayout from "@/components/layouts/app-layout";
import { InstallPrompt, PushNotificationManager } from "@/components/pwa";
import Welcome from "@/components/sidebar/welcome";

export default function Home() {


  return (
    <AppLayout sidebarItem={<Welcome />}>
      <HeaderWrapper />

      {/* <PushNotificationManager />
      <InstallPrompt /> */}

    </AppLayout>

  );
}



