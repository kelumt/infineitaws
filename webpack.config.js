module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/src/main/webapp/public', 
    filename: 'bundle.js' 
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
    	  test: /\.css$/,
    	  loader: 'style-loader!css-loader'
    	},
    	{ 
    	  test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif)$/,
    	  loader: 'file-loader'
    	}
    ]
  }
};