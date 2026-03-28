import { FileSearchOutlined } from "@ant-design/icons";
import { Alert, Flex, Spin } from "antd";
import { useEffect } from "react";
import { ScreenContainer } from "~/components/ui/screen-container";
import { ScreenHeader } from "~/components/ui/screen-header";
import { SearchInput } from "~/components/ui/search-input";
import { useCodingStandardsStore } from "./coding-standards.store";
import { CodingStandardsAdvancedOptions } from "./components/coding-standards-advanced-options";
import { EmbeddingsProgress } from "./components/embeddings-progress";
import { ModelLoadingProgress } from "./components/model-loading/model-loading-progress";
import { ResultsList } from "./components/results-list";
import { useMarkdownLoader } from "./hooks/use-markdown-loader";
import { useSemanticSearch } from "./hooks/use-semantic-search";

export const CodingStandards = () => {
  const {
    searchQuery,
    setSearchQuery,
    isSearching,
    searchResults,
    guidelineSources,
    embeddingsProgress,
    isLoadingModel,
    disposeEmbeddings,
  } = useCodingStandardsStore();

  const { rootNode, isLoadingGuidelines, guidelinesError } = useMarkdownLoader(guidelineSources);
  const { search, isReadyForSemanticSearch } = useSemanticSearch(rootNode);

  useEffect(() => {
    return disposeEmbeddings; // Dispose embeddings engine when leaving the screen to free memory
  }, [disposeEmbeddings]);

  useEffect(() => {
    if (!isReadyForSemanticSearch) return;
    search(searchQuery);
  }, [searchQuery, rootNode, search, isReadyForSemanticSearch]);

  const shouldShowEmbeddingsProgress = !isReadyForSemanticSearch && !isLoadingModel;

  return (
    <ScreenContainer>
      <Flex vertical gap="middle" style={{ width: "100%" }}>
        <ScreenHeader
          icon={<FileSearchOutlined />}
          title="Coding Standards Finder"
          description="Semantic search for React and TypeScript coding standards and best practices"
        />

        <CodingStandardsAdvancedOptions rootNode={rootNode} />

        {guidelinesError && (
          <Alert type="error" showIcon title={`Error loading guidelines: ${guidelinesError.message}`} />
        )}
        {isLoadingGuidelines && (
          <Flex justify="center" align="center" style={{ padding: 24 }}>
            <Spin description="Loading guidelines from sources..." />
          </Flex>
        )}

        <SearchInput
          value={searchQuery}
          loading={isSearching || !isReadyForSemanticSearch}
          onChange={setSearchQuery}
          onSearch={() => search(searchQuery)}
          placeholder="Search for coding standards and best practices..."
        />

        {isReadyForSemanticSearch && <ResultsList results={searchResults} isLoading={isSearching} />}

        <ModelLoadingProgress isLoading={isLoadingModel} />
        {shouldShowEmbeddingsProgress && <EmbeddingsProgress progress={embeddingsProgress} />}
      </Flex>
    </ScreenContainer>
  );
};
