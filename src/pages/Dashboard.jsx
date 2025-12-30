import Navbar from "../components/Navbar";
import IssueForm from "../components/IssueForm";
import IssueList from "../components/IssueList";

export default function Dashboard() {
  return (
    <div className="container">
      <Navbar />
      <IssueForm />
      <IssueList />
    </div>
  );
}
