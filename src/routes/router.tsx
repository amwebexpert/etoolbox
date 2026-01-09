import { createRootRoute, createRoute, createRouter, createHashHistory, Navigate } from "@tanstack/react-router";
import { RootLayout } from "~/routes/root-layout";
import { About } from "~/screens/about/about";
import { Base64 } from "~/screens/base64/base64";
import { Base64File } from "~/screens/base64/file/base64-file";
import { Base64String } from "~/screens/base64/string/base64-string";
import { Colors } from "~/screens/colors/colors";
import { NamedColors } from "~/screens/colors/named/named-colors";
import { ColorPicker } from "~/screens/colors/picker/color-picker";
import { CommonLists } from "~/screens/common-lists/common-lists";
import { HtmlEntities } from "~/screens/common-lists/html-entities/html-entities";
import { MimeTypes } from "~/screens/common-lists/mime-types/mime-types";
import { CsvParser } from "~/screens/csv-parser/csv-parser";
import { DateConverter } from "~/screens/date-converter/date-converter";
import { GithubUserProjects } from "~/screens/github-user-projects/github-user-projects";
import { Home } from "~/screens/home/home";
import { ImageOcr } from "~/screens/image-ocr/image-ocr";
import { JsonConverter } from "~/screens/json/converter/json-converter";
import { JsonFormatter } from "~/screens/json/formatter/json-formatter";
import { Json } from "~/screens/json/json";
import { JsonRepair } from "~/screens/json/repair/json-repair";
import { JwtDecoder } from "~/screens/jwt-decoder/jwt-decoder";
import { PokerPlanning } from "~/screens/poker-planning/poker-planning";
import { RegexTester } from "~/screens/regex-tester/regex-tester";
import { Qrcode } from "~/screens/qrcode/qrcode";
import { QrcodeDecoder } from "~/screens/qrcode/decoder/qrcode-decoder";
import { QrcodeGenerator } from "~/screens/qrcode/generator/qrcode-generator";
import { UrlCurl } from "~/screens/url-parse-encode/curl/url-curl";
import { UrlEncoder } from "~/screens/url-parse-encode/encoder/url-encoder";
import { UrlParser } from "~/screens/url-parse-encode/parser/url-parser";
import { Url } from "~/screens/url-parse-encode/url";
import { UuidGenerator } from "~/screens/uuid-generator/uuid-generator";
import { Vr3dViewer } from "~/screens/vr-3d-viewer/vr-3d-viewer";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const base64Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/base64",
  component: Base64,
});

const base64IndexRoute = createRoute({
  getParentRoute: () => base64Route,
  path: "/",
  component: () => <Navigate to="/base64/string" replace />,
});

const base64StringRoute = createRoute({
  getParentRoute: () => base64Route,
  path: "/string",
  component: Base64String,
});

const base64FileRoute = createRoute({
  getParentRoute: () => base64Route,
  path: "/file",
  component: Base64File,
});

const urlRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/url",
  component: Url,
});

const urlIndexRoute = createRoute({
  getParentRoute: () => urlRoute,
  path: "/",
  component: () => <Navigate to="/url/encoder" replace />,
});

const urlCurlRoute = createRoute({
  getParentRoute: () => urlRoute,
  path: "/curl",
  component: UrlCurl,
});

const urlParserRoute = createRoute({
  getParentRoute: () => urlRoute,
  path: "/parser",
  component: UrlParser,
});

const urlEncoderRoute = createRoute({
  getParentRoute: () => urlRoute,
  path: "/encoder",
  component: UrlEncoder,
});

const jsonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/json",
  component: Json,
});

const jsonIndexRoute = createRoute({
  getParentRoute: () => jsonRoute,
  path: "/",
  component: () => <Navigate to="/json/formatter" replace />,
});

const jsonFormatterRoute = createRoute({
  getParentRoute: () => jsonRoute,
  path: "/formatter",
  component: JsonFormatter,
});

const jsonConverterRoute = createRoute({
  getParentRoute: () => jsonRoute,
  path: "/converter",
  component: JsonConverter,
});

const jsonRepairRoute = createRoute({
  getParentRoute: () => jsonRoute,
  path: "/repair",
  component: JsonRepair,
});

const colorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/colors",
  component: Colors,
});

const colorsIndexRoute = createRoute({
  getParentRoute: () => colorsRoute,
  path: "/",
  component: () => <Navigate to="/colors/picker" replace />,
});

const colorPickerRoute = createRoute({
  getParentRoute: () => colorsRoute,
  path: "/picker",
  component: ColorPicker,
});

const namedColorsRoute = createRoute({
  getParentRoute: () => colorsRoute,
  path: "/named",
  component: NamedColors,
});

const regexTesterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/regex-tester",
  component: RegexTester,
});

const uuidGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/uuid-generator",
  component: UuidGenerator,
});

const jwtDecoderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jwt-decoder",
  component: JwtDecoder,
});

const qrcodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/qrcode",
  component: Qrcode,
});

const qrcodeIndexRoute = createRoute({
  getParentRoute: () => qrcodeRoute,
  path: "/",
  component: () => <Navigate to="/qrcode/generator" replace />,
});

const qrcodeGeneratorRoute = createRoute({
  getParentRoute: () => qrcodeRoute,
  path: "/generator",
  component: QrcodeGenerator,
});

const qrcodeDecoderRoute = createRoute({
  getParentRoute: () => qrcodeRoute,
  path: "/decoder",
  component: QrcodeDecoder,
});

const imageOcrRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/image-ocr",
  component: ImageOcr,
});

const commonListsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/common-lists",
  component: CommonLists,
});

const commonListsIndexRoute = createRoute({
  getParentRoute: () => commonListsRoute,
  path: "/",
  component: () => <Navigate to="/common-lists/mime-types" replace />,
});

const mimeTypesRoute = createRoute({
  getParentRoute: () => commonListsRoute,
  path: "/mime-types",
  component: MimeTypes,
});

const htmlEntitiesRoute = createRoute({
  getParentRoute: () => commonListsRoute,
  path: "/html-entities",
  component: HtmlEntities,
});

const githubUserProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/github-user-projects",
  component: GithubUserProjects,
});

const dateConverterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/date-converter",
  component: DateConverter,
});

const csvParserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/csv-parser",
  component: CsvParser,
});

const pokerPlanningRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/poker-planning",
  component: PokerPlanning,
});

const pokerPlanningWithParamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/poker-planning/$hostName/$roomUUID/$roomName",
  component: PokerPlanning,
});

const vr3dViewerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vr-3d-viewer",
  component: Vr3dViewer,
});

export const ROUTES_WITH_CHILDREN = ["/url", "/base64", "/json", "/colors", "/common-lists", "/qrcode"];

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  base64Route.addChildren([base64IndexRoute, base64StringRoute, base64FileRoute]),
  urlRoute.addChildren([urlIndexRoute, urlCurlRoute, urlParserRoute, urlEncoderRoute]),
  jsonRoute.addChildren([jsonIndexRoute, jsonFormatterRoute, jsonConverterRoute, jsonRepairRoute]),
  colorsRoute.addChildren([colorsIndexRoute, colorPickerRoute, namedColorsRoute]),
  regexTesterRoute,
  uuidGeneratorRoute,
  jwtDecoderRoute,
  qrcodeRoute.addChildren([qrcodeIndexRoute, qrcodeGeneratorRoute, qrcodeDecoderRoute]),
  imageOcrRoute,
  commonListsRoute.addChildren([commonListsIndexRoute, mimeTypesRoute, htmlEntitiesRoute]),
  githubUserProjectsRoute,
  dateConverterRoute,
  csvParserRoute,
  pokerPlanningRoute,
  pokerPlanningWithParamsRoute,
  vr3dViewerRoute,
]);

const hashHistory = createHashHistory();

export const router = createRouter({ routeTree, history: hashHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
