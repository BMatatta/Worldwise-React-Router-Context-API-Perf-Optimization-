import {Link} from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

function Home() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1>Worldwise</h1>

      <Link to="/app">App</Link>
    </div>
  );
}

export default Home;
