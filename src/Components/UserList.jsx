import { Offcanvas } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { fetchUser } from "../Utils/api";
import { Form, Button, FloatingLabel } from "react-bootstrap";

export const UserList = ({ showOffCanvas, setShowOffCanvas }) => {
  const [username, setUsername] = useState("grumpy19");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const { user: userProfile } = await fetchUser(username);
      setUser(userProfile);
      setShowOffCanvas(false);
      navigate(`/users/${username}`);
    } catch (err) {
      console.log("login error");
    }
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={() => setShowOffCanvas(false)}
      placement="end"
    >
      <Offcanvas.Header
        closeButton
        className="align-self-start"
      ></Offcanvas.Header>
      <Offcanvas.Title className="align-self-center">Login</Offcanvas.Title>
      <Offcanvas.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="username">
            <FloatingLabel controlId="floatingUsername" label="Username">
              <Form.Control
                type="input"
                placeholder="Enter username"
                value={username}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" size="lg">
              Login
            </Button>
          </div>
        </Form>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            onClick={() => {
              navigate("/register");
              setShowOffCanvas(false);
            }}
          >
            <strong style={{ textDecoration: "underline" }}>
              Don't have an account? Register here
            </strong>
          </span>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
