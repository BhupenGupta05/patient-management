import React, { useMemo, useState } from "react";
import Table from "../components/Table";
import { useQuery } from "@tanstack/react-query";
import { getAllPatients } from "../services/patientRequests";
import FactCards from "../components/FactCards";
import Title from "../components/Title";
import Copyright from "../components/Copyright";
import ActionButtons from "../components/ActionButtons";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Appointment from "./Appointment";
import { CalendarCheck2, Hourglass, TriangleAlert, HelpCircle } from "lucide-react";
import StatusButton from "../components/StatusButton";




const Admin = () => {
  const navigate = useNavigate()
  const [showFormModal, setShowFormModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [appointmentType, setAppointmentType] = useState(null);

  // DISPLAY APPOINTMENT ID IN URL
  const handleScheduleAppointment = (patient) => {
    // console.log("SCHEDULE");
    navigate(`/admin/${patient.appointmentId}/schedule`)

    setSelectedPatient(patient)
    setAppointmentType("schedule");
    setShowFormModal(true)
  }

  const handleCancelAppointment = (patient) => {
    // console.log("CANCEL");
    navigate(`/admin/${patient.appointmentId}/cancel`)

    setSelectedPatient(patient)
    setAppointmentType("cancel");
    setShowFormModal(true)
  }

  const closeModal = () => {
    setShowFormModal(false)
    navigate('/admin')
  }

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
      sortable: true,
    }),
    []
  );

  const columnDefs = [
    { headerName: "#", field: "patientId" },
    { headerName: "Patient", field: "name" },
    { 
      headerName: "Status", 
      field: "status",
      cellRenderer: (params) => {
        const status = params.value

        const statusConfig = {
          pending: {
            styleClass: "bg-yellow-200 text-yellow-800",
            Icon: Hourglass,
          },
          scheduled: {
            styleClass: "bg-green-200 text-green-800",
            Icon: CalendarCheck2, 
          },
          cancelled: {
            styleClass: "bg-red-200 text-red-800",
            Icon: TriangleAlert,
          },
        }

        const { styleClass, Icon } = statusConfig[status] || {
          styleClass: "bg-gray-200 text-gray-800",
          Icon: HelpCircle, 
        };

        return <StatusButton text={status} Icon={Icon} styleClass={styleClass} />
      },
      cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    },
    { headerName: "Appointment", field: "appointments" },
    { headerName: "Doctor", field: "physician" },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (params) => {
        const patient = params.data
        const isPending = patient.status === 'pending'
        

        return (
          <ActionButtons
            patientId={patient.patientId}
            onSchedule={() => handleScheduleAppointment(patient)}
            onCancel={() => handleCancelAppointment(patient)}
            disableActions={!isPending} 
            />

            
            


        )
      },
      cellStyle: { display: 'flex', justifyContent: 'center' },
    },
  ];


  // FETCH PATIENTS
  const { data, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
    onError: (error) => {
      console.error("Error fetching patients:", error);
    },
  });



  const filteredData = useMemo(() => {
    console.log(data);
    
    if (data) {
      return data.map((patient) => {
        const firstAppointment = patient.appointments; 

        return {
          appointmentId: firstAppointment ? firstAppointment.id : null, 
          patientId: patient._id,
          name: patient.name,
          status: firstAppointment ? firstAppointment.status : "No status",
          appointments: firstAppointment
            ? format(new Date(firstAppointment.appointmentDate), "MMMM d, yyyy h:mmaa")
            : "No appointment date",
          physician: firstAppointment ? firstAppointment.physician : "N/A",
          reason: firstAppointment.reason,
          comments: firstAppointment.comments
        };
      });
    }

    return [];
  }, [data]);


  const pendingCount = filteredData.filter((patient) => patient.status === 'pending').length
  const scheduledCount = filteredData.filter((patient) => patient.status === 'scheduled').length
  const cancelledCount = filteredData.filter((patient) => patient.status === 'cancelled').length

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col gap-8 m-6">
      {showFormModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-2 w-full max-w-md mx-auto relative flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <Appointment
              type={appointmentType}
              patient={selectedPatient}
              onClose={closeModal}
            />

          </div>
        </div>
      )}





      <Title
        title="WeCare"
        heading="Welcome"
        subheading="Start the day with managing appointments" />
      <FactCards
        pendingCount={pendingCount}
        scheduledCount={scheduledCount}
        cancelledCount={cancelledCount} />

      <Table
        data={filteredData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
      <Copyright />
    </div>
  );
};

export default Admin;
