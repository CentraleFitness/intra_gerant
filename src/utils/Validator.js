class Validator {

    static name(text) {
        let regex = new RegExp('^[a-z éàèïëäêâî,.\'-]+$','i');
        return regex.test(text);
    }

    static description(text) {
        return (text.length >= 1);
    }

    static address(text) {
        let regex = new RegExp('^[a-z0-9 ,.\'-]+$','i');
        return regex.test(text);
    }

    static email(text) {
        /* Trouver mieux ! */
        //let regex = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$','g');
        let regex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
        return regex.test(text);
    }

    static phoneNumber(text) {
        let regex = new RegExp('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$','im');
        return regex.test(text);
    }

    static zipCode(text) {
        let regex = new RegExp('^[0-9]{5}$','i');
        return regex.test(text);
    }

    static password(text) {
        /* Essayer de rajouter d'autre char comme - _ ( ) { } [ ] ... */
        //let regex = new RegExp('^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$','g');
        let regex = new RegExp('^(?=.*\\d)(?=.*[!@#\\$%_\\-\\(\\)\\{\\}\\[\\];,/&\\*\\+\\?\\.:])(?=.*[a-z])(?=.*[A-Z]).{8,}$','g');
        return regex.test(text);
    }

    static date(date) {
        return (date !== "");
    }

    static siret(siret) {
        let nb = 0;
        for (let i = 0; i < siret.length; ++i) {
            if (siret[i] !== ' ' && !isNaN(siret[i])) {
                ++nb;
            } else if (siret[i] !== ' ') {
                return false;
            }
        }
        return nb === 14;
    }
}

export default Validator;