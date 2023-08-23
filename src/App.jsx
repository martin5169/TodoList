import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTable,
  MDBBtn,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
  MDBInput,
  MDBTabs,
  MDBTabsItem,
} from "mdb-react-ui-kit";
import usePersistentStorage from "./usePersistentStorage";

export default function App() {
  const [tasks, setTasks] = usePersistentStorage("tasks",[]);
  const [descripcion, setDescripcion] = useState("");
  const [id, setId] = useState(1);
  const [activeTab, setActiveTab] = useState("all");

  const addTask = () => {
    const newTask = {
      descripcion,
      status: true,
      id,
    };
    setTasks([...tasks, newTask]);
    setId(id + 1);
    setDescripcion("");
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
  };


  const changeStatus = (taskId) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, status: !t.status };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const filteredTasks = () => {
    switch (activeTab) {
      case "active":
        return tasks.filter((task) => task.status === true);
      case "completed":
        return tasks.filter((task) => task.status === false);
      default:
        return tasks;
    }
  };

  return (
    <>
      <section className="gradient-custom-2">
        <MDBContainer className="py-15">
          <MDBRow className="d-flex justify-content-center">
            <MDBCol>
              <MDBCard className="mask-custom">
                <MDBCardBody className="p-3 text-white">
                  <div className="text-center pt-3 pb-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                      alt="Check"
                      width="80"
                    />
                    <h2 className="my-4">Task List</h2>
                  </div>
                  <div className="d-flex justify-content-center align-items-center mb-4 ">
                    <MDBInput
                      value={descripcion}
                      label="New task..."
                      onChange={(e) => setDescripcion(e.target.value)}
                      className="text-white"
                    />
                    <MDBBtn color="info" className="btn-add" onClick={addTask}>
                      Add
                    </MDBBtn>
                  </div>
                  <MDBTabs className="mb-1 pb-1 d-flex justify-content-center align-items-center">
                    <MDBTabsItem>
                      <MDBBtn color={activeTab==="all"?"white":"info"} className="btn-add" 
                        onClick={() => setActiveTab("all")}
                        active={activeTab === "all"}
                      >
                        ALL
                      </MDBBtn>
                    </MDBTabsItem>
                    <MDBTabsItem>
                    <MDBBtn color={activeTab==="active"?"white":"info"}  className="btn-add"  
                        onClick={() => setActiveTab("active")}
                        active={activeTab === "active"}
                      >
                        ACTIVE
                      </MDBBtn>
                    </MDBTabsItem>
                    <MDBTabsItem>
                      <MDBBtn color={activeTab==="completed"?"white":"info"}  className="btn-add" 
                        onClick={() => setActiveTab("completed")}
                        active={activeTab === "completed"}
                      >
                        COMPLETED
                      </MDBBtn>
                    </MDBTabsItem>
                  </MDBTabs>
                  <MDBTable>
                    <MDBTableHead className="table">
                      <tr>
                        <th className="task">Task</th>
                        <th className="status">Status</th>
                        <th className="actions">Actions</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {filteredTasks().map((t, index) => (
                        <tr key={index} className="fw-normal">
                          <th className="task-column">
                            <span className="ms-1">{t.descripcion}</span>
                          </th>
                          <td className="status-column">
                            <h6 className="mb-0">
                              <MDBBadge
                                className="mx-2"
                                color={t.status ? "success" : "danger"}
                              >
                                {t.status ? "ACTIVE" : "DONE"}
                              </MDBBadge>
                            </h6>
                          </td>
                          <td className="actions-column">
                            <MDBTooltip
                              tag="a"
                              title={t.status ? "check" : "undo"}             
                            >
                              <MDBIcon
                                onClick={() => {
                                  changeStatus(t.id);
                                }}
                                fas
                                icon={t.status ? "check" : "undo"}
                                color={t.status ? "success" : "warning"}
                                size="lg"
                                className="me-3"
                              />
                            </MDBTooltip>
                            <MDBTooltip
                              tag="a"
                              title="Remove"
                            >
                              <MDBIcon
                                onClick={() => {
                                  deleteTask(t.id);
                                }}
                                icon="trash-alt"
                                color="warning"
                                size="lg"
                                className="me-3"
                              />
                            </MDBTooltip>
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
