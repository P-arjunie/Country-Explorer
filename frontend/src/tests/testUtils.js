//mock country data
export const mockCountryData = [
  {
    name: { common: 'India' },
    flags: { png: 'india-flag.png', svg: 'india-flag.svg' },
    population: 1000000,
    region: 'Asia',
    capital: ['New Delhi'],
    cca3: 'IND',
    languages: { hin: 'Hindi', eng: 'English' },
    currencies: { INR: { name: 'Indian Rupee' } }
  }
];

//setup fetch mock
export const setupFetchMock = () => {
  global.fetch = jest.fn((url) => {
    //if the url includes /all, return the mock country data
    if (url.includes('/all')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCountryData)
      });
    }
    //if the url includes /region, return the mock country data filtered by the region
    if (url.includes('/region')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCountryData.filter(c => c.region === url.split('/').pop()))
      });
    }
    //if the url includes /alpha, return the mock country data filtered by the alpha code
    if (url.includes('/alpha')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockCountryData[0]])
      });
    }
    //if the url does not include /all, /region, or /alpha, return an empty array
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([])
    });
  });
};
