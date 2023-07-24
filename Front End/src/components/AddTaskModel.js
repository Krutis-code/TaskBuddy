import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { COMPLETED, PENDING } from "../constants/AppConstants";
import { createTask, updateTask } from "../Services/TaskServices";
import { requiredValidation } from "../helpers/utility";
import { toast } from "react-toastify";

const AddTaskModel = ({
  open,
  handleClose,
  isModify,
  isAdd,
  currentTaskData,
  getAllTaks,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStaus] = useState(PENDING);
  const [dueDate, setDueDate] = useState("");
  const [erros, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const submitClicked = useRef(false);
  useEffect(() => {
    if (isModify === true) {
      setTitle(currentTaskData?.title);
      setDescription(currentTaskData?.description);
      setStaus(currentTaskData?.status ? COMPLETED : PENDING);
      setDueDate(new Date(currentTaskData?.dueDate));
    }
    if (open === false) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setErrors({});
    }
  }, [open]);

  const validateField = (e) => {
    let obj;
    if (e === "title") {
      obj = requiredValidation(title, "Title");
      setErrors((pre) => ({ ...pre, [e]: obj }));
    }
    if (e === "description") {
      obj = requiredValidation(description, "Description");
      setErrors((pre) => ({ ...pre, [e]: obj }));
    }
    if (e === "dueDate") {
      obj = requiredValidation(dueDate, "Due date");
      setErrors((pre) => ({ ...pre, [e]: obj }));
    }
  };
  const handleAdd = () => {
    validateField("dueDate");
    validateField("title");
    validateField("description");
    submitClicked.current = true;
  };

  useEffect(() => {
    if (
      title &&
      description &&
      dueDate !== "" &&
      submitClicked.current === true
    ) {
      handleSubmit();
    }
  }, [erros]);

  const handleSubmit = async (id) => {
    setLoading(true);
    let payload = {
      title,
      description,
      status: status === COMPLETED ? true : false,
      dueDate,
    };

    if (erros?.title?.isValid && erros?.description?.isValid) {
      try {
        const res =
          isModify === true
            ? await updateTask(currentTaskData._id, payload)
            : await createTask(payload);
        setTitle("");
        setDescription("");
        setDueDate("");
        handleClose();
        getAllTaks();
        toast.success(
          isModify === true
            ? "Task updated sucessfully!"
            : "Task Added Successfully !"
        );
      } catch (error) {
        toast.error(error.response.data.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  const ModifyTask = async (id) => {
    try {
      let payload = {
        title,
        description,
        status: status === COMPLETED ? true : false,
        dueDate,
      };
      let res = await updateTask(id, payload);
      handleClose();
      getAllTaks();
    } catch (error) {}
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
        {isModify ? "Edit Task" : "Add Task"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container>
            <Grid item>
              <TextField
                margin="normal"
                required
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="Task Title"
                label="Task Title"
                name="title"
                onBlur={(e) => validateField(e.target.name)}
                error={erros?.title?.isValid === false}
                helperText={erros?.title?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="Description"
                label="Description"
                name="description"
                onBlur={(e) => validateField(e.target.name)}
                error={erros?.description?.isValid === false}
                helperText={erros?.description?.message}
              />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Status
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={status}
                  onChange={(e) => {
                    setStaus(e.target.value);
                  }}
                >
                  <FormControlLabel
                    control={<Radio />}
                    label={PENDING}
                    value={PENDING}
                  />
                  <FormControlLabel
                    value={COMPLETED}
                    control={<Radio />}
                    label={COMPLETED}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item pt={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Due Date"
                  name="dueDate"
                  value={dueDate}
                  onChange={(newValue) => setDueDate(newValue)}
                  slotProps={{
                    textField: {
                      helperText: `${
                        erros?.dueDate?.message && dueDate === ""
                          ? erros?.dueDate?.message
                          : ""
                      }`,
                      error: erros.dueDate?.isValid === false && dueDate === "",
                      onBlur: (e) => validateField("dueDate"),
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleAdd();
          }}
          color="success"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModel;
