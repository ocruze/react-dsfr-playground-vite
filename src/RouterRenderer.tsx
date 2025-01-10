import { FC } from "react";

import { useRoute } from "./router";
import ExtentMap from "./ExtentMap";
import TestTinyMCEditor from "./TestTinyMCEditor";
import TestTiptapEditor from "./TestTiptapEditor";
import TestTiptapMarkdown from "./TestTiptapMarkdown";
import TestCustomTiptapEditor from "./TestCustomTiptapEditor";
import TestTiptapLibrary from "./TestTiptapLibrary";

const RouterRenderer: FC = () => {
    const route = useRoute();

    switch (route.name) {
        case "home":
            return "Accueil";

        case "map":
            return <ExtentMap />;

        case "test_tinymceditor":
            return <TestTinyMCEditor />;

        case "test_tiptap_editor":
            return <TestTiptapEditor />;

        case "test_tiptap_custom":
            return <TestCustomTiptapEditor />;

        case "test_tiptap_markdown":
            return <TestTiptapMarkdown />;

        case "test_tiptap_library":
            return <TestTiptapLibrary />;

        case "personal_data":
            return "Données personnelles";

        default:
            return "404";
    }
};

export default RouterRenderer;
