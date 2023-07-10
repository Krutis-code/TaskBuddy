import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { COMPLETED, PENDING } from "../constants/AppConstants";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import TruncatedText from "./TruncatedText";
import DeleteTaskModal from "./DeleteModal";
const TaskCard = ({ taskData, setTaskData, deleteTask }) => {
  const [deleteModal, setDeleteModal] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const { title, description, status, dueDate } = taskData;

  const handleDeleteTask = () => {
    deleteTask(deleteId);
  };
  return (
    <Paper
      sx={{
        background: "#f4f4f4",
        // backgroundColor: "#F5F5F5",
        boxShadow: 3,
        // boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
      }}
      // sx={{ boxShadow: 3 }}
    >
      <Grid container spacing={1} sx={{ padding: "0px 30px" }}>
        <Grid item xs={12}>
          <Typography
            sx={{ fontWeight: "600", color: "#333633", fontSize: "22px" }}
            my={1}
          >
            {title}
          </Typography>
        </Grid>
        <Divider component="div"></Divider>
        <Grid
          item
          xs={12}
          // sx={{ height: "5 rem", overflow: "scroll" }}
        >
          <Typography>{description}</Typography>
          {/* <TruncatedText test={description} maxLength={50}></TruncatedText> */}
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Due Date : {format(new Date(dueDate), "yyyy-MM-dd")}
          </Typography>
        </Grid>
        <Grid container justifyContent={"space-between"} py={2}>
          <Typography>
            {status ? (
              <Chip label={COMPLETED} color="success"></Chip>
            ) : (
              <Chip label={PENDING} color="warning"></Chip>
            )}
          </Typography>
          <Box>
            <Grid container alignItems={"center"}>
              <Button
                variant="contained"
                color="error"
                sx={{ marginRight: "20px" }}
                onClick={() => {
                  setDeleteModal(true);
                  setDeleteId(taskData._id);
                }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                onClick={(e) => setTaskData(taskData)}
              >
                Edit
              </Button>
            </Grid>
          </Box>
        </Grid>
        {/* <Grid item xs={12}>
          <Grid container justifyContent={"flex-end"}>
            <Button variant="contained">Update</Button>
          </Grid>
        </Grid> */}
      </Grid>
      <DeleteTaskModal
        open={deleteModal}
        handleClose={() => {
          setDeleteModal(false);
          setDeleteId("");
        }}
        handleDelete={handleDeleteTask}
      ></DeleteTaskModal>
    </Paper>
  );
};

export default TaskCard;
