import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  removeCategory,
  categoriesSelectors,
} from "./categoriesSlice";
import { Spinner } from "../../components/Spinner";

const CategoryExcerpt = ({ category, onRemoveCategory }) => {
  return (
    <article key={category.id}>
      <h3>{category.name}</h3>
      <button
        type="button"
        id={category.category_id}
        onClick={() => onRemoveCategory(category.id)}
      >
        Delete
      </button>
    </article>
  );
};

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
      />
    ));
  } else if (categoryStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};

export { CategoriesList };
