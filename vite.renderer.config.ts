import react from "@vitejs/plugin-react";
import type {ConfigEnv, UserConfig} from 'vite';
import {defineConfig} from 'vite';
import {ViteImageOptimizer} from "vite-plugin-image-optimizer";
import {nodePolyfills} from "vite-plugin-node-polyfills";
import {pluginExposeRenderer} from './vite.base.config';

// https://vitejs.dev/config
export default defineConfig((env) => {
    const forgeEnv = env as ConfigEnv<'renderer'>;
    const {root, mode, forgeConfigSelf} = forgeEnv;
    const name = forgeConfigSelf.name ?? '';

    return {
        root,
        mode,
        base: './',
        build: {
            outDir: `.vite/renderer/${name}`,
        },
        plugins: [
            pluginExposeRenderer(name),
            react(),
            ViteImageOptimizer(),
            nodePolyfills({
                globals: {
                    Buffer: true,
                    global: true,
                    process: true,
                },
            })
        ],
        resolve: {
            preserveSymlinks: true,
        },
        clearScreen: false,
    } as UserConfig;
});
