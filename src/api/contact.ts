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
  try {
    const res = await API.get("/business/contact_us");
    console.log("RAW CONTACT API RESPONSE:", res.data); // <--- add this

    // Defensive extraction
    const messages: BackendMessage[] = Array.isArray(res.data.data.data)
      ? res.data.data.data
      : [];

    return messages.map((msg) => ({
      name: `${msg.firstName ?? ""} ${msg.lastName ?? ""}`.trim(),
      email: msg.email ?? "",
      company: msg.company ?? "",
      inquiryType: msg.inquiryType ?? "",
      status: msg.status ?? "",
      date: msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "",
    }));
  } catch (err) {
    console.error("Failed to fetch contact messages", err);
    throw err;
  }
};