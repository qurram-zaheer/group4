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
/*eslint-disable*/
import { useState, useEffect, useContext } from "react";
import { NavLink as NavLinkRRD, Link, Redirect } from "react-router-dom";
import RepositoriesContext from "../../contexts/RepositoriesContext";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import { api } from "../../lib/api";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Dropdown,
  Col,
} from "reactstrap";
import { LogOut } from "auth/LogOut";
import { useHistory } from "react-router-dom";

var ps;

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [repos, setRepos] = useContext(RepositoriesContext);
  const [repoNames, setRepoNames] = useState("");
  const history = useHistory();

  const changeSelectedRepo = (name) => {
    console.log("REPOOOOOOs", repos, name);
    const foundRepo = repos.repos.find(
      (repo) => `${repo.attributes.owner}/${repo.attributes.name}` === name
    );
    console.log("asdljalksdjaljdiqyherojnsbmxcksjdfkuqeld", {
      ...repos,
      selectedRepo: foundRepo,
    });
    setRepos({ ...repos, selectedRepo: foundRepo });
  };

  useEffect(() => {
    const loadRepos = async () => {
      const userId = localStorage.getItem("strapiUserId");
      const repoData = await api
        .getUserRepos(userId)
        .then((res) => res.data)
        .then((res) => res.data);
      setRepoNames(
        repoData.map(
          (entry) => `${entry.attributes.owner}/${entry.attributes.name}`
        )
      );
      await setRepos({...{ repos: repoData, selectedRepo: repoData[0] }});
      console.log(repoData);
      // console.log('REPOOOOOS', repos)
    };
    loadRepos();
  }, []);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.sidebar != false) {
        console.log(prop.layout + prop.path);
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName="active"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      }
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      {console.log("SIDEBAR PROPS", props)}
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/theme/team-1-800x800.jpg")
                        .default
                    }
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <NavLinkRRD to="/auth/login">
                <DropdownItem onClick={(e) => LogOut()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </NavLinkRRD>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {props.location.pathname.startsWith("/admin/repositories") ||
          props.location.pathname === "/admin/repoHome" ? (
            <Button onClick={() => history.push("/admin/index")}>
              Back to Dashboard
            </Button>
          ) : null}
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {props.location.pathname.startsWith("/admin/repositories") ||
            props.location.pathname === "/admin/repoHome" ? (
              <Dropdown
                isOpen={dropdownOpen}
                toggle={() => setDropdownOpen(!dropdownOpen)}
                style={{ width: "100%", textOverflow: "ellipsis" }}
              >
                <DropdownToggle
                  caret
                  style={{ width: "100%", overflow: "hidden" }}
                >
                  {
                  repos.selectedRepo?.attributes
                    ? `${repos.selectedRepo?.attributes.owner}/${repos.selectedRepo?.attributes?.name}`
                    : "Loading ..."}
                </DropdownToggle>
                {repos.repos.length > 0 ? (
                  <DropdownMenu style={{ width: "80%", overflow: "hidden" }}>
                    {console.log("REPONAMESSSS", repoNames)}
                    {repoNames
                      ? repoNames.map((name) => (
                          <DropdownItem
                            key={name}
                            onClick={() => changeSelectedRepo(name)}
                            style={{ textOverflow: "ellipsis" }}
                          >
                            <span style={{ width: "80%", overflow: "hidden" }}>
                              {name}
                            </span>
                          </DropdownItem>
                        ))
                      : null}
                  </DropdownMenu>
                ) : (
                  "Loading ..."
                )}
              </Dropdown>
            ) : null}
          </div>
          {/* Heading */}
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
