const env = [
    "@babel/env",
    {
      targets: [
        "> 1%",
        "last 2 versions",
        "not ie <= 8"
      ],
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
    