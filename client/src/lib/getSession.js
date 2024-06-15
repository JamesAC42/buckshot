export async function getSession() {

    const response = await fetch('/api/getSession');
    const data = await response.json();
    return data;

}