import { createInertiaApp } from "@inertiajs/inertia-react";
import { render } from "react-dom";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        render(<App {...props} />, el);
    },
});
