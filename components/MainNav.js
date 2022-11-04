import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


function MainNav() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  return (
    <Navbar
      className="fixed-top navbar-dark bg-primary"
      variant="light"
      expand="lg"
    >
      <Container>
        <Navbar.Brand>Harpreet Kaur Aulakh</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link href="/" passHref legacyBehavior><Nav.Link>Home</Nav.Link></Link>
          <Link href="/search" passHref legacyBehavior><Nav.Link>Advanced Search</Nav.Link></Link>
            
            
          </Nav>
          <Form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/artwork?title=true&q=${query}`);
            }}
          >
            <FormControl
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              className="me-2"
              placeholder="search"
            />
            <Button type="submit" variant="success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;
