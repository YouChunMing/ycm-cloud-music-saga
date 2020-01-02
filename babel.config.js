const env = [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      modules: false,
      useBuiltIns: "usage",
      "corejs":  { 
        version: 3, 
        proposals: true
      }
    }
  ];
  
  const env_test = [
    "@babel/env",
    {
      targets: {
        node: 'current',
      },
    }
  ];
  
  module.exports = api => {
    
    let presets = [];
  
    const isTest = api.env('test');
  
    if(isTest){
      presets.push(env_test);
    }
    else{
      presets.push(env);
    }
  
    return {
      presets
    }
  
  };
    