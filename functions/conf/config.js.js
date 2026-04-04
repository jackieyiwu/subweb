export async function onRequest(context) {
    const { env } = context;

    // 1. Base Configuration
    const siteName = env.SITE_NAME || 'Subconverter Web';
    const shortUrl = env.SHORT_URL || 'https://s.ops.ci';
    const apiUrl = env.API_URL || 'http://127.0.0.1:25500';
    // 解析 ENABLE_SHORT_URL，默认为 true，仅当显式设置为 'false' 时关闭
    const enableShortUrl = (env.ENABLE_SHORT_URL || 'true').toLowerCase() !== 'false';

    // 2. Advanced: API Backends
    // Priority: env.API_BACKENDS (JSON) > env.API_URL (Single Override) > Default List
    let apiBackends = [
        {
            name: 'play4fun',
            url: apiUrl,
        },
        {
            name: 'xeton',
            url: 'https://sub.xeton.dev',
        },
          {
            name: 'asailor',
            url: 'https://https://api.asailor.org/',
        },
    ];

    if (env.API_BACKENDS) {
        try {
            apiBackends = JSON.parse(env.API_BACKENDS);
        } catch (e) {
            console.error('Failed to parse API_BACKENDS', e);
        }
    }

    // 3. Advanced: Remote Config
    // Priority: env.REMOTE_CONFIG (JSON) > Default List
    let remoteConfigOptions = [
        {
            value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini',
            text: 'ACL4SSR Online',
        },
        {
            value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini',
            text: 'ACL4SSR Online Full',
        },
                {
            value: 'https://raw.githubusercontent.com/pzyyll/Custom_OpenClash_Rules/refs/heads/main/cfg/Custom_Clash_Lite.ini',
            text: 'A大轻量',
        },
               {
            value: 'https://github.com/pzyyll/Custom_OpenClash_Rules/blob/main/cfg/Custom_Clash.ini',
            text: 'A大标准',
        },
    ];

    if (env.REMOTE_CONFIG) {
        try {
            remoteConfigOptions = JSON.parse(env.REMOTE_CONFIG);
        } catch (e) {
            console.error('Failed to parse REMOTE_CONFIG', e);
        }
    }

    // 4. Advanced: Menu Items
    // Priority: env.MENU_ITEM (JSON) > Default List
    let menuItem = [
        {
            title: '首页',
            link: '/',
            target: '',
        },
        {
            title: 'GitHub',
            link: 'https://github.com/Aethersailor/subweb',
            target: '_blank',
        },
    ];

    if (env.MENU_ITEM) {
        try {
            menuItem = JSON.parse(env.MENU_ITEM);
        } catch (e) {
            console.error('Failed to parse MENU_ITEM', e);
        }
    }

    // 5. Construct Final Config Object
    const config = {
        siteName: siteName,
        apiBackends: apiBackends,
        enableShortUrl: enableShortUrl,
        shortUrl: shortUrl,
        menuItem: menuItem,
        remoteConfigOptions: remoteConfigOptions,
    };

    const jsContent = `console.log('✅ Configuration loaded from Cloudflare Function'); window.config = ${JSON.stringify(config, null, 2)};`;

    return new Response(jsContent, {
        headers: {
            'content-type': 'application/javascript;charset=UTF-8',
        },
    });
}
