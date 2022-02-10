import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addNewCategory } from "./categoriesSlice";

const AddCategoryForm = () => {
  const [name, setName] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const dispatch = useDispatch();

  const onNameChanged = (e) => setName(e.target.value);

  const canSave = [name].every(Boolean) && addRequestStatus === "idle";

  const onSaveCategoryClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(addNewCategory({ name })).unwrap();

        setName("");
      } catch (err) {
        console.error("Failed to save the category: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <section>
      <h2>Add a New Category</h2>
      <form>
        <label htmlFor="categoryName">Category Name:</label>
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          placeholder="What's your new category?"
          value={name}
          onChange={onNameChanged}
        />
        <button
          type="button"
          onClick={onSaveCategoryClicked}
          disabled={!canSave}
        >
          Save Category
        </button>
      </form>
    </section>
  );
};

export { AddCategoryForm };
