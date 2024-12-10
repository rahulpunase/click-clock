import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";

function useOptimisticUpdates<T>(mutate: UseMutateFunction, defaultValue: T) {
  const [state, setStatus] = useState(defaultValue);
  const ref = useRef(defaultValue);

  return {
    mutate,
    state,
  };
}

export { useOptimisticUpdates };
