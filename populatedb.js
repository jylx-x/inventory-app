#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Category = require("./models/category");
var iPhone = require("./models/iPhone");
var iPad = require("./models/iPad");
var Mac = require("./models/mac");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var categories = [];
var iPhones = [];
var iPads = [];
var macs = [];

function categoryCreate(name, description, cb) {
  categorydetail = {
    name: name,
    description: description,
  };

  var category = new Category(categorydetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function iPhoneCreate(name, img, description, category, price, number_in_stock, cb) {
  iphonedetail = {
    name: name,
    img: img,
    description: description,
    category: category,
    price: price,
    number_in_stock: number_in_stock,
  };

  var iphone = new iPhone(iphonedetail);

  iphone.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New iPhone: " + iphone);
    iPhones.push(iphone);
    cb(null, iphone);
  });
}

function iPadCreate(name, img, description, category, price, number_in_stock, cb) {
  ipaddetail = {
    name: name,
    img: img,
    description: description,
    category: category,
    price: price,
    number_in_stock: number_in_stock,
  };

  var ipad = new iPad(ipaddetail);

  ipad.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New iPad: " + ipad);
    iPads.push(ipad);
    cb(null, ipad);
  });
}

function macCreate(name, img, description, category, price, number_in_stock, cb) {
  macdetail = {
    name: name,
    img: img,
    description: description,
    category: category,
    price: price,
    number_in_stock: number_in_stock,
  };

  var mac = new Mac(macdetail);

  mac.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Mac: " + mac);
    macs.push(mac);
    // cb(null, mac);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          "iPhone",
          "The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "iPad",
          "The iPad is a touchscreen tablet PC made by Apple.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Mac",
          "The Macintosh, or Mac, is a family of personal computers designed, manufactured, and sold by Apple Inc.",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createiPhones(cb) {
  async.parallel(
    [
      function (callback) {
        iPhoneCreate(
          "iPhone 13",
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pink-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1629842709000",
          "The iPhone 13 iterate upon the successful iPhone 12 with new cameras and longer battery life. The notch has been reduced in size, and the rear camera module now sits at a diagonal. In addition, the A15 processor brings more speed and efficiency to every task.",
          "iPhone",
          "$699",
          1000,
          callback
        );
      },
      function (callback) {
        iPhoneCreate(
          "iPhone 12",
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1604343704000",
          "A superpowerful chip. 5G speed. An advanced dual‑camera system. A Ceramic Shield front that's tougher than any smartphone glass. And a bright, beautiful OLED display. iPhone 12 has it all — in two great sizes.",
          "iPhone",
          "$599",
          800,
          callback
        );
      },
      function (callback) {
        iPhoneCreate(
          "iPhone SE",
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-white-select-2020?wid=834&hei=1000&fmt=jpeg&qlt=95&.v=1586574259457",
          "iPhone SE packs our powerful A13 Bionic chip into a popular design at our most affordable price. It’s just what you’ve been waiting for.",
          "iPhone",
          "$399",
          500,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createiPads(cb) {
  async.parallel(
    [
      function (callback) {
        iPadCreate(
          "iPad Pro",
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-wifi-spacegray-202104_FMT_WHH?wid=1945&hei=2000&fmt=jpeg&qlt=95&.v=1617126635000",
          "The iPad Pro is Apple's high-end tablet computer. The latest iPad Pro models feature a powerful M1 chip, a Thunderbolt port, an improved front-facing camera, a Liquid Retina XDR mini-LED display option on the larger model, and up to 16GB of RAM and 2TB of storage. Apple typically updates the iPad Pro every 12 to 18 months.",
          "iPad",
          "$799",
          800,
          callback
        );
      },
      function (callback) {
        iPadCreate(
          "iPad Air",
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-spacegray-202009_FMT_WHH?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1598653762000",
          "iPad Air does more than a computer in simpler, more magical ways. And now with more features and capabilities, it’s more versatile than ever.",
          "iPad",
          "$599",
          700,
          callback
        );
      },
      function (callback) {
        iPadCreate(
          "iPad Mini",
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-wifi-pink-202109_FMT_WHH?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1629840647000",
          "iPad mini is meticulously designed to be absolutely beautiful. An all-new enclosure features a new, larger edge-to-edge screen, along with narrow borders and elegant rounded corners.",
          "iPad",
          "$499",
          500,
          callback
        );
      },
    ],
    // Optional callback
    cb
  );
}

function createMacs(cb) {
  async.parallel(
    [
      function (callback) {
        macCreate(
          "MacBook Pro",
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202011_GEO_US?wid=1280&hei=1190&fmt=jpeg&qlt=80&.v=1632948875000",
          "The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need. The first notebook of its kind, this MacBook Pro is a beast.",
          "Mac",
          "$1999",
          650,
          callback
        );
      },
      function (callback) {
        macCreate(
          "MacBook Air",
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gallery3-20201110?wid=4000&hei=3072&fmt=jpeg&qlt=80&.v=1632937845000",
          "Our thinnest, lightest notebook, completely transformed by the Apple M1 chip. CPU speeds up to 3.5x faster. GPU speeds up to 5x faster. Our most advanced Neural Engine for up to 9x faster machine learning. The longest battery life ever in a MacBook Air. And a silent, fanless design. This much power has never been this ready to go.",
          "Mac",
          "$999",
          500
        );
      },
      function (callback) {
        macCreate(
          "iMac",
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-27-cto-hero-202008?wid=1254&hei=1044&fmt=jpeg&qlt=80&.v=1594932848000",
          "Beautiful, intuitive all-in-one desktops with incredible processors, a Retina display, and the world's most advanced desktop operating system.",
          "Mac",
          "$1299",
          400,
          callback
        );
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createiPhones, createiPads, createMacs],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
