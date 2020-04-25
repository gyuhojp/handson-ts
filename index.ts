import axios = require('axios');
export namespace ColorAPI { 
  type RGB = { 
    [P in 'r' | 'g' | 'b']: number;
  }; 
 
  type HSL = { 
    [P in 'h' | 's' | 'l']: number; 
  }; 
 
  type HSV = { 
    [P in 'h' | 's' | 'v']: number; 
  }; 
 
  type CMYK = { 
    [P in 'c' | 'm' | 'y' | 'k']: number; 
  }; 
 
  type XYZ = { 
    [P in 'x' | 'y' | 'z']: number; 
  }; 
 
  type ColorName = { 
    value: string, 
    closest_named_hex: string, 
    exact_match_name: boolean, 
    distance: number,
  }; 
 
  type ColorExpression<T> = T & { 'fraction': T, 'value': string };

  export interface IGetColorIdResponse200 { 
    'hex': { 
      'value': string, 
      'clean': string, 
    }; 
 
    'rgb':  ColorExpression<RGB>;
    'hsl':  ColorExpression<HSL>;
    'hsv':  ColorExpression<HSV>;
    'cmyk': ColorExpression<CMYK>;
    'XYZ':  ColorExpression<XYZ>;
 
    'name': ColorName; 
 
    'image': { 
      'bare': string, 
      'named': string, 
    }; 
 
    'contrast': { 
      'value': string, 
    }; 
 
    '_links': { 
      'self': { 
        'href': string,
      }, 
    }; 
     
    '_embedded': {} | any; 
  } 

  export interface IGetColorIdResponse400 {
    'code': 400;
    'message': string;
    'query': {};
    'params': any;
    'path': '/id';
    'example': string;
  }
}

(async () => {
  const res = await axios.default.get('http://www.thecolorapi.com/id', {
    params: {
      hex: '000000',
    },
  }).catch(handleErr);
  if (res.data.code === 400) {
    const err400: ColorAPI.IGetColorIdResponse400 = res.data;
    console.error(`Error: ${err400.message}\nExample: ${err400.example}`);
  } else {
    const resp: ColorAPI.IGetColorIdResponse200 = res.data;
    console.log(`${resp.hsv.value} <=> ${resp.rgb.value}`);
  }
})();
function handleErr(err: any): never {
  console.error('Error on API request.');
  return process.exit(1);
}
