import React, { useContext, useState } from 'react';
import { UserContext } from '../context/portfoliocontext';
import { toast } from 'react-toastify';
import './Dashboard.css';
import { MdDelete } from "react-icons/md";
import { serverApi } from '../utils/config';
const Dashboard = () => {
  const { projects, deleteProject, fetchProjects } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url1: '',
    url2: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch(`${serverApi}/add-project`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setFormData({ title: '', description: '', url1: '', url2: '', image: null });
        setPreview(null);
        fetchProjects(); // refresh project list
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (err) {
      toast.error('Server error');
    }
  };

  return (
    <>
      <div className="dashboard-container fix-width appearLeft">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <img
                      src={`${serverApi}/uploads/${project.image}`}
                      alt={project.title}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </td>
                  <td>{project.title}</td>
                  <td id="action" onClick={() => deleteProject(project._id)} title='Delete'><MdDelete size={30} color='red'/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Project Form Section */}
      <div className="addProjects fix-width">
      <div className="add-project-container imageShow">
        <h3>Add New <span id='surname'>Project</span></h3>
        <form onSubmit={handleSubmit} className="add-project-form">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="url1"
            placeholder="Project URL"
            value={formData.url1}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="url2"
            placeholder="Optional URL (e.g. Live Link)"
            value={formData.url2}
            onChange={handleChange}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}
          <button type="submit">Submit Project</button>
        </form>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
