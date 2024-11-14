import { FC } from "react";

import { useRoute } from "./router";
import ExtentMap from "./ExtentMap";
import TestTinyMCEditor from "./TestTinyMCEditor";
import TestTiptapEditor from "./TestTiptapEditor";

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

        case "personal_data":
            return "Données personnelles";

        default:
            return "404";
    }
};

export default RouterRenderer;
