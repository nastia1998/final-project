import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCategories, fetchCategories } from "./categoriesSlice";
import { Spinner } from "../../components/Spinner";

const CategoryExcerpt = ({ category }) => {
  return (
    <article key={category.category_id}>
      <h3>{category.category_name}</h3>
    </article>
  );
};

const CategoriesList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);

  const categoryStatus = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  let content;
  if (categoryStatus === "loading") {
    content = <Spinner text="Loading..." />;
  } else if (categoryStatus === "succeeded") {
    content = categories.map((category) => (
      <CategoryExcerpt key={category.category_id} category={category} />
    ));
  } else if (categoryStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};

export { CategoriesList };
