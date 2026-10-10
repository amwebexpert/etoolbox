import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { useToastMessage } from "~/hooks/use-toast-message";

import { useSetParseResult } from "./csv-parser.store";
import { getParseResultToast, parseCsv } from "./csv-parser.utils";

export const useCsvParse = () => {
  const messageApi = useToastMessage();
  const setParseResult = useSetParseResult();

  const { data, mutate, isPending, isError, error, isSuccess, reset } = useMutation({
    mutationFn: parseCsv,
    onSuccess: (result) => {
      setParseResult(result);
      const { level, content } = getParseResultToast(result);
      messageApi[level](content);
    },
  });

  useEffect(() => {
    if (isError && error) {
      messageApi.error(`Parse failed: ${error.message}`);
    }
  }, [isError, error, messageApi]);

  const resetCsvParseResult = () => {
    reset();
    setParseResult(null);
  };

  return {
    csvParseResult: data ?? null,
    parseCsv: mutate,
    isParsingCsv: isPending,
    isParseCsvError: isError,
    isParseCsvSuccess: isSuccess,
    parseCsvError: error,
    resetCsvParseResult,
  };
};
