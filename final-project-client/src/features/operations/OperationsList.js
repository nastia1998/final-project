import React, { useEffect, useCallback } from "react";
import {
  fetchOperations,
  operationsSelectors,
  updateOperation,
} from "./operationsSlice";
import { useSelector, useDispatch } from "react-redux";
import OperationExcerpt from "./OperationExcerpt";
import { Spinner } from "../../components/Spinner";

const OperationsList = () => {
  const dispatch = useDispatch();
  const operations = useSelector(operationsSelectors.selectAll);

  const operationStatus = useSelector((state) => state.operations.status);

  const error = useSelector((state) => state.operations.error);

  useEffect(() => {
    if (operationStatus === "idle") {
      dispatch(fetchOperations());
    }
  }, [operationStatus, dispatch]);

  const onUpdateOperation = useCallback(
    (id, categoryId, date, sum) => {
      try {
        dispatch(updateOperation({ id, categoryId, date, sum }));
      } catch (err) {
        console.error("Failed to update the operation", err);
      }
    },
    [dispatch]
  );

  let content;
  if (operationStatus === "loading") {
    content = <Spinner text="Loading..." />;
  } else if (operationStatus === "succeeded") {
    content = operations.map((operation) => (
      <OperationExcerpt
        key={operation.id}
        operation={operation}
        id={operation.id}
        onUpdateOperation={onUpdateOperation}
      />
    ));
  } else if (operationStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};

export { OperationsList };
