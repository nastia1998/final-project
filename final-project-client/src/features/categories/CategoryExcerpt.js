import React, { memo, useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const CategoryExcerpt = ({ category, onRemoveCategory, onUpdateCategory }) => {
  const [isReadOnly, setReadOnly] = useState(true);
  const [categoryName, setCategoryName] = useState(category.name);

  const onNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const onEditCategory = (e) => {
    console.log("onEditCategory");
    setReadOnly(false);
  };

  return (
    <Box key={category.id}>
      <TextField
        value={categoryName}
        InputProps={{ readOnly: isReadOnly }}
        onChange={onNameChange}
      />
      {isReadOnly ? (
        <IconButton onClick={(e) => onEditCategory(e)}>
          <EditIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => onUpdateCategory(category.id, categoryName)}>
          <CheckIcon />
        </IconButton>
      )}

      <IconButton type="button" onClick={() => onRemoveCategory(category.id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default memo(CategoryExcerpt);
