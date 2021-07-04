module.exports = (req,res,next) => {
  let path = String(req.url).split("/").pop();
  res.locals.styles = ["https://meyerweb.com/eric/tools/css/reset/reset.css","https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"]
  if(path > 0 ){
    res.locals.styles.push(`/css/${path}.css`)
  }else{
    res.locals.styles.push(`/css/home.css`)
  }
  return next();
}