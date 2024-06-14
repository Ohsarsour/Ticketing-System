import React, { useEffect, useState } from "react";
import { getTickets, updateTicket } from "../Services/ticketService";
import { Ticket } from "../Types/Ticket";
import { stat } from "fs";

const KanbanBoard: React.FC = () => {

    const [tickets, setTickets] = useState<Ticket[]>([]);

    //call to fetch tickets from the API
    useEffect(() => {
        const fetchTickets = async () => {
            const tickets = await getTickets();
            setTickets(tickets);
        };

        //call fetch tickets to fetch when component mounts
        fetchTickets();
    }, []);

    //Handle drag end event to update ticket status
    const handleDragEnd = async (event: React.DragEvent<HTMLDivElement>, status: string, ticket: Ticket) => {
        event.preventDefault();
        const updatedTicket = { ...ticket, status };
        await updateTicket(ticket.id, updatedTicket);
        setTickets(tickets.map(t => (t.id === ticket.id ? updatedTicket : t)));
    };

    //render ticket by status
    const renderTickets = (status: string) => {
        return tickets.filter(ticket => ticket.status === status).map(ticket => (
            <div key={ticket.id} className="bg-white p-4 rounded shadow mb-4"
                draggable
                onDragEnd={(e) =>
                    handleDragEnd(e, status, ticket)}>
                <h3 className="font-bold">{ticket.title}</h3>
                <p>{ticket.description}</p>
            </div>
        ));
    };

    //return kanban layout
    return (
        <div className="grid grid-cols-3-gap-4 p-4">
            <div className="bg-gray-100 p-4 rounded">
                <h2 className="font-bold mb-4">To Do</h2>
                {renderTickets('To Do')}
            </div>
            <div className="bg-gray-100 p-4 rounded">
                <h2 className="font-bold mb-4">In Progress</h2>
                {renderTickets('In Progress')}
            </div>
            <div className="bg-gray-100 p-4 rounded">
                <h2 className="font-bold mb-4">Done</h2>
                {renderTickets('Done')}
            </div>
        </div>
    );
};

export default KanbanBoard;