import fetch from "isomorphic-fetch";


export default function determineLocation(addressQuery, geo) {

    let url = `https://geolocation-yl3tx7rxya-uc.a.run.app/?l=${addressQuery}&geo=${geo}`

    return fetch(url)
        .then(response => response.json())
        .then(responseData => {


            let latLong;
            if (responseData && responseData.lat) {
                //console.log(responseData[0])

                latLong = {
                    formattedAddress: addressQuery,
                    lat: responseData.lat,
                    long: responseData.long
                };

            } else {
                latLong = {
                    lat: "",
                    long: ""
                };
            }
            return latLong;
        });
}
