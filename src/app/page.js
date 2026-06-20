import Image from "next/image";
import Banner from "./component/Banner";
import FeaturedBooks from "./component/FeaturedBooks";
import TopLibrarian from "./component/TopLibrarian";

export default function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedBooks/>
      <TopLibrarian/>
    </div>
  );
}
