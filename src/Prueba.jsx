import React from "react";
import { useState } from "react";
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
} from "mdb-react-ui-kit";

export default function App() {
  const [task, setTask] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [id, setId] = useState(1);
  const [tasksDone, setTasksDone] = useState([]);
  const [day, setDay] = useState("");

  const addTask = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const diaFormateado = dia < 10 ? `0${dia}` : dia;
    const mesFormateado = mes < 10 ? `0${mes}` : mes;
    const currentTime = `${diaFormateado}/${mesFormateado}`;
    const status = true;
    setTask([...task, { descripcion, currentTime, status, id }]);
    setId(id + 1);
    setDescripcion("");
  };

  const onlyActives = () => {
    return setTask(task.filter((item) => item.status == true));
  };

  const deleteTask = (id) => {
    return setTask(task.filter((t) => t.id !== id));
  };

  const taskDone = () => {
    setTasksDone(task.filter((t) => t.status == false));
  };

  const changeStatus = (taskId) => {
    const updatedTasks = task.map((t) => {
      if (t.id === taskId) {
        setTasksDone([...task, t]);
        return { ...t, status: false };
      }
      return t;
    });
    setTask(updatedTasks);
  };

  return (
    <>
      <section className="gradient-custom-2">
        <MDBContainer className="py-15">
          <MDBRow className="d-flex justify-content-center">
            <MDBCol>
              <MDBCard className="mask-custom">
                <MDBCardBody className="p-3 text-white">
                  <h2 className="date">{day}</h2>
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
                      type="text"
                      id="form1"
                      label="New task..."
                      wrapperClass="flex-fill"
                      onChange={(e) => setDescripcion(e.target.value)}
                      className="task-input"
                    />
                    <MDBBtn color="info" className="btn-add" onClick={addTask}>
                      Add
                    </MDBBtn>
                  </div>
                  <MDBTable>
                    <MDBTableHead className="table">
                      <tr>
                        <th className="task">Task</th>
                        <th className="status">Status</th>
                        <th className="actions">Actions</th>
                      </tr>
                    </MDBTableHead>
                    {task &&
                      task.map((t, index) => (
                        <MDBTableBody key={index} className="content">
                          <tr className="fw-normal">
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
                                wrapperProps={{ href: "#!" }}
                                title="Done"
                              >
                                <MDBIcon
                                  onClick={() => {
                                    changeStatus(t.id);
                                  }}
                                  fas
                                  icon="check"
                                  color="success"
                                  size="lg"
                                  className="me-3"
                                />
                              </MDBTooltip>
                              <MDBTooltip
                                tag="a"
                                wrapperProps={{ href: "#!" }}
                                title="Remove"
                              >
                                <MDBIcon
                                  onClick={() => {
                                    deleteTask(t.id);
                                  }}
                                  fas
                                  icon="trash-alt"
                                  color="warning"
                                  size="lg"
                                  className="me-3"
                                />
                              </MDBTooltip>
                            </td>
                          </tr>
                        </MDBTableBody>
                      ))}
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
