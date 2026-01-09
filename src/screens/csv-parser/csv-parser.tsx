import { TableOutlined } from "@ant-design/icons";
import { isNotBlank } from "@lichens-innovation/ts-common";
import { Flex, Form } from "antd";
import { createStyles } from "antd-style";

import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useClipboardCopy } from "~/hooks/use-clipboard-copy";
import { downloadJson } from "~/utils/download.utils";
import { safeJsonStringify } from "~/utils/json.utils";

import { CsvAdvancedOptions } from "./components/csv-advanced-options";
import { CsvFileUpload } from "./components/csv-file-upload";
import { CsvInputArea } from "./components/csv-input-area";
import { CsvParserErrors } from "./csv-parser-errors";
import { CsvParserResult } from "./csv-parser-result";
import { CsvParserStats } from "./csv-parser-stats";
import { CsvParserToolbar } from "./csv-parser-toolbar";
import { useCsvParserStore } from "./csv-parser.store";
import type { FileInfo } from "./csv-parser.types";
import { useCsvParse } from "./use-csv-parse";

export const CsvParser = () => {
  const { styles } = useStyles();
  const { copyTextToClipboard } = useClipboardCopy();

  const {
    csvInput,
    fileEncoding,
    parserOptions,
    fileInfo,
    viewMode,
    parseResult,
    setCsvInput,
    setFileEncoding,
    setParserOptions,
    setFileInfo,
    setViewMode,
    clearAll,
  } = useCsvParserStore();

  const { parse, isParsing, resetParse } = useCsvParse();

  const handleFileLoaded = (content: string, loadedFileInfo: FileInfo) => {
    setCsvInput(content);
    setFileInfo(loadedFileInfo);
  };

  const handleParse = () => {
    if (!csvInput) return;

    parse({
      csvData: csvInput,
      options: parserOptions,
    });
  };

  const handleCopy = () => {
    if (!parseResult) return;
    const jsonOutput = safeJsonStringify(parseResult.data);
    copyTextToClipboard({ text: jsonOutput, successMessage: "Result copied to clipboard!" });
  };

  const handleDownload = () => {
    if (!parseResult) return;
    const jsonOutput = safeJsonStringify(parseResult.data);
    const fileName = fileInfo?.name ? fileInfo.name.replace(/\.csv$/i, ".json") : "parsed-data.json";
    downloadJson({ content: jsonOutput, fileName });
  };

  const handleClear = () => {
    clearAll();
    resetParse();
  };

  const hasContent = isNotBlank(csvInput);
  const hasResult = !!parseResult;

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<TableOutlined />}
          title="CSV Parser"
          description="Parse CSV files and convert them to JSON format with auto-detection of delimiters and data types"
        />

        <Form layout="vertical" className={styles.form}>
          <CsvFileUpload
            fileEncoding={fileEncoding}
            fileInfo={fileInfo}
            onEncodingChange={setFileEncoding}
            onFileLoaded={handleFileLoaded}
          />

          <CsvInputArea value={csvInput} onChange={setCsvInput} />

          <CsvAdvancedOptions options={parserOptions} onOptionsChange={setParserOptions} />
        </Form>

        <CsvParserToolbar
          hasContent={hasContent}
          hasResult={hasResult}
          isParsing={isParsing}
          viewMode={viewMode}
          onParse={handleParse}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onClear={handleClear}
          onViewModeChange={setViewMode}
        />

        {/* Parse errors/warnings */}
        {parseResult && <CsvParserErrors errors={parseResult.errors} />}

        {/* Statistics */}
        {parseResult && <CsvParserStats result={parseResult} />}

        {/* Results */}
        <CsvParserResult result={parseResult} viewMode={viewMode} />
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  form: {
    width: "100%",
  },
}));
