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

// const handleGoogleSignin = async () => {
//   try {
//     //setLoading(true);
//     await GoogleLogIn();
//     //setLoading(false);
//   } catch (error) {
//     //setLoading(false);
//     Alert.alert('Error', 'There was an issue logging in with Google.');
//   }
// };

// const webClientId = '205060029443-ulha13efg3gcc9fqs39sjp23e5lfil9b.apps.googleusercontent.com';
// const androidClientId = '205060029443-14tufk1h91sbe58n3ckl75epbk31hp62.apps.googleusercontent.com';
// WebBrowser.maybeCompleteAuthSession();
// const config = {
//   webClientId,
//   androidClientId
// }
// const [request, response, promptAsync] = Google.useAuthRequest(config);
// const handleToken = () => {
//   if (response?.type === "success") {
//       const { authentication } = response;
//       const token = authentication?.accessToken;
//       console.log("access token",token);
//   }
// }
// useEffect(() => {
//   handleToken();
// },[response])   