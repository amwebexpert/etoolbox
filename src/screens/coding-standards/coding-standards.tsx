import { FileSearchOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { createStyles } from "antd-style";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { isNullish } from "@lichens-innovation/ts-common";
import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { useMarkdownLoader } from "./hooks/use-markdown-loader";
import { useSemanticSearch } from "./hooks/use-semantic-search";
import { useCodingStandardsStore, useDisposeEmbeddings, useSetSearchResults } from "./coding-standards.store";
import { EmbeddingsProgress } from "./components/embeddings-progress";
import { ModelLoadingProgress } from "./components/model-loading-progress";
import { ResultsList } from "./components/results-list";
import { SearchInput } from "~/components/ui/search-input";

export const CodingStandards = () => {
  const { styles } = useStyles();
  const {
    searchQuery,
    setSearchQuery,
    isSearching,
    searchResults,
    guidelineSources,
    embeddingsProgress,
    isLoadingModel,
    modelLoadProgress,
  } = useCodingStandardsStore();

  const setSearchResults = useSetSearchResults();
  const disposeEmbeddings = useDisposeEmbeddings();
  const { rootNode, isLoading: isLoadingMarkdown, error: markdownError } = useMarkdownLoader(guidelineSources);
  const baseUrl = guidelineSources.find((s) => s.enabled)?.url ?? "";
  const { search, isReady } = useSemanticSearch(rootNode, baseUrl);
  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  // Dispose embeddings engine when leaving the screen to free memory
  useEffect(() => {
    return disposeEmbeddings;
  }, [disposeEmbeddings]);

  // Clear results immediately when user clears the input
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
    }
  }, [searchQuery, setSearchResults]);

  useEffect(() => {
    if (!debouncedSearchQuery.trim() || isNullish(rootNode)) {
      return;
    }
    search(debouncedSearchQuery);
  }, [debouncedSearchQuery, rootNode, search]);

  const handleSearch = () => {
    if (searchQuery.trim() && !isNullish(rootNode)) {
      search(searchQuery);
    }
  };

  if (markdownError) {
    return (
      <ScreenContainer>
        <ScreenHeader
          icon={<FileSearchOutlined />}
          title="Coding Standards Finder"
          description="Semantic search for React and TypeScript coding standards"
        />
        <div className={styles.error}>Error loading guidelines: {markdownError.message}</div>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" className={styles.fullWidth}>
        <ScreenHeader
          icon={<FileSearchOutlined />}
          title="Coding Standards Finder"
          description="Semantic search for React and TypeScript coding standards and best practices"
        />

        {isLoadingMarkdown && <div className={styles.loading}>Loading guidelines from sources...</div>}

        {!isLoadingMarkdown && !isNullish(rootNode) && (
          <>
            <ModelLoadingProgress isLoading={isLoadingModel} progress={modelLoadProgress} />

            <SearchInput
              value={searchQuery}
              loading={isSearching || isLoadingModel}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Chercher une règle de coding standards..."
            />

            {!isReady && !isLoadingModel && <EmbeddingsProgress progress={embeddingsProgress} />}

            <ResultsList results={searchResults} isLoading={isSearching} />
          </>
        )}
      </Flex>
    </ScreenContainer>
  );
};

const useStyles = createStyles(() => ({
  fullWidth: {
    width: "100%",
  },
  loading: {
    padding: 24,
    textAlign: "center",
  },
  error: {
    padding: 24,
    textAlign: "center",
    color: "#ff4d4f",
  },
}));
