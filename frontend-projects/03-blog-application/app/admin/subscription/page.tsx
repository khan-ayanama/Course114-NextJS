"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailsPage = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get("/api/email");
        if (response.data.success) {
          setEmails(response.data.emails);
        } else {
          toast.error("Error fetching emails");
        }
      } catch (error) {
        toast.error("Error fetching emails");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/email?id=${id}`);
      if (response.data.success) {
        setEmails(emails.filter((email) => email._id !== id));
        toast.success("Email deleted successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting email");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-4xl font-bold mb-6">Subscribed Emails</h1>
      {loading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Email</th>
              <th className="border border-black px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {emails.length > 0 ? (
              emails.map((email) => (
                <tr key={email._id}>
                  <td className="border border-black px-4 py-2">
                    {email.email}
                  </td>
                  <td className="border border-black px-4 py-2">
                    <button
                      onClick={() => handleDelete(email._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="border border-black px-4 py-2 text-center"
                >
                  No emails found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmailsPage;
