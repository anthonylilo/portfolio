import { createInertiaApp } from "@inertiajs/inertia-react";
import { render } from "react-dom";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import AdminLayout from "./Pages/admin/Admin";

createInertiaApp({
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./${name}.jsx`,
            import.meta.glob(["./Pages/**/*.jsx", "./components/**/*.jsx"])
        );
        page.default.layout =
            page.default.layout ||
            ((page) => <AdminLayout>{page}</AdminLayout>);

        return page;
    },
    setup({ el, App, props }) {
        render(<App {...props} />, el);
    },
});
