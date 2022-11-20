import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form, FormControl, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { searchHistoryAtom } from "../store";

function MainNav() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
  return (
    <Navbar
      className="fixed-top navbar-dark bg-primary"
      variant="light"
      expand="lg"
      expanded={isExpanded}
    >
      <Container>
        <Navbar.Brand>Harpreet Kaur Aulakh</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded((expanded => !expanded))} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>Home</Nav.Link>
            </Link>
            <Link href="/search" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
            </Link>
          </Nav>
          <Form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              setSearchHistory(current => [...current, `/artwork?title=true&q=${query}`]);
              router.push(`/artwork?title=true&q=${query}`);
              setIsExpanded(false)
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
          <Nav>
            <NavDropdown title="User Name" id="basic-nav-dropdown">
              <Link href="/favourites" passHref legacyBehavior>
                <NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)} >Favourites</NavDropdown.Item>
              </Link>
              <Link href="/history" passHref legacyBehavior>
                <NavDropdown.Item active={router.pathname === "/history"} onClick={() => setIsExpanded(false)} >Search History</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;
