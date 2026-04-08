import API from "./axios";

export interface BackendMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  status: string;
  inquiryType: string;
  createdAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  company: string;
  inquiryType: string;
  status: string;
  date: string;
}

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const res = await API.get("/business/contact_us");

  // assuming response: { data: [...] }
  const messages: BackendMessage[] = res.data.data;

  return messages.map((msg) => ({
    name: `${msg.firstName} ${msg.lastName}`,
    email: msg.email,
    company: msg.company,
    inquiryType: msg.inquiryType,
    status: msg.status,
    date: new Date(msg.createdAt).toLocaleString(),
  }));
};