import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

interface ProfilePic {
  picName: string;
  picPath: string;
}

interface StudentData {
  _id?: string;
  userId: string;
  consultantId: string;
  name: string;
  roll_number: string;
  registration_number: string;
  father_name: string;
  mother_name: string;
  address: string;
  email: string;
  phone: string;
  date_of_birth: string;
  profilePic: ProfilePic;
  category: string;
  aadhar_number: string;
  pan_number: string;
  course_name: string;
  education: any[]; // You might want to specify the correct type here
}

interface AddStudentProps {
  show: boolean;
  student: StudentData | null;
  handleClose: () => void;
  handleAddStudent: (student: StudentData) => void;
}

const AddStudent: React.FC<AddStudentProps> = ({ show, student, handleClose, handleAddStudent }) => {
  const initialFormData: StudentData = {
    userId: '',
    consultantId: '',
    name: '',
    roll_number: '',
    registration_number: '',
    father_name: '',
    mother_name: '',
    address: '',
    email: '',
    phone: '',
    date_of_birth: '',
    profilePic: { picName: '', picPath: '' },
    category: '',
    aadhar_number: '',
    pan_number: '',
    course_name: '',
    education: []
  };

  const [formData, setFormData] = useState<StudentData>(initialFormData);

  useEffect(() => {
    if (student) {
      setFormData({ ...student });
    } else {
      setFormData(initialFormData);
    }
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const apiUrl = `http://localhost:5500/api/v1/addStudent/SMFAq7d52d7SKzUAliKe9EoqHR/${student ? student._id : ''}`;
    const method = student ? 'PUT' : 'POST';

    fetch(apiUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      if (data.status) {
        handleAddStudent(data.data); // Pass the added/updated student data to the parent component
        handleClose();
      } else {
        console.error('Error:', data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <Modal isOpen={show} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{student ? 'Edit Student' : 'Add Student'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
              Roll Number:
              <input type="text" name="roll_number" value={formData.roll_number} onChange={handleChange} />
            </label>
            {/* Add other fields as needed */}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {student ? 'Update Student' : 'Add Student'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddStudent;
