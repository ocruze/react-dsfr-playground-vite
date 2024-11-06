// import { LayerSwitcher } from "geopf-extensions-openlayers"; // erreur : Cannot find module geopf-extensions-openlayers or its corresponding type declarations
// import { LayerSwitcher } from "geopf-extensions-openlayers/src";
import LayerSwitcher from "geopf-extensions-openlayers/src/packages/Controls/LayerSwitcher/LayerSwitcher";
import SearchEngine from "geopf-extensions-openlayers/src/packages/Controls/SearchEngine/SearchEngine";
import GeoportalZoom from "geopf-extensions-openlayers/src/packages/Controls/Zoom/GeoportalZoom";
import GeoportalFullScreen from "geopf-extensions-openlayers/src/packages/Controls/FullScreen/GeoportalFullScreen";
import Catalog from "geopf-extensions-openlayers/src/packages/Controls/Catalog/Catalog";
import { Feature, View } from "ol";
import Map from "ol/Map";
import { ScaleLine } from "ol/control";
import GeoJSON from "ol/format/GeoJSON";
import { defaults as defaultInteractions } from "ol/interaction";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
import { FC, useEffect, useMemo, useRef } from "react";

import extent from "./data/extent.json";
import olDefaults from "./data/ol-defaults.json";
import useCapabilities from "./hooks/useCapabilities";

import "ol/ol.css";

// NOTE : normalement pas besoin d'importer le css dsfr ici car il est déjà importé
// j'ai essayé de l'importer ici mais ça ne change rien, que ce soit le css venant de @codegouvfr/react-dsfr/dsfr ou de @gouvfr/dsfr
// import "@codegouvfr/react-dsfr/dsfr/dsfr.main.min.css";
// import "@gouvfr/dsfr/dist/dsfr.css";
// import "@gouvfr/dsfr/dist/utility/icons/icons.css";
import "geopf-extensions-openlayers/css/Dsfr.css";

import "./styles/map-view.scss";

const ExtentMap: FC = () => {
    const mapTargetRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map>();

    const { data: capabilities } = useCapabilities();

    const extentLayer = useMemo(() => {
        const extentFeatures = new GeoJSON({
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
        }).readFeatures(extent);

        const extentSource = new VectorSource({
            features: extentFeatures as Feature[], // NOTE : un peu dégeu mais j'ai pas trouvé mieux comme solution qui marche
        });

        return new VectorLayer({
            source: extentSource,
        });
    }, []);

    const bgLayer = useMemo(() => {
        if (!capabilities) return;

        const wmtsOptions = optionsFromCapabilities(capabilities, {
            layer: olDefaults.default_background_layer,
        });

        if (!wmtsOptions) return;

        const bgLayer = new TileLayer();
        bgLayer.setSource(new WMTS(wmtsOptions));

        return bgLayer;
    }, [capabilities]);

    useEffect(() => {
        if (!bgLayer || !extentLayer) return;

        const layerSwitcher = new LayerSwitcher({
            layers: [
                {
                    layer: bgLayer,
                    config: {
                        title: "Plan IGN v2",
                    },
                },
                {
                    layer: extentLayer,
                    config: {
                        title: "Emprise",
                    },
                },
            ],
            options: {
                position: "top-right",
                collapsed: true,
                panel: true,
                counter: true,
            },
        });

        const catalog = new Catalog({
            collapsed: true,
            draggable: false,
            titlePrimary: "",
            titleSecondary: "Gérer vos couches de données",
            layerLabel: "title",
            layerFilter: [],
            search: {
                display: true,
                criteria: ["name", "title", "description"],
            },
            addToMap: true,
            categories: [
                {
                    title: "Données",
                    id: "data",
                    default: true,
                    filter: null,
                    // sous categories
                    // items : [
                    //     {
                    //         title : "",
                    //         default : true,
                    //         filter : {
                    //             field : "",
                    //             value : ""
                    //         }
                    //     }
                    // ]
                },
            ],
            configuration: {
                type: "json", // type:"service"
                urls: [
                    // data:{}
                    "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/layers.json",
                    "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/edito.json",
                ],
            },
            position: "top-right",
        });

        const controls = [
            layerSwitcher,
            new SearchEngine({
                collapsed: true,
                displayAdvancedSearch: false,
                apiKey: "essentiels",
                zoomTo: "auto",
            }),
            new ScaleLine(),
            new GeoportalZoom({ position: "top-left" }),
            new GeoportalFullScreen({ position: "bottom-right" }),
            catalog,
        ];

        mapRef.current = new Map({
            target: mapTargetRef.current as HTMLElement,
            layers: [bgLayer, extentLayer],
            interactions: defaultInteractions(),
            controls: controls,
            view: new View({
                projection: olDefaults.projection,
                center: fromLonLat(olDefaults.center),
                zoom: olDefaults.zoom,
            }),
        });
        const extentLayerSource = extentLayer.getSource();
        if (extentLayerSource) {
            mapRef.current.getView().fit(extentLayerSource.getExtent());
        }

        return () => mapRef.current?.setTarget(undefined);
    }, [bgLayer, extentLayer]);

    return (
        <div
            id="map-and-tools-container"
            style={{
                marginLeft: 0,
                width: "inherit",
                height: "70vh",
                display: "flex",
            }}
        >
            <div
                ref={mapTargetRef}
                // style={{
                //     width: "100%",
                //     position: "relative",
                //     height: "inherit",
                // }}
                className="map-view"
            />
        </div>
    );
};

export default ExtentMap;
