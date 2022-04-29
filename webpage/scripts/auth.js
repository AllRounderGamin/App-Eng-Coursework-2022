let auth0 = null;

const fetchAuthConfig = () => fetch("/auth_config.json");

export async function configureClient() {
    const response = await fetchAuthConfig();
    const config = await response.json();
    auth0 = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
    });
}

async function updateUI() {
    const authenticated = await auth0.isAuthenticated();
    document.querySelector("#logout").disabled = !authenticated;
    document.querySelector("#login").disabled = authenticated;
}

async function handleRedirect() {
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        await auth0.handleRedirectCallback();
        window.history.replaceState(null, document.title, "/");
    }
    await updateUI();
}

async function login() {
    await auth0.loginWithRedirect({redirect_uri: window.location.origin});
}

async function logout() {
    await auth0.logout({returnTo: window.location.origin});
}

async function loadScripts() {
    await configureClient();
    await updateUI();
    await handleRedirect();
}


window.addEventListener("load", loadScripts);
document.querySelector("#login").addEventListener("click", login);
document.querySelector("#logout").addEventListener("click", logout);
