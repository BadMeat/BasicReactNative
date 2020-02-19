import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer nEP-GCLQvOu08IdJiFTNAdet8fWNvn_aIq_zryI-NSdkMSOiFJzJO-EJ348gISWznTsSfcr1F9lYYRBF4fSBTWlo-xBI-liGZaW5u8yV-5I4Sejq7O2lp8UrNTNBXnYx'
    }
})