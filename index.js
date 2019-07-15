const axios = require('axios');



axios.get('http://localhost:3000').then(resp =>{
  var arrOfVals = [];
  for ( var obj in resp.data ) {
      arrOfVals.push( obj);
  }
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database(':memory:');
  db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)");
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 4; i++) {
      stmt.run("Ipsum " + arrOfVals[i]);
    }
    stmt.finalize();
    var rows = document.getElementById("database");
    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      var item = document.createElement("li");
      item.textContent = "" + row.id + ": " + row.info;
      console.log(row.info)
      rows.appendChild(item);
    });
  });
  db.close();

})