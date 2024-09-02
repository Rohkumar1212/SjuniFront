// types.ts

export interface ProfilePic {
    picName: string;
    picPath: string;
  }
  
  export interface Education {
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
  
  export interface Student {
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
  