import {
  Button,
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
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (isModify == true) {
      setTitle(currentTaskData?.title);
      setDescription(currentTaskData?.description);
      setStaus(currentTaskData?.status ? COMPLETED : PENDING);
      setDueDate(new Date(currentTaskData?.dueDate));
    }
  }, [open]);

  const validateField = (e) => {
    console.log("e", e);
    let obj;
    if (e === "title") {
      obj = requiredValidation(title, "Title");
    } else if (e === "description") {
      obj = requiredValidation(description, "Description");
    }
    setErrors((pre) => ({ ...pre, [e]: obj }));
  };

  const handleSubmit = async (id) => {
    let payload = {
      title,
      description,
      status: status === COMPLETED ? false : true,
      dueDate,
    };
    validateField("title");
    validateField("description");

    toast.error("Please fill Due Date");
    if (erros?.title?.isValid && erros?.description?.isValid) {
      console.log("dueDate", dueDate);
      if (!dueDate) {
        return;
      }
      try {
        const res = isModify
          ? await updateTask(id, payload)
          : await createTask(payload);
        console.log("res", res);
        setTitle("");
        setDescription("");
        setDueDate("");
        handleClose();
        getAllTaks();
      } catch (error) {}
      console.log("payload", payload);
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
      console.log("res", res);
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
                    label={COMPLETED}
                    value={COMPLETED}
                  />
                  <FormControlLabel
                    value={PENDING}
                    control={<Radio />}
                    label={PENDING}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item pt={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  color="primary"
                  label="Due Date"
                  name="dueDate"
                  value={dueDate}
                  onChange={(newValue) => setDueDate(newValue)}
                  onBlur={(e) => validateField(e.target.name)}
                  // error={erros?.dueDate?.isValid === false}
                  // helperText={erros?.dueDate?.message}
                  slotProps={{
                    textField: {
                      helperText: `${
                        erros?.dueDate?.message ? erros?.dueDate?.message : ""
                      }`,
                      error: `${erros?.dueDate?.isValid === false}`,
                      onBlur: (e) => validateField(e.target.name),
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
          onClick={() =>
            // isModify ? ModifyTask(currentTaskData._id) : handleSubmit()
            handleSubmit(currentTaskData._id)
          }
          color="success"
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModel;
