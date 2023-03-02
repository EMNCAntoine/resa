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
    /*

    // Initialisation de l'authentification
const msalConfig = {
    auth: {
        clientId: 'a4b505ae-05f8-4199-871a-37cf40a1ecb7',
        redirectUri: 'https://emncantoine.github.io/resa/index.html',
        authority: 'https://login.microsoftonline.com/ba18c5b0-7a13-44c1-97d2-9277ec61a255',
        scopes: ['User.Read', 'Calendars.Read']
    }
};
const msalInstance = new msal.PublicClientApplication(msalConfig);

// Authentification de l'utilisateur
msalInstance.loginPopup()
    .then(authResponse => {
        // Récupération des événements du calendrier
        const requestUrl = 'https://graph.microsoft.com/v1.0/me/events';
        const accessToken = authResponse.accessToken;
        console.log(accessToken);
        const headers = new Headers({
            'Authorization': `Bearer ${accessToken}`
        });

        fetch(requestUrl, { headers })
            .then(response => response.json())
            .then(data => {
                // Traitement des événements
                console.log(data);
            });
    })
    .catch(error => {
        console.log(error);
    });
    */
   // Configuration de l'authentification
const msalConfig = {
    auth: {
      clientId: 'YOUR_CLIENT_ID',
      redirectUri: 'YOUR_REDIRECT_URI',
      authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
  };
  const msalInstance = new msal.PublicClientApplication(msalConfig);
  
  // Récupération des événements du calendrier
  const getUserEvents = async () => {
    const account = msalInstance.getAccount();
    if (!account) {
      throw new Error('Aucun compte utilisateur n\'est connecté.');
    }
  
    const tokenRequest = {
      scopes: ['https://graph.microsoft.com/Calendars.Read'],
      account: account,
    };
  
    try {
      const accessToken = await msalInstance.acquireTokenSilent(tokenRequest);
      const eventsUrl = 'https://graph.microsoft.com/v1.0/users/abourgeois@emn-competences.fr/events';
  
      const response = await fetch(eventsUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Impossible de récupérer les événements.');
      }
  
      const events = await response.json();
      console.log(events.value);
      // Utilisez les données d'événement pour afficher ou traiter les événements de l'utilisateur.
    } catch (error) {
      console.log(error);
    }
  };
  
  // Authentification de l'utilisateur
  msalInstance.loginPopup({
    scopes: ['User.Read'],
  }).then(() => {
    getUserEvents();
  });
  

}