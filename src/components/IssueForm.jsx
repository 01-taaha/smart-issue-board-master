
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function IssueForm() {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  const submitIssue = async () => {
    if (!title || !description) {
      alert("All fields required");
      return;
    }

    await addDoc(collection(db, "issues"), {
      title,
      description,
      priority,
      status: "Open",
      createdBy: user.email,
      createdAt: serverTimestamp()
    });

    setTitle("");
    setDescription("");
    setPriority("Low");
  };

  return (
    <div className="issue-form">
      <h3>Create Issue</h3>

      <input
        placeholder="Issue Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Issue Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button onClick={submitIssue}>Create Issue</button>
    </div>
  );
}
