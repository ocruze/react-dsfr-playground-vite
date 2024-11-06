import { FC } from "react";

import { useRoute } from "./router";
import ExtentMap from "./ExtentMap";

const RouterRenderer: FC = () => {
    const route = useRoute();

    switch (route.name) {
        case "home":
            return "Accueil";

        case "map":
            return <ExtentMap />;

        case "personal_data":
            return "Données personnelles";

        default:
            return "404";
    }
};

export default RouterRenderer;
