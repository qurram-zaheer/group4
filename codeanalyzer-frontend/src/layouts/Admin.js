/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Redirect, Switch, useLocation, Route } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import repoRoutes from "repoRoutes";

import { PrivateRoute } from "auth/PrivateRoute";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <PrivateRoute
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      {console.log("LAYOUT PTOPS", props)}
      <Sidebar
        {...props}
        routes={
          props.location.pathname.startsWith("/admin/repositories") ||
          props.location.pathname === "/admin/repoHome"
            ? repoRoutes
            : routes
        }
        logo={{
          innerLink: "/auth/login",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />
      <div
        className="main-content"
        style={{ height: "100%" }}
        ref={mainContent}
      >
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(
            props.location.pathname.startsWith("/admin/repositories") ||
              props.location.pathname === "/admin/repoHome"
              ? repoRoutes
              : routes
          )}
          <Redirect from="*" to="/auth/login" />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
