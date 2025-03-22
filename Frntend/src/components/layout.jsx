import Footer from "./footer";
import Header from "./header";

const Layout = (props) => {
  return (
    <>
      <Header />

      {/* eslint-disable-next-line react/prop-types*/}
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
