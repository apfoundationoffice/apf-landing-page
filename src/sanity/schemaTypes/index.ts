import type { SchemaTypeDefinition } from "sanity";
import { event } from "./event";
import { homePage } from "./homePage";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [homePage, event, siteSettings];
