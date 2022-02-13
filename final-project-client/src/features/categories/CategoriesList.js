import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  removeCategory,
  categoriesSelectors,
  updateCategory,
} from "./categoriesSlice";
import CategoryExcerpt from "./CategoryExcerpt";
import { Spinner } from "../../components/Spinner";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelectors.selectAll);

  const categoryStatus = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  const onRemoveCategory = useCallback(
    (id) => {
      try {
        dispatch(removeCategory(id));
      } catch (err) {
        console.error("Failed to remove the category: ", err);
      }
    },
    [dispatch]
  );

  // const onEditCategory = () => {
  //   setReadOnly(false);
  // };

  const onUpdateCategory = useCallback(
    (id, name) => {
      try {
        dispatch(updateCategory({ id, name }));
        console.log({ id, name });
      } catch (err) {
        console.error("Failed to update the category", err);
      }
    },
    [dispatch]
  );

  // const onUpdateCategory = (id) => {
  //   categories.forEach((category) => {
  //     if (category.id === id) {
  //       setReadOnly(false);
  //     }
  //   });
  // };

  let content;
  if (categoryStatus === "loading") {
    content = <Spinner text="Loading..." />;
  } else if (categoryStatus === "succeeded") {
    content = categories.map((category) => (
      <CategoryExcerpt
        key={category.id}
        category={category}
        id={category.id}
        onRemoveCategory={onRemoveCategory}
        onUpdateCategory={onUpdateCategory}
        // onEditCategory={onEditCategory}
        // isReadOnly={isReadOnly}
      />
    ));
  } else if (categoryStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};

export { CategoriesList };
