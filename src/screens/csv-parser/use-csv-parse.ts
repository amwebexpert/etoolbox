import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { useToastMessage } from "~/providers/toast-message-provider";

import { useCsvParserStore } from "./csv-parser.store";
import { parseCsv } from "./csv-parser.utils";

export const useCsvParse = () => {
  const messageApi = useToastMessage();
  const setParseResult = useCsvParserStore((state) => state.setParseResult);

  const { data, mutate, isPending, isError, error, isSuccess, reset } = useMutation({
    mutationFn: parseCsv,
    onSuccess: (result) => {
      setParseResult(result);
      const errorCount = result.errors.length;
      if (errorCount > 0) {
        messageApi.warning(`Parsed with ${errorCount} warning(s)`);
      } else {
        messageApi.success(`Parsed ${result.data.length} rows successfully!`);
      }
    },
  });

  useEffect(() => {
    if (isError && error) {
      messageApi.error(`Parse failed: ${error.message}`);
    }
  }, [isError, error, messageApi]);

  const resetParse = () => {
    reset();
    setParseResult(null);
  };

  return {
    result: data ?? null,
    parse: mutate,
    isParsing: isPending,
    isParseError: isError,
    isParseSuccess: isSuccess,
    parseError: error,
    resetParse,
  };
};
