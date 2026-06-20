import Image from "next/image";
import Banner from "./component/Banner";
import FeaturedBooks from "./component/FeaturedBooks";

export default function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedBooks/>
    </div>
  );
}
