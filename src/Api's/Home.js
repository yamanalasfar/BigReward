const test = async () => {
    const response = await axios.post(
        'https://cashgames.website/api/connect', {
            cc:countryCode
    }, {
            headers: AsyncStorage.getItem('token')
    }
    );
    const data = JSON.parse(response.data.data); 
    console.log(data.offers);
}