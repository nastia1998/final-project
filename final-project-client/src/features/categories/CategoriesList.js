import React, { useEffect, useCallback } from "react";
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

  const onUpdateCategory = useCallback(
    (id, name) => {
      try {
        dispatch(updateCategory({ id, name }));
      } catch (err) {
        console.error("Failed to update the category", err);
      }
    },
    [dispatch]
  );

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
      />
    ));
  } else if (categoryStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};

export { CategoriesList };
