import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { serverApi } from "../utils/config";

export const UserContext = createContext();
function UserProvider ({ children }){
  const [user, setUser] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchProjects(){
    fetch(`${serverApi}/get-projects`)
    .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
        console.log(data.projects);
      })
      .catch((e)=>{
        toast.error(e.message);
      })
}
function deleteProject(id) {
  console.log(id);
  console.log("product id is the above one ");
  fetch(`${serverApi}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then((res) => res.json())
  .then((data) => {
    if(data.success){
      toast.error(`${id} Deleted successfully`);
      fetchProjects();
    }
    // else{
    //   toast.error("server responds with a 400/401/500");
    // }
  })
  .catch((e) => {
     toast.error(e.message);
  });
}

useEffect(() => {
  if(localStorage.getItem("token")){
    setUser(true);
  }
  else{
    setUser(false);
  }
  fetchProjects();
}, [])

const value = {
  user,
  projects,
  setUser,
  setProjects,
  deleteProject,
  fetchProjects,
  loading,
}
return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;