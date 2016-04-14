notes for css loader


install as dev  (package.json)
css-loader
style-loader


webpack.config
add in loaders array:

module: {
  loaders: [{
    test: /\.js$/,
    loaders: ['babel-loader'],
    include: path.join(__dirname, 'app')
  },
  {
    test: /\.css$/,
    loader: "style-loader!css-loader"
  }
  ]
}



require("FILE.CSS"); on any component that needs the css
