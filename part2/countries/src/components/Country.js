import Weather from './Weather'

const filterCountries = (searchTerm, countryList) => {
    console.log('countryList', countryList)
    console.log('searchTerm', searchTerm)
    const filteredCountries = countryList.filter(x => x.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    console.log('filtered countries', filteredCountries)
    return filteredCountries
}

const Country = ({searchTerm, countryList, selectedCountry, setSelectedCountry}) => {

    const filteredCountries = filterCountries(searchTerm, countryList)

    console.log('filtered to ', filteredCountries.length, 'countries')

    if (selectedCountry !== null) {
        const country = selectedCountry

        console.log('language', country.languages)

        const languages = Object.values(country.languages).map((language) => {return <li>{language}</li>})
        const capital = country.capital[0]
        const [lat, lon] = country.capitalInfo.latlng

        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>
                    <p>Capital: {capital}</p>
                    <p>Area: {country.area}m<sup>2</sup></p>
                </div>
                <div>
                    <b>Languages:</b>
                    <ul>{languages}</ul>
                </div>
                <img src={country.flags.svg} width='300px'/>
                <Weather capital={capital} lat={lat} lon={lon}/>
            </div>
            )
    }

    if (filteredCountries.length <= 10) {
        const countries = filteredCountries.map((x) => {
            return <li>{x.name.common}<button onClick={() => setSelectedCountry(x)}>Select</button></li>
        })
        return <ul>{countries}</ul>
    }

    return <p>Too many results: Refine search</p>
}

export default Country