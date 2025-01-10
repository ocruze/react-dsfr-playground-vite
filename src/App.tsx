import { fr } from "@codegouvfr/react-dsfr";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import { ConsentBannerAndConsentManagement, FooterConsentManagementItem, FooterPersonalDataPolicyItem } from "./consentManagement";
import { RouteProvider, routes } from "./router";
import RouterRenderer from "./RouterRenderer";

const queryClient = new QueryClient();

const persister = createSyncStoragePersister({
    storage: window.localStorage,
});

function App() {
    return (
        <>
            <Header
                brandTop={
                    <>
                        INTITULE
                        <br />
                        OFFICIEL
                    </>
                }
                serviceTitle="Nom du site / service"
                homeLinkProps={{
                    ...routes.home().link,
                    title: "Accueil",
                }}
                navigation={[
                    {
                        text: "Accueil",
                        linkProps: routes.home().link,
                    },
                    {
                        text: "Cartes",
                        linkProps: routes.map().link,
                    },
                    {
                        text: "Test TinyMCE",
                        linkProps: routes.test_tinymceditor().link,
                    },
                    {
                        text: "Test Tiptap Editor",
                        linkProps: routes.test_tiptap_editor().link,
                    },
                    {
                        text: "Test Tiptap Custom",
                        linkProps: routes.test_tiptap_custom().link,
                    },
                    {
                        text: "Test Tiptap Markdown",
                        linkProps: routes.test_tiptap_markdown().link,
                    },
                    {
                        text: "Test @ignf/react-dsfr-tiptap",
                        linkProps: routes.test_tiptap_library().link,
                    },
                    {
                        text: "Données personnelles",
                        linkProps: routes.personal_data().link,
                    },
                    {
                        text: "Lien externe",
                        linkProps: {
                            href: "https://example.fr",
                            target: "_blank",
                        },
                        isActive: false,
                    },
                ]}
                quickAccessItems={[headerFooterDisplayItem]}
            />
            <ConsentBannerAndConsentManagement />
            <main>
                <RouteProvider>
                    <div className={fr.cx("fr-container")}>
                        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
                            <ReactQueryDevtools initialIsOpen={false} />
                            <RouterRenderer />
                        </PersistQueryClientProvider>
                    </div>
                </RouteProvider>
            </main>
            <Footer
                accessibility="fully compliant"
                contentDescription={`
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                        eu fugiat nulla pariatur. 
                    `}
                bottomItems={[<FooterPersonalDataPolicyItem />, <FooterConsentManagementItem />, headerFooterDisplayItem]}
            />
        </>
    );
}

export default App;
