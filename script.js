const app = Vue.createApp({
    components: {
        'imports': Vue.defineAsyncComponent( () => loadModule('imports.vue', options) ),
        'hero-cover': Vue.defineAsyncComponent( () => loadModule('heroCover.vue', options) ),
        'game': Vue.defineAsyncComponent( () => loadModule('game.vue', options) ),
        'api': Vue.defineAsyncComponent( () => loadModule('api.vue', options) ),
    },

    data: function() {
        return {
            homePageResources: {
                title: "Dynamic Website Replica",
                showName: false,
                show: localStorage.getItem('show'),
                disabled: 0,
                userName: localStorage.getItem('username'),
            },

            gamePageResources: {
                title: "How many...?",
                question: "",
            },

            apiPageResources: {
                title: "True/false question",
            },
        }
    },
    methods: {
        login() {
            localStorage.setItem('username', this.homePageResources.userName);
            localStorage.setItem('show', this.homePageResources.showName);
            // console.log(this.homePageResources.userName)
            console.log(localStorage.getItem('username'));
        },

        //   For changing value of username for global var 
        change() {
            localStorage.setItem('show', this.homePageResources.showName);
        },
    },
})

async function fetchURL(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}