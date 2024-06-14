import axios from 'axios';
import { Ticket } from '../Types/Ticket';

// Base url for the API endpoint
const API_URL = 'http://localhost:5208/api/Tickets';

//fetch all tickets
export const getTickets = async (): Promise<Ticket[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};


//fetch a single ticket by id
export const getTicket = async (id: number): Promise<Ticket> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

//create a new ticket
export const createTicket = async (ticket: Ticket): Promise<Ticket> => {
    const response = await axios.post(API_URL, ticket);
    return response.data;
};

//update a ticket
//fetch a single ticket by id
export const updateTicket = async (id: number, ticket: Ticket): Promise<void> => {
    const response = await axios.put(`${API_URL}/${id}`, ticket);
    return response.data;
};

//delete a ticket
export const deleteTicket = async (id: number): Promise<void> => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

