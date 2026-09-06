import { expect, test as base } from "@playwright/test";

import { Base64Page } from "../pages/base64-page";
import { CodingStandardsPage } from "../pages/coding-standards-page";
import { ColorsPage } from "../pages/colors-page";
import { CommonListsPage } from "../pages/common-lists-page";
import { CsvParserPage } from "../pages/csv-parser-page";
import { DateConverterPage } from "../pages/date-converter-page";
import { DiffViewerPage } from "../pages/diff-viewer-page";
import { GithubUserProjectsPage } from "../pages/github-user-projects-page";
import { ImageOcrPage } from "../pages/image-ocr-page";
import { JsonPage } from "../pages/json-page";
import { JwtDecoderPage } from "../pages/jwt-decoder-page";
import { MarkdownComposerPage } from "../pages/markdown-composer-page";
import { PokerPlanningPage } from "../pages/poker-planning-page";
import { QrcodePage } from "../pages/qrcode-page";
import { RegexTesterPage } from "../pages/regex-tester-page";
import { UrlPage } from "../pages/url-page";
import { UuidGeneratorPage } from "../pages/uuid-generator-page";
import { Vr3dViewerPage } from "../pages/vr-3d-viewer-page";

interface PageFixtures {
  jsonPage: JsonPage;
  base64Page: Base64Page;
  urlPage: UrlPage;
  colorsPage: ColorsPage;
  qrcodePage: QrcodePage;
  imageOcrPage: ImageOcrPage;
  commonListsPage: CommonListsPage;
  regexTesterPage: RegexTesterPage;
  uuidGeneratorPage: UuidGeneratorPage;
  jwtDecoderPage: JwtDecoderPage;
  dateConverterPage: DateConverterPage;
  csvParserPage: CsvParserPage;
  diffViewerPage: DiffViewerPage;
  vr3dViewerPage: Vr3dViewerPage;
  githubUserProjectsPage: GithubUserProjectsPage;
  codingStandardsPage: CodingStandardsPage;
  pokerPlanningPage: PokerPlanningPage;
  markdownComposerPage: MarkdownComposerPage;
}

export const test = base.extend<PageFixtures>({
  jsonPage: async ({ page }, provideFixture) => {
    await provideFixture(new JsonPage(page));
  },
  base64Page: async ({ page }, provideFixture) => {
    await provideFixture(new Base64Page(page));
  },
  urlPage: async ({ page }, provideFixture) => {
    await provideFixture(new UrlPage(page));
  },
  colorsPage: async ({ page }, provideFixture) => {
    await provideFixture(new ColorsPage(page));
  },
  qrcodePage: async ({ page }, provideFixture) => {
    await provideFixture(new QrcodePage(page));
  },
  imageOcrPage: async ({ page }, provideFixture) => {
    await provideFixture(new ImageOcrPage(page));
  },
  commonListsPage: async ({ page }, provideFixture) => {
    await provideFixture(new CommonListsPage(page));
  },
  regexTesterPage: async ({ page }, provideFixture) => {
    await provideFixture(new RegexTesterPage(page));
  },
  uuidGeneratorPage: async ({ page }, provideFixture) => {
    await provideFixture(new UuidGeneratorPage(page));
  },
  jwtDecoderPage: async ({ page }, provideFixture) => {
    await provideFixture(new JwtDecoderPage(page));
  },
  dateConverterPage: async ({ page }, provideFixture) => {
    await provideFixture(new DateConverterPage(page));
  },
  csvParserPage: async ({ page }, provideFixture) => {
    await provideFixture(new CsvParserPage(page));
  },
  diffViewerPage: async ({ page }, provideFixture) => {
    await provideFixture(new DiffViewerPage(page));
  },
  vr3dViewerPage: async ({ page }, provideFixture) => {
    await provideFixture(new Vr3dViewerPage(page));
  },
  githubUserProjectsPage: async ({ page }, provideFixture) => {
    await provideFixture(new GithubUserProjectsPage(page));
  },
  codingStandardsPage: async ({ page }, provideFixture) => {
    await provideFixture(new CodingStandardsPage(page));
  },
  pokerPlanningPage: async ({ page }, provideFixture) => {
    await provideFixture(new PokerPlanningPage(page));
  },
  markdownComposerPage: async ({ page }, provideFixture) => {
    await provideFixture(new MarkdownComposerPage(page));
  },
});

export { expect };
