function afficherCase(id)
{
    if(id.checked)
    {
        document.getElementById('label_nom_pass').style.display="inline";
        document.getElementById('input_nom_pass').style.display="inline";
        //console.log('oui');
    }
    else
    {
        document.getElementById('label_nom_pass').style.display="none";
        document.getElementById('input_nom_pass').style.display="none";
        //console.log('non');
    }
}

function horsCampus()
{
    var selectElmt = document.getElementById('lieu_arrivee');
    //console.log(selectElmt);
    var valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value;
    //console.log(valeurselectionnee);
    var textselectionne = selectElmt.options[selectElmt.selectedIndex].text;
    //console.log(textselectionne);
    if(textselectionne == "Hors campus")
    {
        //console.log('oui');
        document.getElementById('label_adr_hc').style.display="inline";
        document.getElementById('input_adr_hc').style.display="inline";
    }
    else
    {
        //console.log('non');
        document.getElementById('label_adr_hc').style.display="none";
        document.getElementById('input_adr_hc').style.display="none";
    }
}

function resa()
{
  const msalConfig = {
    auth: {
        clientId: 'a4b505ae-05f8-4199-871a-37cf40a1ecb7',
        // comment out if you use a multi-tenant AAD app
        authority: 'https://login.microsoftonline.com/ba18c5b0-7a13-44c1-97d2-9277ec61a255',
        redirectUri: 'https://emncantoine.github.io/resa/'
    }
};
const msalRequest = { scopes: [] };
function ensureScope (scope) {
    if (!msalRequest.scopes.some((s) => s.toLowerCase() === scope.toLowerCase())) {
        msalRequest.scopes.push(scope);
    }
}
//Initialize MSAL client
const msalClient = new msal.PublicClientApplication(msalConfig);

// Log the user in
async function signIn() {
    const authResult = await msalClient.loginPopup(msalRequest);
    sessionStorage.setItem('msalAccount', authResult.account.username);
}
//Get token from Graph
async function getToken() {
    let account = sessionStorage.getItem('msalAccount');
    if (!account) {
        throw new Error(
            'User info cleared from session. Please sign out and sign in again.');
    }
    try {
        // First, attempt to get the token silently
        const silentRequest = {
            scopes: msalRequest.scopes,
            account: msalClient.getAccountByUsername(account)
        };

        const silentResult = await msalClient.acquireTokenSilent(silentRequest);
        return silentResult.accessToken;
    } catch (silentError) {
        // If silent requests fails with InteractionRequiredAuthError,
        // attempt to get the token interactively
        if (silentError instanceof msal.InteractionRequiredAuthError) {
            const interactiveResult = await msalClient.acquireTokenPopup(msalRequest);
            return interactiveResult.accessToken;
        } else {
            throw silentError;
        }
    }
}
}