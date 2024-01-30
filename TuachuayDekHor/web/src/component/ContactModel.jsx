import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "./ContactModal.scoped.css"

function ContactModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const mail_user = 'exampleForm.ControlInput1';

  return (
    <>
      <img src="/mail-outline.svg" alt="" onClick={handleShow} className='mail_edit' />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* mail user */}
            <Form.Group className="mb-3" controlId={mail_user}>
              <Form.Label>To:</Form.Label>
              <Form.Control
                type="email"
                placeholder="nameWriter@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId='Email_input'>
              <Form.Label>Form:</Form.Label>
              <Form.Control
                type="email"
                placeholder="your email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId='Email_input'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="type your title"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control as="textarea" rows={3} placeholder='type message here'/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className='Close-btn' onClick={handleClose}>
            Close
          </button>
          <button className='Send-btn' onClick={handleClose}>
            Send Message
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ContactModal;