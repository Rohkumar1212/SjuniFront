import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; 

export default function Settings() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5500/api/v1/getAllStudents/og7ivppYZ74cWjZ6HhCvnopqyb/dzq3lGV6sJmCVtca5sJcInRgi5fRzs988GNMYfcVzIbqA3inUPy?pageNumber=2&pageSize=2');
                console.log('Response data:', response.data); // Log the response data to inspect its structure
                if (response.data.status && Array.isArray(response.data.data)) {
                    setData(response.data.data); // Set the data array from the response
                } else {
                    throw new Error('Unexpected response format');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);

                // Check if the error is an AxiosError and has a response
                if (axios.isAxiosError(error) && error.response) {
                    setError(`Error fetching data: ${error.response.status} ${error.response.statusText}`);
                } else if (error instanceof Error) {
                    setError(`Error fetching data: ${error.message}`);
                } else {
                    setError('Unknown error occurred');
                }
                
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>Loading...</Box>;
    }

    if (error) {
        return <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>{error}</Box>;
    }

    return (
        <>
            <div className='container'>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Date of Birth</th>
                                <th>Category</th>
                                <th>Course Name</th>
                                {/* Add more table headers based on your data structure */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.date_of_birth}</td>
                                    <td>{item.category}</td>
                                    <td>{item.course_name}</td>
                                    {/* Add more table cells based on your data structure */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
