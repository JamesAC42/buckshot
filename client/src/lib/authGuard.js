import { userStore } from '../stores/stores';
import { goto } from '$app/navigation';

export async function authGuard() {
    let user = null;

    const unsubscribe = userStore.subscribe(value => {
        user = value;
    });

    if (!user) {
        // User is not logged in, redirect to the login page
        unsubscribe();
        await goto('/login');
        return null;
    }

    unsubscribe();
    return user;
}