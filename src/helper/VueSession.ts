/* eslint-disable */
let STORAGE: any = null;
const VueSession: any = {
    key: 'brojenuel-session-key',
    flash_key: 'brojenuel-session-flash-key',
    setAll: function(all: any){
        STORAGE.setItem(VueSession.key,JSON.stringify(all));
    }
}

VueSession.install = (app: any, options: any) => {
    if(options && 'persist' in options && options.persist) STORAGE = window.localStorage;
    else STORAGE = window.sessionStorage;
    app.config.globalProperties.$session = {
        flash: {
            parent: function(){
                return app.config.globalProperties.$session;
            },
            get: function(key: string){
                const all = this.parent().getAll();
                const all_flash = all[VueSession.flash_key] || {};

                const flash_value = all_flash[key];

                this.remove(key);

                return flash_value;
            },
            set: function(key: string, value: any){
                const all = this.parent().getAll();
                const all_flash = all[VueSession.flash_key] || {};

                all_flash[key] = value;
                all[VueSession.flash_key] = all_flash;

                VueSession.setAll(all);
            },
            remove: function(key: string){
                const all = this.parent().getAll();
                const all_flash = all[VueSession.flash_key] || {};

                delete all_flash[key];

                all[VueSession.flash_key] = all_flash;
                VueSession.setAll(all);
            }
        },
        getAll: function(){
            const all = JSON.parse(STORAGE.getItem(VueSession.key));
            return all || {};
        },
        set: function(key: string,value: any){
            if(key == 'session-id') return false;
            let all = this.getAll();

            if(!('session-id' in all)){
                this.start();
                all = this.getAll();
            }

            all[key] = value;

            VueSession.setAll(all);
        },
        get: function(key: string){
            const all = this.getAll();
            return all[key];
        },
        start: function(){
            const all = this.getAll();
            all['session-id'] = 'sess:'+Date.now();

            VueSession.setAll(all);
        },
        renew: function(sessionId: string){
            const all = this.getAll();
            all['session-id'] = 'sess:' + sessionId;
            VueSession.setAll(all);
        },
        exists: function(){
            const all = this.getAll();
            return 'session-id' in all;
        },
        has: function(key: string){
            const all = this.getAll();
            return key in all;
        },
        remove: function(key: string){
            const all = this.getAll();
            delete all[key];

            VueSession.setAll(all);
        },
        clear: function(){
            const all = this.getAll();

            VueSession.setAll({'session-id': all['session-id']});
        },
        destroy: function(){
            VueSession.setAll({});
        },
        id: function(){
            return this.get('session-id');
        }
    }
    
};

export default VueSession;