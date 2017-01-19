var chai = require('chai');
var expect = chai.expect; // I am using the "expect" style of Chai
var decode = require('./../routes/decode');


describe('checkNoFilteredData', function() {
  it('filterJSONData() should return no items as no items given', function() {
    var data = [];
    expect(decode.filterJSONData(data)).to.be.empty;
  });
});

describe('checkNoMatchingFilteredData', function() {
  it('filterJSONData() should return no items as drm = flase', function() {
    var data = [
    	{
            "drm": false,
            "episodeCount": 0,
            "image": {
                "showImage": "http://mybeautifulcatchupservice.com/img/shows/AGT.jpg"
            },
            "title": "Australia's Got Talent"
        }
    ];
    expect(decode.filterJSONData(data)).to.be.empty;
  });
});

describe('checkMatchingFilteredData', function() {
  it('filterJSONData() should return a single show (image, slug, title) as drm is true and episodecount > 0', function() {
    var data = [
    	{
            "drm": true,
            "episodeCount": 1,
            "image": {
                "showImage": "http://mybeautifulcatchupservice.com/img/shows/AGT.jpg"
            },
            "slug": "show/australiasgottalent",
            "title": "Australia's Got Talent"
        }
    ];
    
    var response = [
    	{
      	"image": "http://mybeautifulcatchupservice.com/img/shows/AGT.jpg",
      	"slug": "show/australiasgottalent",
      	"title": "Australia's Got Talent"
    	}
    ];
    expect(decode.filterJSONData(data)[0].image).to.equal(response[0].image);
    expect(decode.filterJSONData(data)[0].slug).to.equal(response[0].slug);
    expect(decode.filterJSONData(data)[0].title).to.equal(response[0].title);
  });
});

describe('checkMatchingFilteredDataEpisode', function() {
  it('filterJSONData() should return no items as episode count is < 1', function() {
    var data = [
    	{
            "drm": true,
            "episodeCount": 0,
            "image": {
                "showImage": "http://mybeautifulcatchupservice.com/img/shows/AGT.jpg"
            },
            "slug": "show/australiasgottalent",
            "title": "Australia's Got Talent"
        }
    ];
    expect(decode.filterJSONData(data)).to.be.empty;
  });
});

describe('checkMultipleMatchingFilteredData', function() {
  it('filterJSONData() should return two shows (image, slug, title) as drm is true and episodecount > 0', function() {
    var data = [
    	{
            "drm": true,
            "episodeCount": 1,
            "image": {
                "showImage": "http://mybeautifulcatchupservice.com/img/shows/AGT.jpg"
            },
            "slug": "show/australiasgottalent",
            "title": "Australia's Got Talent"
        },
        {
            "drm": true,
            "episodeCount": 3,
            "image": {
                "showImage": "http://afakeurl.com/img/shows/AGT.jpg"
            },
            "slug": "show/brandnewshow",
            "title": "Australia's Got A Brand New Show"
        }
    ];
    
    var response = [
    	{
      	"image": "http://mybeautifulcatchupservice.com/img/shows/AGT.jpg",
      	"slug": "show/australiasgottalent",
      	"title": "Australia's Got Talent"
    	},
    	{
      	"image": "http://afakeurl.com/img/shows/AGT.jpg",
      	"slug": "show/brandnewshow",
      	"title": "Australia's Got A Brand New Show"
    	}
    ];
    expect(decode.filterJSONData(data)[0].image).to.equal(response[0].image);
    expect(decode.filterJSONData(data)[0].slug).to.equal(response[0].slug);
    expect(decode.filterJSONData(data)[0].title).to.equal(response[0].title);
    expect(decode.filterJSONData(data)[1].image).to.equal(response[1].image);
    expect(decode.filterJSONData(data)[1].slug).to.equal(response[1].slug);
    expect(decode.filterJSONData(data)[1].title).to.equal(response[1].title);
  });
});