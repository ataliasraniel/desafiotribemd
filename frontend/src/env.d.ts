/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare global {
    interface IdeaModel {
        id: number;
        title: string;
        user_id: number;
        description: string | null;
        votes: number;
        author_name: string;
        has_voted: boolean;
        created_at: string;
        updated_at: string;
    }
}

export { }

