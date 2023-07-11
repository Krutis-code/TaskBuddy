import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AddTaskModel from "../components/AddTaskModel";
import { tasks } from "../DummyData/Tasks";
import TaskCard from "../components/TaskCard";
import { deleteTaskById, fetchAllTasks } from "../Services/TaskServices";
import { toast } from "react-toastify";
import LogoutModal from "../components/LogoutModal";
import { Navigate, useNavigate } from "react-router-dom";

const Tasks = () => {
  const [addModel, setAddModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [currentTaskData, setCurrentTaskData] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [searchParam, setSaecrchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    getAllTaks();
  }, []);

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      const res = await deleteTaskById(id);
      getAllTaks();
      toast.success("Task Deleted Successfully !");
    } catch (error) {
      toast.error(error.response.data.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const setTaskData = (data) => {
    setCurrentTaskData(data);
    setEditModel(true);
  };
  const getAllTaks = async () => {
    try {
      const res = await fetchAllTasks();
      setTaskList(res.data);
    } catch (error) {}
  };
  const LogOut = () => {
    localStorage.removeItem("emailId");
    localStorage.removeItem("userAuth");
    setLogout(false);
    navigate("/login");
  };
  return (
    <div>
      <AppBar sx={{ background: "#F5F5F5" }}>
        <Container>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              variant="h4"
              color="primary"
              padding={2}
              sx={{ fontWeight: "600", fontSize: "28px" }}
            >
              Task Buddy
            </Typography>
            <Box>
              {/* <TextField
                required
                value={searchParam}
                onChange={(e) => setSaecrchParam(e.target.value)}
                id="email"
                placeholder="Search"
                name="email"
                variant="filled"
                sx={{ paddingTop: "10px" }}
              ></TextField> */}

              <Button
                variant="contained"
                color="primary"
                onClick={() => setAddModel(true)}
                sx={{ marginRight: "20px" }}
              >
                Add Task
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setLogout(true)}
              >
                LogOut
              </Button>
            </Box>
          </Grid>
        </Container>
      </AppBar>

      <Container sx={{ marginTop: "90px" }}>
        <Grid container spacing={3}>
          {taskList.map((data) => (
            <Grid item xs={12}>
              <TaskCard
                key={data.id}
                taskData={data}
                setTaskData={setTaskData}
                deleteTask={deleteTask}
                loading={loading}
              ></TaskCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <AddTaskModel
        isAdd={true}
        open={addModel}
        handleClose={() => setAddModel(false)}
        getAllTaks={getAllTaks}
      />
      <AddTaskModel
        isModify={true}
        open={editModel}
        handleClose={() => setEditModel(false)}
        currentTaskData={currentTaskData}
        getAllTaks={getAllTaks}
      />
      <LogoutModal
        open={logout}
        handleClose={() => {
          setLogout(false);
        }}
        handleSubmit={LogOut}
      ></LogoutModal>
    </div>
  );
};

export default Tasks;
