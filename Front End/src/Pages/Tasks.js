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

const Tasks = () => {
  const [addModel, setAddModel] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [currentTaskData, setCurrentTaskData] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [searchParam, setSaecrchParam] = useState("");

  useEffect(() => {
    console.log("get all tasks");
    getAllTaks();
  }, []);

  const deleteTask = async (id) => {
    console.log("id", id);
    try {
      const res = await deleteTaskById(id);
      getAllTaks();
    } catch (error) {}
  };
  const setTaskData = (data) => {
    console.log(data);
    setCurrentTaskData(data);
    setEditModel(true);
    console.log("set task data");
  };
  const getAllTaks = async () => {
    try {
      const res = await fetchAllTasks();
      console.log("fetchAllTasks", res);
      setTaskList(res.data);
    } catch (error) {}
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
              >
                Add Task
              </Button>
            </Box>
          </Grid>
        </Container>
      </AppBar>
      {/* <Grid container>
        <Button onClick={() => setAddModel(true)}> Add Task</Button>
      </Grid> */}
      <Container sx={{ marginTop: "90px" }}>
        <Grid container spacing={3}>
          {taskList.map((data) => (
            <Grid item xs={12}>
              <TaskCard
                key={data.id}
                taskData={data}
                setTaskData={setTaskData}
                deleteTask={deleteTask}
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
    </div>
  );
};

export default Tasks;
