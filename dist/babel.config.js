"use strict";
module.exports = (api) => {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module:react-native-dotenv',
                {
                    envName: 'APP_ENV',
                    moduleName: '@env',
                    path: '.env',
                    blocklist: null,
                    allowlist: null,
                    blacklist: null,
                    whitelist: null,
                    safe: false,
                    allowUndefined: true,
                    verbose: false
                }
            ],
            [
                'module-resolver',
                {
                    root: ['./dist/'],
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
                }
            ]
        ]
    };
};
