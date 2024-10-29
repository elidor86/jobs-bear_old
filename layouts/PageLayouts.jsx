import { navigation } from "../lib/navigationUtils";
import { footer } from "../lib/footerUtils";
import Navigation from "../components/ext/Navigation/Navigation";
import Footer from "../components/ext/Footer/Footer";

const PageLayout = ({ children }) => (
  <>
    <Navigation {...navigation} />
    {children}
    <Footer {...footer} />
  </>
);

export default PageLayout;
