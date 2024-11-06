import { createRouter, defineRoute } from "type-route";

export const { RouteProvider, useRoute, routes } = createRouter({
    home: defineRoute("/"),
    map: defineRoute("/cartes"),
    personal_data: defineRoute("/donnees-personnelles"),
});
