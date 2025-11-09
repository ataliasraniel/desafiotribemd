import { createRouter, createWebHistory } from 'vue-router';

import SignInPage from '../views/public/signin/SignInPage.vue';
import SignUpPage from '../views/public/signup/SignUpPage.vue';
import IdeasListingPage from '../views/listing/IdeasListingPage.vue';
import IdeaFormPage from '../views/form/IdeaFormPage.vue';
import ProfilePage from '../views/profile/ProfilePage.vue';
//@ts-ignore
import DefaultLayout from '../layouts/DefaultLayout.vue';

const routes = [
    {
        path: '/', component: DefaultLayout,
        redirect: '/listing',

        children: [
            { path: '/listing', component: IdeasListingPage },
            { path: '/form', component: IdeaFormPage },
            { path: '/form/:id', component: IdeaFormPage },
            { path: '/profile', component: ProfilePage }
        ]
    },
    { path: '/signin', component: SignInPage },
    { path: '/signup', component: SignUpPage },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router