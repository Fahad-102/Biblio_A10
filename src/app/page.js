import Banner from "./component/Banner";
import FeaturedBooks from "./component/FeaturedBooks";
import TopLibrarian from "./component/TopLibrarian";
import { FAQSection } from "./component/FAQSection";

export default function Home() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-10">
      <Banner/>
      <FeaturedBooks/>
      <TopLibrarian/>
      <FAQSection/>
      </div>
    </div>
  );
}
