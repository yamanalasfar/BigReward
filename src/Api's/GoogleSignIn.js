import React, { useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';


WebBrowser.maybeCompleteAuthSession();

const GoogleLogIn = async () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig.extra.googleClientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Authentication successful:', authentication);
    }
  }, [response]);

  if (request) {
    await promptAsync();
  } else {
    console.log('Google login not ready');
  }
};

export default GoogleLogIn;
