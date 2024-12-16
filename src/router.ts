import { createRouter, defineRoute } from "type-route";

const BASE_URL = import.meta.env?.BASE_URL?.replace(/\/$/, "") ?? "/";

export const { RouteProvider, useRoute, routes } = createRouter({
    home: defineRoute(BASE_URL === "" ? "/" : BASE_URL),
    map: defineRoute(`${BASE_URL}/cartes`),
    test_tinymceditor: defineRoute(`${BASE_URL}/test-tinymceditor`),
    test_tiptap_editor: defineRoute(`${BASE_URL}/test-tiptap-editor`),
    personal_data: defineRoute(`${BASE_URL}/donnees-personnelles`),
    test_tiptap_custom: defineRoute(`${BASE_URL}/test-tiptap-custom`),
    test_tiptap_markdown: defineRoute(`${BASE_URL}/test-tiptap-markdown`),
});
