import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

const CalendarioOnboarding = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/onboarding");
                const eventos = response.data.map((colaborador) => ({
                    title: colaborador.name,
                    start: colaborador.date,
                    end: colaborador.date_tec,
                    description: `Onboarding Técnico: ${colaborador.state_welcome}`,
                    color: colaborador.state_technical === "Correcto" ? "green" : "blue",
                }));
                setEventos(eventos);
            } catch (error) {
                console.error("Error al obtener eventos", error);
            }
        };
        fetchEventos();
    }, []);

    return (
        <div className="container my-4">
      <h2>Calendario de Onboardings Técnicos</h2>

      <div className="calendar-container" style={{ height: '70vh' }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={eventos}
          eventClick={(info) => {
            alert(info.event.title + ": " + info.event.extendedProps.description);
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
        />
      </div>
    </div>
    );
};

export default CalendarioOnboarding;
