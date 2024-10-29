import BeritaLandingPage from "@/components/landing_page/BeritaLandingPage";
import NavMenu from "@/components/landing_page/NavMenu";
import { dummyNewsData } from "./data/dummyNews";

export default function Home() {
  return (
    <div className="">
      <NavMenu />
      <BeritaLandingPage 
        featuredNews={dummyNewsData.featuredNews} 
        news={dummyNewsData.news}
      />
    </div>
  );
}