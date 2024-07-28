import react from '@vitejs/plugin-react';
import type {ConfigEnv, UserConfig} from 'vite';
import {defineConfig, mergeConfig} from 'vite';
import {ViteImageOptimizer} from "vite-plugin-image-optimizer";
import {nodePolyfills} from "vite-plugin-node-polyfills";
import {external, getBuildConfig, getBuildDefine, pluginHotRestart} from './vite.base.config';

// https://vitejs.dev/config
export default defineConfig((env) => {
    const forgeEnv = env as ConfigEnv<'build'>;
    const {forgeConfigSelf} = forgeEnv;
    const define = getBuildDefine(forgeEnv);
    const config: UserConfig = {
        build: {
            lib: {
                entry: forgeConfigSelf.entry!,
                fileName: () => '[name].js',
                formats: ['cjs'],
            },
            rollupOptions: {
                external,
            },
        },
        plugins: [
            pluginHotRestart('restart'),
        ],
        define,
        resolve: {
            // Load the Node.js entry.
            mainFields: ['module', 'jsnext:main', 'jsnext'],
        },
    };

    return mergeConfig(getBuildConfig(forgeEnv), config);
});
