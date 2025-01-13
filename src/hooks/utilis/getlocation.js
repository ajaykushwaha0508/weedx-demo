import axios from 'axios';
import { modifystr } from './commonfunction';
const _ = require('lodash')
import Cookies from 'universal-cookie';

async function postData(createurl, value, address, id) {
  const url = `https://api.cannabaze.com/UserPanel/Update-SiteMap/${id}`;
  const data = {
    j: createurl,
    address: value,
    formate: ", " + address
  };

  try {
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(data) 
    });
    const l = await response.json()

  } catch (error) {
    console.error('Error:', error);
  }
}

function splitAtFirstComma(str) {

  const commaIndex = str.indexOf(',');

  if (commaIndex === -1) {
    return [str];
  }

  const beforeComma = str.slice(0, commaIndex);
  const afterComma = str.slice(commaIndex + 1).trim(); 

  return [beforeComma, afterComma];
}

async function location(value, type, data, id, weburl) {
  let city = "", state = "", country = "", route = "", formatted_address;
  let citycode = "", statecode = "", countrycode = "";
  let ci = ""
  const object = {}
  const short = {}
  const find = await axios.get(`https://api.cannabaze.com/UserPanel/Get-SitemapbyId/${id}`)
  const urls = find.data[0].Xml
  const target = `http://www.weedx.io${data.resolvedUrl}`;
  const matchedUrl = _.find(urls, url => {
    const cleanedUrl = url.split(',')[0].trim();
    return cleanedUrl === target;
  });
  if (matchedUrl) {
    const formateAddresing = splitAtFirstComma(matchedUrl)[1];
    if (!formateAddresing) {
      const response = await fetch(`http://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU`);
      const data = await response.json();
      if (data.error_message) {
        return {
          city: 'New-York' || "",
          state: "New-York" || "",
          country: "United-States" || "",
          formatted_address: type.formatted_address || "New York, NY, USA",
          citycode: "",
          statecode: "NY",
          countrycode: "US",
          api: false,
          cookies: "notnaivigation"

        };
      }
      else {

        const addressComponents = data.results[0].address_components || [];
        formatted_address = data?.results[0]?.formatted_address;

        addressComponents.map((data) => {
          let l = data.types[0]
          if (data.types[0] === "political") {
            let rever = data.types.reverse()
            let l = rever[0]
            object[l] = data.long_name
            short[l] = data?.short_name
          }
          else {

            object[l] = data.long_name
            short[l] = data?.short_name
          }
        })

        if (Boolean(object.country)) {
          let Coun = object.country.replace(/\s/g, '-');
          // dispatch({ type: 'Country', Country: Coun });
          // dispatch({ type: 'countrycode', countrycode: short.country });
          country = Coun
          countrycode = short.country
        }
        else if (Object.keys(object).length === 1) {
          let Coun = Object.values(object)[0].replace(/\s/g, '-');
          country = Coun
          countrycode = short.country
        }
        if (Boolean(object.administrative_area_level_1)) {

          let sta = object.administrative_area_level_1.replace(/\s/g, '-');

          statecode = short.administrative_area_level_1
          state = sta

        }
        if (Boolean(object.administrative_area_level_3) || Boolean(object.establishment) || Boolean(object.locality) || Boolean(object.sublocality) || Boolean(object.administrative_area_level_2)) {

          if (Boolean(object.administrative_area_level_3)) {
            ci = object.administrative_area_level_3.replace(/\s/g, '-')

            citycode = short.administrative_area_level_3
            city = ci
          }
          if (Boolean(object.sublocality) && Boolean(object.locality)) {
            ci = object.sublocality.replace(/\s/g, '-')
            citycode = short.sublocality
            city = ci
          }
          else if (Boolean(object.locality)) {
            ci = object.locality.replace(/\s/g, '-')
            citycode = short.locality
            city = ci
          }
          else if (Object.keys(object).length !== 1 && Boolean(object.establishment)) {
            ci = object.establishment.replace(/\s/g, '-')
            citycode = short.establishment
            city = ci
          }
          else if (Boolean(object.sublocality_level_1)) {
            ci = object.sublocality_level_1.replace(/\s/g, '-')
            citycode = short.sublocality_level_1
            city = ci
          }

          if (Boolean(object.sublocality_level_1) && Boolean(object.locality)) {
            ci = object.sublocality_level_1.replace(/\s/g, '-')
            citycode = short.sublocality_level_1
            city = ci
          }
          if (Boolean(object.sublocality_level_1) && Boolean(object.locality)) {
            ci = object.sublocality_level_1.replace(/\s/g, '-')
            citycode = short.sublocality_level_1
            city = ci
          }
          if ((Boolean(object.administrative_area_level_3) && Boolean(object.locality)) && (Boolean(object.administrative_area_level_1) && Boolean(object.locality))) {
            ci = object.locality.replace(/\s/g, '-')
            citycode = short.locality
            city = ci
          }
          else {
            if (!Boolean(object.administrative_area_level_3) && !Boolean(object.establishment) && !Boolean(object.locality) && !Boolean(object.sublocality) && Boolean(object.administrative_area_level_2)) {
              if (!ci) {
                ci = object.administrative_area_level_2.replace(/\s/g, '-')
                citycode = short.administrative_area_level_2
                city = ci
              }
            }
          }

        }
        if (Boolean(object.route) || Boolean(object.sublocality_level_2) || Boolean(object.neighborhood) || Boolean(object.establishment)) {
          if (Boolean(object.route)) {
            route = object.route.replace(/\s/g, '-');
            // dispatch({ type: 'route', route: route });
          }
          else if (Boolean(object.sublocality)) {
            route = object.sublocality.replace(/\s/g, '-');
            // dispatch({ type: 'route', route: route });
          }
          else if (Boolean(object.neighborhood)) {
            route = object.neighborhood.replace(/\s/g, '-');
            // dispatch({ type: 'route', route: route });
          }
          else if (Boolean(object.establishment)) {
            route = object.establishment.replace(/\s/g, '-');
            // dispatch({ type: 'route', route: route });
          }
          else if (Boolean(object.sublocality_level_2)) {
            route = object.sublocality_level_2.replace(/\s/g, '-');
            // dispatch({ type: 'route', route: route });
          }

        }
        const createurl = Boolean(route) ? `http://www.weedx.io/weed-${weburl}/in/${modifystr(country)}/${modifystr(state)}/${modifystr(city)}/${modifystr(route)}`
          : Boolean(city) ? `http://www.weedx.io/weed-${weburl}/in/${modifystr(country)}/${modifystr(state)}/${modifystr(city)}`
            : Boolean(state) ? `http://www.weedx.io/weed-${weburl}/in/${modifystr(country)}/${modifystr(state)}`
              : Boolean(country) && `http://www.weedx.io/weed-${weburl}/in/${modifystr(country)}`
        await postData(createurl, false, formatted_address, id)

        return {
          city,
          state,
          country,
          route,
          citycode,
          statecode,
          countrycode,
          formatted_address,
          api: true,
          cookies: "notnaivigation"
        };
      }

    }
    else {

      return {
        city: type.city || "",
        state: type.state || "",
        country: type.country || "",
        route: type.route || '',
        formatted_address: formateAddresing,
        api: true,
        cookies: "notnaivigation"

      };
    }
  }
  else {
    const response = await fetch(`http://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU`);
    const data = await response.json();
    if (data.error_message) {
      console.warn(data.error_message)
      return {
        city: 'New-York' || "",
        state: "New-York" || "",
        country: "United-States" || "",
        route: '',
        formatted_address: type.formatted_address || "New York, NY, USA",
        citycode: "",
        statecode: "NY",
        countrycode: "US",
        api: false,
        cookies: "notnaivigation"

      };
    }
    else {
      const addressComponents = data.results[0].address_components || [];
      formatted_address = data?.results[0]?.formatted_address;

      addressComponents.map((data) => {
        let l = data.types[0]
        if (data.types[0] === "political") {
          let rever = data.types.reverse()
          let l = rever[0] === "political" ? rever[1] : rever[0]
          object[l] = data.long_name
          short[l] = data?.short_name
        }
        else {

          object[l] = data.long_name
          short[l] = data?.short_name
        }
      })

      if (Boolean(object.country)) {
        let Coun = object.country.replace(/\s/g, '-');
        // dispatch({ type: 'Country', Country: Coun });
        // dispatch({ type: 'countrycode', countrycode: short.country });
        country = Coun
        countrycode = short.country
      }
      else if (Object.keys(object).length === 1) {
        let Coun = Object.values(object)[0].replace(/\s/g, '-');
        country = Coun
        countrycode = short.country
      }
      if (Boolean(object.administrative_area_level_1)) {

        let sta = object.administrative_area_level_1.replace(/\s/g, '-');

        statecode = short.administrative_area_level_1
        state = sta

      }
      if (Boolean(object.administrative_area_level_3) || Boolean(object.establishment) || Boolean(object.locality) || Boolean(object.sublocality) || Boolean(object.administrative_area_level_2)) {

        if (Boolean(object.administrative_area_level_3)) {
          ci = object.administrative_area_level_3.replace(/\s/g, '-')

          citycode = short.administrative_area_level_3
          city = ci
        }
        if (Boolean(object.sublocality) && Boolean(object.locality)) {
          ci = object.sublocality.replace(/\s/g, '-')
          citycode = short.sublocality
          city = ci
        }
        else if (Boolean(object.locality)) {
          ci = object.locality.replace(/\s/g, '-')
          citycode = short.locality
          city = ci
        }
        else if (Object.keys(object).length !== 1 && Boolean(object.establishment)) {
          ci = object.establishment.replace(/\s/g, '-')
          citycode = short.establishment
          city = ci
        }
        else if (Boolean(object.sublocality_level_1)) {
          ci = object.sublocality_level_1.replace(/\s/g, '-')
          citycode = short.sublocality_level_1
          city = ci
        }

        if (Boolean(object.sublocality_level_1) && Boolean(object.locality)) {
          ci = object.sublocality_level_1.replace(/\s/g, '-')
          citycode = short.sublocality_level_1
          city = ci
        }
        if (Boolean(object.sublocality_level_1) && Boolean(object.locality)) {
          ci = object.sublocality_level_1.replace(/\s/g, '-')
          citycode = short.sublocality_level_1
          city = ci
        }
        if ((Boolean(object.administrative_area_level_3) && Boolean(object.locality)) && (Boolean(object.administrative_area_level_1) && Boolean(object.locality))) {
          ci = object.locality.replace(/\s/g, '-')
          citycode = short.locality
          city = ci
        }
        else {
          if (!Boolean(object.administrative_area_level_3) && !Boolean(object.establishment) && !Boolean(object.locality) && !Boolean(object.sublocality) && Boolean(object.administrative_area_level_2)) {
            if (!ci) {
              ci = object.administrative_area_level_2.replace(/\s/g, '-')
              citycode = short.administrative_area_level_2
              city = ci
            }
          }
        }

      }
      if (Boolean(object.route) || Boolean(object.sublocality_level_2) || Boolean(object.neighborhood) || Boolean(object.establishment)) {
        if (Boolean(object.route)) {
          route = object.route.replace(/\s/g, '-');
          // dispatch({ type: 'route', route: route });
        }
        else if (Boolean(object.sublocality)) {
          route = object.sublocality.replace(/\s/g, '-');
          // dispatch({ type: 'route', route: route });
        }
        else if (Boolean(object.neighborhood)) {
          route = object.neighborhood.replace(/\s/g, '-');
          // dispatch({ type: 'route', route: route });
        }
        else if (Boolean(object.establishment)) {
          route = object.establishment.replace(/\s/g, '-');
          // dispatch({ type: 'route', route: route });
        }
        else if (Boolean(object.sublocality_level_2)) {
          route = object.sublocality_level_2.replace(/\s/g, '-');
          // dispatch({ type: 'route', route: route });
        }

      }
      const createurl = Boolean(route) ? `http://www.weedx.io/weed-${weburl}/in/${modifystr(country)}/${modifystr(state)}/${modifystr(city)}/${modifystr(route)}`
        : Boolean(city) ? `http://www.weedx.io/weed-${weburl}/in/${modifystr(country)}/${modifystr(state)}/${modifystr(city)}`
          : Boolean(state) ? `http://www.weedx.io/weed-${weburl}/in/${modifystr(country)}/${modifystr(state)}`
            : Boolean(country) && `http://www.weedx.io/weed-${weburl}/in/${modifystr(country)}`
      await postData(createurl, false, formatted_address, id)
      return {
        city,
        state,
        country,
        route,
        citycode,
        statecode,
        countrycode,
        formatted_address,
        api: true,
        cookies: "navigate"
      };
    }
  }
}

export default location;

