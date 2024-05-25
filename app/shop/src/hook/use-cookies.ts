interface CookiesAPI {
    set: Function;
    get: Function;
    clear: Function;
}

const useCookies = (): CookiesAPI => {
    return {
        set: (key: string, value: string): void => {
            document.cookie = `${key}=${value}`;
        },
        get: (key: string): string => {
            const name = `${key}=`;
            const decoded = decodeURIComponent(document.cookie);
            const all = decoded.split(";");
            for (let i = 0; i < all.length; i++) {
                let cookie = all[i];
                while (cookie.charAt(0) == " ") {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf(name) == 0) {
                    return cookie.substring(name.length, cookie.length);
                }
            }

            return "";
        },
        clear: () => {
            const cookies = document.cookie.split(";");

            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        },
    };
};

export default useCookies;
