import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewCategory } from "./categoriesSlice";
import { Box, TextField, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const AddCategoryForm = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const onNameChanged = (e) => {
    setName(e.target.value);
  };

  const canSave = [name].every(Boolean);

  const onSaveCategory = async () => {
    try {
      if (canSave) {
        await dispatch(addNewCategory({ name })).unwrap();
        setName("");
      }
    } catch (err) {
      console.error("Failed to create the category: ", err);
    }
  };

  return (
    <Box>
      <h3>Add a New Category</h3>
      <label htmlFor="categoryName">Category Name:</label>
      <TextField
        type="text"
        id="categoryName"
        name="categoryName"
        required
        label="What's your new category?"
        value={name}
        onChange={onNameChanged}
      />
      <IconButton onClick={onSaveCategory} disabled={!canSave}>
        <SaveIcon />
      </IconButton>
    </Box>
  );
};

export { AddCategoryForm };
