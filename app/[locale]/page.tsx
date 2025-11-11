import HeaderWrapper from "@/components/home/HeaderWrapper";
import AppLayout from "@/components/layouts/app-layout";
import { InstallPrompt, PushNotificationManager } from "@/components/pwa";
import Welcome from "@/components/sidebar/welcome";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <AppLayout
      user={data?.user}
      sidebarItem={<Welcome />}
    >
      <HeaderWrapper user={data?.user} />

      {/* <PushNotificationManager />
      <InstallPrompt /> */}

    </AppLayout>

  );
}



