import { createRouter, defineRoute } from "type-route";

export const { RouteProvider, useRoute, routes } = createRouter({
    home: defineRoute("/"),
    map: defineRoute("/cartes"),
    test_tinymceditor: defineRoute("/test-tinymceditor"),
    test_tiptap_editor: defineRoute("/test-tiptap-editor"),
    personal_data: defineRoute("/donnees-personnelles"),
});
