import { useFormik } from 'formik';
import { useState } from 'react';
import {
  Modal, Form, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import * as Yup from 'yup';
import useFocus from '../../hooks/useFocus';
import disableInputTemporary from '../../lib/disableInputTemporary';

const validationSchema = Yup.object().shape({
  body: Yup.string()
    .min(3, 'Input field must be at least 3 characters')
    .max(20, 'Input field must not exceed 20 characters')
    .required('Input field is required'),
});

function Add({ onHide }) {
  const [inputState, setInputState] = useState(false);
  const f = useFormik({
    initialValues: { body: '' },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      disableInputTemporary(setInputState);
    },
  });
  const inputRef = useFocus();
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Form onSubmit={f.handleSubmit} noValidate>
        <Modal.Body>
          <FormGroup>
            <FormControl
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.body}
              disabled={inputState}
              name="body"
              isInvalid={!!f.errors.body}
            />
            <Form.Control.Feedback type="invalid">
              {f.errors.body}
            </Form.Control.Feedback>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="secondary" onClick={onHide}>Отмена</Button>
          <Button type="submit" variant="primary" disabled={inputState}>Отправить</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Add;
