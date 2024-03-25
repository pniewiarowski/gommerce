interface CookiesAPI {
    set: Function;
    get: Function;
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
    };
};

export default useCookies;
