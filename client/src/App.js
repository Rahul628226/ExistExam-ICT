import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import AdminHome from "./components/Admin/AdminHome";
import TutorHome from "./components/Tutors/TutorsHome";
import MarklistIndex from "./components/MarkList/MarklistIndex";
import StudentsLists from "./components/Tutors/StudentsList/StudentsLists";

function App() {
	const user = localStorage.getItem("token");

	const usertype=localStorage.getItem("userType");
	// const userName=localStorage.getItem("name");

	return (
		<Routes>
			{usertype === 'admin' ? (
				<>
					{user && <Route path="/" exact element={<AdminHome />} />}
			<Route path="/" element={<Navigate replace to="/login" />} />
				</>
			) : (
				<>
				{user && <Route path="/" exact element={<TutorHome />} />}
			<Route path="/" element={<Navigate replace to="/login" />} />
			</>
			)}
			

			{user && <Route path="/StudentsList" exact element={<StudentsLists />} />}
			<Route path="/StudentsList" element={<Navigate replace to="/login" />} />

			{user && <Route path="/admin-dashboard" exact element={<AdminHome />} />}
			<Route path="/admin-dashboard" element={<Navigate replace to="/login" />} />
          

			{user && <Route path="/Tutor-dashboard" exact element={<TutorHome />} />}
			<Route path="/Tutor-dashboard" element={<Navigate replace to="/login" />} />

			
			{user && <Route path="/MarklistIndex" exact element={<MarklistIndex />} />}
			<Route path="/MarklistIndex" element={<Navigate replace to="/login" />} />

			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			
		</Routes>
	);
}

export default App;
