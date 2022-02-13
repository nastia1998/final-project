import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewCategory } from "./categoriesSlice";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const AddCategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const onNameChanged = (e) => {
    setName(e.target.value);
  };

  const onDescriptionChanged = (e) => {
    setDescription(e.target.value);
  };

  const canSave = [name].every(Boolean);

  const onSaveCategory = async () => {
    try {
      if (canSave) {
        await dispatch(addNewCategory({ name, description })).unwrap();
        setName("");
        setDescription("");
      }
    } catch (err) {
      console.error("Failed to create the category: ", err);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiTextField-root": { mt: 2, width: "30%" },
        ml: 2,
      }}
    >
      <Typography>Add a New Category</Typography>
      <TextField
        required
        label="Name"
        inputProps={{ maxLength: 15 }}
        value={name}
        onChange={onNameChanged}
      />
      <TextField
        label="Description"
        inputProps={{ maxLength: 50 }}
        multiline
        value={description}
        onChange={onDescriptionChanged}
      />
      <IconButton onClick={onSaveCategory} disabled={!canSave}>
        <SaveIcon />
      </IconButton>
    </Box>
  );
};

export { AddCategoryForm };
