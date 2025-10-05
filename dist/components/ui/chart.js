"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartStyle = exports.ChartLegend = exports.ChartTooltip = void 0;
exports.ChartContainer = ChartContainer;
exports.ChartTooltipContent = ChartTooltipContent;
exports.ChartLegendContent = ChartLegendContent;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const RechartsPrimitive = __importStar(require("recharts"));
const utils_1 = require("@/lib/utils");
// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function useChart() {
    const context = React.useContext(ChartContext);
    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />");
    }
    return context;
}
function ChartContainer(_a) {
    var { id, className, children, config } = _a, props = __rest(_a, ["id", "className", "children", "config"]);
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
    return ((0, jsx_runtime_1.jsx)(ChartContext.Provider, { value: { config }, children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ "data-slot": "chart", "data-chart": chartId, className: (0, utils_1.cn)("[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden", className) }, props, { children: [(0, jsx_runtime_1.jsx)(ChartStyle, { id: chartId, config: config }), (0, jsx_runtime_1.jsx)(RechartsPrimitive.ResponsiveContainer, { children: children })] })) }));
}
const ChartStyle = ({ id, config }) => {
    const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);
    if (!colorConfig.length) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("style", { dangerouslySetInnerHTML: {
            __html: Object.entries(THEMES)
                .map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
                .map(([key, itemConfig]) => {
                var _a;
                const color = ((_a = itemConfig.theme) === null || _a === void 0 ? void 0 : _a[theme]) ||
                    itemConfig.color;
                return color ? `  --color-${key}: ${color};` : null;
            })
                .join("\n")}
}
`)
                .join("\n"),
        } }));
};
exports.ChartStyle = ChartStyle;
const ChartTooltip = RechartsPrimitive.Tooltip;
exports.ChartTooltip = ChartTooltip;
function ChartTooltipContent({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, }) {
    const { config } = useChart();
    const tooltipLabel = React.useMemo(() => {
        var _a;
        if (hideLabel || !(payload === null || payload === void 0 ? void 0 : payload.length)) {
            return null;
        }
        const [item] = payload;
        const key = `${labelKey || (item === null || item === void 0 ? void 0 : item.dataKey) || (item === null || item === void 0 ? void 0 : item.name) || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        const value = !labelKey && typeof label === "string"
            ? ((_a = config[label]) === null || _a === void 0 ? void 0 : _a.label) || label
            : itemConfig === null || itemConfig === void 0 ? void 0 : itemConfig.label;
        if (labelFormatter) {
            return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("font-medium", labelClassName), children: labelFormatter(value, payload) }));
        }
        if (!value) {
            return null;
        }
        return (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("font-medium", labelClassName), children: value });
    }, [
        label,
        labelFormatter,
        payload,
        hideLabel,
        labelClassName,
        config,
        labelKey,
    ]);
    if (!active || !(payload === null || payload === void 0 ? void 0 : payload.length)) {
        return null;
    }
    const nestLabel = payload.length === 1 && indicator !== "dot";
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)("border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl", className), children: [!nestLabel ? tooltipLabel : null, (0, jsx_runtime_1.jsx)("div", { className: "grid gap-1.5", children: payload
                    .filter((item) => item.type !== "none")
                    .map((item, index) => {
                    const key = `${nameKey || item.name || item.dataKey || "value"}`;
                    const itemConfig = getPayloadConfigFromPayload(config, item, key);
                    const indicatorColor = color || item.payload.fill || item.color;
                    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5", indicator === "dot" && "items-center"), children: formatter && (item === null || item === void 0 ? void 0 : item.value) !== undefined && item.name ? (formatter(item.value, item.name, item, index, item.payload)) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(itemConfig === null || itemConfig === void 0 ? void 0 : itemConfig.icon) ? ((0, jsx_runtime_1.jsx)(itemConfig.icon, {})) : (!hideIndicator && ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
                                        "h-2.5 w-2.5": indicator === "dot",
                                        "w-1": indicator === "line",
                                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                                        "my-0.5": nestLabel && indicator === "dashed",
                                    }), style: {
                                        "--color-bg": indicatorColor,
                                        "--color-border": indicatorColor,
                                    } }))), (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center"), children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid gap-1.5", children: [nestLabel ? tooltipLabel : null, (0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground", children: (itemConfig === null || itemConfig === void 0 ? void 0 : itemConfig.label) || item.name })] }), item.value && ((0, jsx_runtime_1.jsx)("span", { className: "text-foreground font-mono font-medium tabular-nums", children: item.value.toLocaleString() }))] })] })) }, item.dataKey));
                }) })] }));
}
const ChartLegend = RechartsPrimitive.Legend;
exports.ChartLegend = ChartLegend;
function ChartLegendContent({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey, }) {
    const { config } = useChart();
    if (!(payload === null || payload === void 0 ? void 0 : payload.length)) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className), children: payload
            .filter((item) => item.type !== "none")
            .map((item) => {
            const key = `${nameKey || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)("[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"), children: [(itemConfig === null || itemConfig === void 0 ? void 0 : itemConfig.icon) && !hideIcon ? ((0, jsx_runtime_1.jsx)(itemConfig.icon, {})) : ((0, jsx_runtime_1.jsx)("div", { className: "h-2 w-2 shrink-0 rounded-[2px]", style: {
                            backgroundColor: item.color,
                        } })), itemConfig === null || itemConfig === void 0 ? void 0 : itemConfig.label] }, item.value));
        }) }));
}
// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config, payload, key) {
    if (typeof payload !== "object" || payload === null) {
        return undefined;
    }
    const payloadPayload = "payload" in payload &&
        typeof payload.payload === "object" &&
        payload.payload !== null
        ? payload.payload
        : undefined;
    let configLabelKey = key;
    if (key in payload &&
        typeof payload[key] === "string") {
        configLabelKey = payload[key];
    }
    else if (payloadPayload &&
        key in payloadPayload &&
        typeof payloadPayload[key] === "string") {
        configLabelKey = payloadPayload[key];
    }
    return configLabelKey in config
        ? config[configLabelKey]
        : config[key];
}
