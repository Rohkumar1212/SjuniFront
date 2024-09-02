import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';

interface ProfilePic {
  picName: string;
  picPath: string;
}

interface Education {
  marksheet: {
    fileName: string;
    filePath: string;
    marksheetName: string;
  };
  student_class: string;
  roll_number: string;
  board_name: string;
  passing_year: string;
  _id: string;
}

interface Student {
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
  education: Education[];
}

interface AddStudentProps {
  show: boolean;
  student: Student | null;
  handleClose: () => void;
  handleAddStudent: (student: Student) => void;
}

const AddStudent: React.FC<AddStudentProps> = ({ show, student, handleClose, handleAddStudent }) => {
  const initialFormData: Student = {
    userId: '',
    consultantId: 'SMFAq7d52d7SKzUAliKe9EoqHR',
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

  const [formData, setFormData] = useState<Student>(initialFormData);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (student) {
      setFormData({ ...student });
    } else {
      setFormData(initialFormData);
    }
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Rest of the function remains the same
  
    if (name.includes('profilePic.')) {
      const profilePicField = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        profilePic: {
          ...prevState.profilePic,
          [profilePicField]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
 
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicFile(e.target.files[0]);
    }
  };

  const validateFormData = (data: Student) => {
    const requiredFields = [
      'userId', 'name', 'roll_number', 'registration_number', 'father_name', 'mother_name', 'address', 'email', 'phone', 
      'date_of_birth', 'category', 'aadhar_number', 'pan_number', 'course_name'
    ];
    const missingFields = requiredFields.filter(field => !data[field as keyof Student]);
    setMissingFields(missingFields);
    return missingFields.length > 0 ? `The following fields are required: ${missingFields.join(', ')}` : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const validationError = validateFormData(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'profilePic') {
        // profilePic is handled separately
        return;
      }
      formDataToSend.append(key, (formData as any)[key]);
    });

    if (profilePicFile) {
      formDataToSend.append('profilePic', profilePicFile);
    }

    console.log('Submitting form with data:', formDataToSend); // Log the form data being sent

    try {
      if (student) {
        // Update student
        const apiUrl = `http://localhost:5500/api/v1/updateStudent/${student.userId}/${student.consultantId}/${student._id}`;
        const response = await axios.put(apiUrl, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        handleAddStudent(response.data.data); // Update the parent component with the new data
      } else {
        // Add new student
        const apiUrl = 'http://localhost:5500/api/v1/addStudent/SMFAq7d52d7SKzUAliKe9EoqHR/6j3uKLkcMtgpNzPyStmXZboEPQezPBjzQEUFA64X1ejcUNuvbHE';
        const response = await axios.post(apiUrl, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccessMessage('Student Added Successfully');
        handleAddStudent(response.data.data); // Add the new student data to the parent component
      }
      handleClose();
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Error submitting form. Please try again.';
      setError(errorMsg);
      console.error('Error submitting form:', error);
    }
  };

  const modalSize = useBreakpointValue({ base: 'full', md: 'xl' });

  return (
    <>
      <Modal isOpen={show} onClose={handleClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{student ? 'Edit Student' : 'Add Student'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              {[
                { label: 'User ID', name: 'userId', type: 'text' },
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Roll Number', name: 'roll_number', type: 'text' },
                { label: 'Registration Number', name: 'registration_number', type: 'text' },
                { label: 'Father\'s Name', name: 'father_name', type: 'text' },
                { label: 'Mother\'s Name', name: 'mother_name', type: 'text' },
                { label: 'Address', name: 'address', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Phone', name: 'phone', type: 'tel' },
                { label: 'Date of Birth', name: 'date_of_birth', type: 'date' },
                { label: 'Profile Picture Name', name: 'profilePic.picName', type: 'text' },
                { label: 'Profile Picture Path', name: 'profilePic.picPath', type: 'text' },
                { label: 'Category', name: 'category', type: 'select', options: ["GENERAL", "OBC", "EBC", "SC", "ST"] },
                { label: 'Aadhar Number', name: 'aadhar_number', type: 'text' },
                { label: 'PAN Number', name: 'pan_number', type: 'text' },
                { label: 'Course Name', name: 'course_name', type: 'text' }
              ].map((field, index) => (
                <div key={index}>
                <label>
                  {field.label}:
                  {field.type === 'select' ? (
                    <select
                    className='form-control'
                      name={field.name}
                      value={formData[field.name as keyof Student] as string}
                      onChange={handleChange}
                      style={{ borderColor: missingFields.includes(field.name) ? 'red' : undefined }}
                    >
                      {field.options.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="form-control"
                      type={field.type}
                      name={field.name}
                      value={(field.name.includes('profilePic.') ? formData.profilePic[field.name.split('.')[1] as keyof ProfilePic] : formData[field.name as keyof Student]) as string}
                      onChange={handleChange}
                      style={{ borderColor: missingFields.includes(field.name) ? 'red' : undefined }}
                    />
                  )}
                </label>
                <br />
              </div>
              
              ))}
              <div>
                <label>
                  Profile Picture:
                  <input
                    className="form-control"
                    type="file"
                    name="profilePicFile"
                    onChange={handleFileChange}
                  />
                </label>
                <br />
              </div>
              <ModalFooter>
                <Button colorScheme="blue" type="submit">
                  {student ? 'Update Student' : 'Add Student'}
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {successMessage && (
        <Modal isOpen={true} onClose={() => setSuccessMessage(null)} size={modalSize}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Success</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>{successMessage}</p>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={() => setSuccessMessage(null)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AddStudent;
