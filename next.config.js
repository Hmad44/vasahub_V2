/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'scontent-atl3-1.xx.fbcdn.net'
            },
            {
                protocol: 'https',
                hostname: 'www.childcareawareky.org'
            },
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.flaticon.com'
            },
            {
                protocol: 'https',
                hostname: 'media.istockphoto.com'
            }, 
        ]
    }
}

module.exports = nextConfig
