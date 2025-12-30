
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";

export default function IssueList() {
  const [issues, setIssues] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    priority: "Low"
  });

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const loadIssues = async () => {
    const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setIssues(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    loadIssues();
  }, []);

  // Status Change with rules
  const changeStatus = async (issue, newStatus) => {
    if (issue.status === "Open" && newStatus === "Done") {
      alert("Move issue to In Progress before Done");
      return;
    }

    await updateDoc(doc(db, "issues", issue.id), { status: newStatus });
    loadIssues();
  };

  // Edit issue
  const startEdit = issue => {
    setEditingId(issue.id);
    setEditData({
      title: issue.title,
      description: issue.description,
      priority: issue.priority
    });
  };

  const saveEdit = async id => {
    await updateDoc(doc(db, "issues", id), editData);
    setEditingId(null);
    loadIssues();
  };

  // Delete issue
  const deleteIssue = async id => {
    if (!window.confirm("Delete this issue?")) return;
    await deleteDoc(doc(db, "issues", id));
    loadIssues();
  };

  // Filter issues
  const filteredIssues = issues.filter(issue => {
    const statusMatch =
      statusFilter === "All" || issue.status === statusFilter;
    const priorityMatch =
      priorityFilter === "All" || issue.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="issue-list">
      <h3>All Issues</h3>

      {/* FILTERS */}
      <div className="filters">
        <select onChange={e => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select onChange={e => setPriorityFilter(e.target.value)}>
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* ISSUE CARDS */}
      {filteredIssues.length === 0 && <p>No issues found</p>}

      {filteredIssues.map(issue => (
        <div className="issue-card" key={issue.id}>
          {editingId === issue.id ? (
            <>
              <input
                value={editData.title}
                onChange={e =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />
              <textarea
                value={editData.description}
                onChange={e =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />
              <select
                value={editData.priority}
                onChange={e =>
                  setEditData({ ...editData, priority: e.target.value })
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <div className="actions">
                <button onClick={() => saveEdit(issue.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              {/* TITLE & DESCRIPTION */}
              <h4>{issue.title}</h4>
              <p>{issue.description}</p>

              {/* PRIORITY & STATUS */}
              <div className="meta">
                <span className={`badge ${issue.priority.toLowerCase()}`}>
                  {issue.priority}
                </span>

                <button
                  className={`status-btn ${
                    issue.status.replace(" ", "").toLowerCase()
                  }`}
                  onClick={() => {
                    if (issue.status === "Done") return;

                    const nextStatus =
                      issue.status === "Open" ? "In Progress" : "Done";

                    changeStatus(issue, nextStatus);
                  }}
                >
                  {issue.status}
                </button>
              </div>

              {/* EDIT & DELETE */}
              <div className="actions">
                <button onClick={() => startEdit(issue)}>Edit</button>
                <button onClick={() => deleteIssue(issue.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
