export interface AttendanceAttributes {

    ide?: number;
    dateInto?: string;
    dateLeave?: string | null;
}

export interface Attendance extends AttendanceAttributes  {
    
    customer: string;
    user: string;
}