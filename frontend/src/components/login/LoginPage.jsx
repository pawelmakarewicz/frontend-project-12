import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <Container fluid className="h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="text-muted">
              SignUp
            </Card.Footer>
          </Card>
        </div>
      </div>
    </Container>
  );
}
