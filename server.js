var express = require( 'express' );
var favicon = require( 'serve-favicon' );

var app = express();

var port = process.env.PORT || 8080;

app.use( favicon( './favicon.ico' ) );

app.set( 'view options', {
  layout: false
} );
app.use( express.static( __dirname + '/public' ) );

app.use( '/:input', function( req, res ) {

  res.send( processInput( req.params.input ) );
} );

app.use( '/', function( req, res, next ) {
  //res.send( 'Hello everyone' );
  res.render( 'index.html' );
} );


app.use( function( err, req, res, next ) {
  res.sendStatus( 400 ).send( {
    error: 'malformed url'
  } );
  next( err );
} );
app.use( function( err, req, res, next ) {
  console.log( err );
} )


app.listen( port, function() {
  console.log( 'Example app listening on port %d!', port );
} );

function processInput( input ) {
  var date = ( +input ) ? new Date( +input ) : new Date( input );
  var output = {
    unix: null,
    natural: null
  };
  if ( date.getDate() ) {
    output.unix = date.getTime();
    output.natural = dateParser( date );
  }
  return output;
}

function dateParser( date ) {
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString( 'en-US', options );
}
