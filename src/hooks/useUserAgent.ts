import { useEffect, useState } from 'react'

const useUserAgent = () => {
    const [ipAddress, setIpAddress] = useState<string | undefined>(undefined)

    useEffect(() => {
        let isMounted = true

        const fetchPublicIp = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json', {
                    headers: {
                        Accept: 'application/json',
                    },
                })

                if (!response.ok) {
                    return
                }

                const data = (await response.json()) as { ip?: string }
                if (isMounted && typeof data.ip === 'string') {
                    setIpAddress(data.ip)
                }
            } catch {
                // Ignore IP lookup failures; browsers do not expose the client IP directly.
            }
        }

        void fetchPublicIp()

        return () => {
            isMounted = false
        }
    }, [])

    const userAgent = typeof navigator !== 'undefined'
        ? navigator.userAgent || navigator.vendor || (typeof window !== 'undefined'
            ? (window as Window & typeof globalThis & { opera?: string }).opera || ''
            : '')
        : ''

    const isMobile = /android|avantgo|blackberry|iemobile|ipad|iphone|ipod|opera mini|palmos|webos/i.test(userAgent)
    const isTablet = /ipad|tablet|(android(?!.*mobile))/i.test(userAgent)
    const isDesktop = !isMobile && !isTablet
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && typeof window !== 'undefined' && !(window as Window & { MSStream?: unknown }).MSStream
    const isAndroid = /android/i.test(userAgent)
    const isWindows = /windows/i.test(userAgent)
    const isMac = /macintosh|mac os x/i.test(userAgent)
    const isLinux = /linux/i.test(userAgent)
    const isChrome = /chrome|crios/i.test(userAgent) && !/edge|edg|opr|opera/i.test(userAgent)
    const isFirefox = /firefox|fxios/i.test(userAgent)
    const isSafari = /safari/i.test(userAgent) && !/chrome|crios|edge|edg|opr|opera/i.test(userAgent)
    const isEdge = /edge|edg/i.test(userAgent)
    const isOpera = /opera|opr/i.test(userAgent)
    const isIE = /msie|trident/i.test(userAgent)

    const userAgentData = {
        userAgent,
        IPAddress: ipAddress,
        platform: isMobile ? 'mobile' : isTablet ? 'tablet' : isDesktop ? 'desktop' : 'unknown',
        os: isIOS ? 'iOS' : isAndroid ? 'Android' : isWindows ? 'Windows' : isMac ? 'Mac' : isLinux ? 'Linux' : 'unknown',
        browser: isChrome ? 'Chrome' : isFirefox ? 'Firefox' : isSafari ? 'Safari' : isEdge ? 'Edge' : isOpera ? 'Opera' : isIE ? 'Internet Explorer' : 'unknown',
    }

    return {
        userAgent,
        ipAddress,
        isMobile,
        isTablet,
        isDesktop,
        isIOS,
        isAndroid,
        isWindows,
        isMac,
        isLinux,
        isChrome,
        isFirefox,
        isSafari,
        isEdge,
        isOpera,
        isIE,
        userAgentData,
    }
}

export default useUserAgent