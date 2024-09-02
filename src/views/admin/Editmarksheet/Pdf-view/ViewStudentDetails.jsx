// ViewStudentDetails.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
const styles = StyleSheet.create({

});

const ViewStudentDetails = ({ student }) => (
  <PDFViewer style={{ width: '100%', height: '100vh' }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Student Details</Text>
          <Text style={styles.field}>Name: {student.name}</Text>
          <Text style={styles.field}>Email: {student.email}</Text>
          <Text style={styles.field}>Address: {student.address}</Text>
          <Text style={styles.field}>Phone: {student.phone}</Text>
          <Text style={styles.field}>Date of Birth: {student.date_of_birth}</Text>
          <Text style={styles.field}>Category: {student.category}</Text>
          <Text style={styles.field}>Course Name: {student.course_name}</Text>
          {/* Add other fields here */}
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default ViewStudentDetails;
