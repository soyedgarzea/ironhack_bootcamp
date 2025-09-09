import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import LendService from "../../services/lendService";
import { Link } from "react-router-dom";
import UserContext from "../../utils/user.context";
import {
  Button,
  Navbar,
  Nav,
  Form,
  FormControl,
  Image,
  NavDropdown,
  Container,
} from "react-bootstrap";

const NavbarP = () => {
  const history = useHistory();

  const [searchState, updateSearchState] = useState("");

  const { user, updateUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { value } = e.target;
    updateSearchState(value);
  };

  const handleLogOut = () => {
    const lendService = new LendService();

    lendService.logOut().then(() => {
      updateUser(null);
      history.push("/");
    });
  };

  return (
    <Container fluid className="navbarP">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">
            <Image src="../images/presta-logo.svg" className="logo-nav" />
          </Link>
        </Navbar.Brand>
        <Form
          style={{ display: "flex", flexDirection: "row", flexFlow: "no-wrap" }}
        >
          <FormControl
            type="text"
            placeholder="Buscar"
            className="mr-sm-2"
            onChange={(e) => handleChange(e)}
            className="text"
          />
          <Link to={`/results/${searchState}`}>
            <Button variant="dark" className="text buttonP">
              Buscar
            </Button>
          </Link>
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav style={{ marginRight: "100px" }}>
            <Link to="/" className="text navbarP-link">
              Inicio
            </Link>
            {user ? (
              <NavDropdown
                title={`Hola ${user.username}`}
                id="basic-nav-dropdown"
                className="text"
              >
                <Link
                  to={`/profile/${user.username}`}
                  className="text navbarP-item"
                >
                  Perfil
                </Link>
                <NavDropdown.Divider />

                <Link
                  to="/"
                  className="text navbarP-item"
                  onClick={handleLogOut}
                >
                  Salir
                </Link>
              </NavDropdown>
            ) : (
              <NavDropdown
                title="Únete"
                id="basic-nav-dropdown"
                className="text"
              >
                <Link to="/login" className="text navbarP-item">
                  Inicia Sesión
                </Link>
                <NavDropdown.Divider />
                <Link to="/register" className="text navbarP-item">
                  Regístrate
                </Link>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavbarP;
