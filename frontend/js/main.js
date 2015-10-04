var jsonRes=[{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//6f2e002d-c6f1-4bc9-9f7d-d4f538c7058b_thumb.jpg",
   "merchantLongitude": "8.488552",
   "merchantName":"kkiosk",
   "merchantId":"V1",
   "merchantLatitude":"47.391478",
   "couponsAvailable":"24",
   "couponsGiven":"3"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//0ead5c3b-b5af-4e88-a916-c7334708d6a4_thumb.jpg",
   "merchantLongitude":"8.536542",
   "merchantName":"Avec",
   "merchantId":"V2",
   "merchantLatitude":"47.378991",
   "couponsAvailable":"3",
   "couponsGiven":"18"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//03be2fbc-8fb0-4d6b-929a-90dac8ea6e2d_thumb.png",
   "merchantLongitude":"8.539072",
   "merchantName":"Brezelk\u00f6nig",
   "merchantId":"V3",
   "merchantLatitude":"47.378950",
   "couponsAvailable":"10",
   "couponsGiven":"45"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//0c71a43c-3a54-47db-915c-2bf7bf6550ea_thumb.jpg",
   "merchantLongitude":"8.523853",
   "merchantName":"Caff\u00e8 Spettacolo",
   "merchantId":"V4",
   "merchantLatitude":"47.371149",
   "couponsAvailable":"14",
   "couponsGiven":"24"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//6f2e002d-c6f1-4bc9-9f7d-d4f538c7058b_thumb.jpg",
   "merchantLongitude":"8.549087",
   "merchantName":"kkiosk",
   "merchantId":"V1",
   "merchantLatitude":"47.386028",
   "couponsAvailable":"7",
   "couponsGiven":"12"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//6f2e002d-c6f1-4bc9-9f7d-d4f538c7058b_thumb.jpg",
   "merchantLongitude":"8.498772",
   "merchantName":"kkiosk",
   "merchantId":"V1",
   "merchantLatitude":"47.386663",
   "couponsAvailable":"2",
   "couponsGiven":"32"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//0ead5c3b-b5af-4e88-a916-c7334708d6a4_thumb.jpg",
   "merchantLongitude":"8.540334",
   "merchantName":"Avec",
   "merchantId":"V2",
   "merchantLatitude":"47.378232",
   "couponsAvailable":"19",
   "couponsGiven":"10"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//03be2fbc-8fb0-4d6b-929a-90dac8ea6e2d_thumb.png",
   "merchantLongitude":"8.548686",
   "merchantName":"Brezelk\u00f6nig",
   "merchantId":"V3",
   "merchantLatitude":"47.366703",
   "couponsAvailable":"23",
   "couponsGiven":"5"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//0c71a43c-3a54-47db-915c-2bf7bf6550ea_thumb.jpg",
   "merchantLongitude":", 8.51509770000007",
   "merchantName":"Caff\u00e8 Spettacolo",
   "merchantId":"V4",
   "merchantLatitude":"47.389902",
   "couponsAvailable":"14",
   "couponsGiven":"48"
}];

var activePage;
var maxPages;
var map;
var curCoord = {lat: 47.389902, lng: 8.5150977};
var curZoom = 14;
var markers;

var maxA;
var minA;
var maxG;
var minG;

var maxIconScale = 80;
var minIconScale = 30;

function changeInfo(){
	if (!activePage) $('#tri').css({ Transform: 'rotate(' + 135 + 'deg)', top: '5px'});
	else $('#tri').css({ Transform: 'rotate(' + -45 + 'deg)', top: '20px'});
	$('.nav a').removeClass('selected');
	$('#l' + activePage).addClass('selected');
}

function scroll(x){
	activePage = x;
	changeInfo();
	$('body').animate({ scrollTop: $('#p' + x).offset().top }, 1000);
}

function toggleScroll(){
	if(activePage)
		scroll(0);
	else
		scroll(1);
}

function calcMaxMin(data){
	var couponsAvailable = [];
	var couponsGiven = [];
	data.map(function(curData){
		couponsAvailable.push(curData.couponsAvailable);
	});
	data.map(function(curData){
		couponsGiven.push(curData.couponsGiven);
	});
	maxA = Math.max.apply(Math, couponsAvailable);
	minA = Math.min.apply(Math, couponsAvailable);
	maxG = Math.max.apply(Math, couponsGiven);
	minG = Math.min.apply(Math, couponsGiven);
}

function calcSize(v, x){
	if(x){
		return (minIconScale + ((v - minA)*(maxIconScale - minIconScale))/(maxA - minA));
	}
	else {
		return (minIconScale + ((v - minG)*(maxIconScale - minIconScale))/(maxG - minG));
	}
}

function populate(x){
	curCoord = map.getCenter();
	curZoom = map.getZoom();
	map = new google.maps.Map(document.getElementById('map'), {
		center: curCoord,
		zoom: curZoom,
		disableDefaultUI: true,
		zoomControl: true
	});
	markers = jsonRes.map(function(data){
		var tmp
		if(x) tmp = calcSize(data.couponsAvailable, x);
		else tmp = calcSize(data.couponsGiven, x);
		var marker = new google.maps.Marker({
			position: {lat: parseFloat(data.merchantLatitude), lng: parseFloat(data.merchantLongitude)},
			title: data.merchantName,
			map: map,
			icon: {
				url: data.merchantLogoThumbnail,
				size: new google.maps.Size(120, 120),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(tmp, tmp)
			}
		});
		return marker;
	});
}

function leaderboard(){
	jsonRes.sort(function(a,b){
    	return b.couponsGiven - a.couponsGiven;
    });
    $('#leaderboard').append('<tr><th>Shop</th><th>Vouchers given away</th><th>Vouchers Available</th><th>Ratio</th></tr>');
	jsonRes.map(function(data){
		$('#leaderboard').append('<tr><td>' + data.merchantName + '</td><td>' + data.couponsGiven + '</td><td>' + data.couponsAvailable + '</td><td>' + (data.couponsGiven/data.couponsAvailable).toFixed(3) + '</td></tr>');
	});
}

function initMap() {
	calcMaxMin(jsonRes);
	map = new google.maps.Map(document.getElementById('map'), {
		center: curCoord,
		zoom: curZoom,
		disableDefaultUI: true,
		zoomControl: true
	});
	populate(1);
}

$(window).on("mousewheel", function(e){e.preventDefault();});

$(document).ready(function(){

	maxPages = $('.page').length -1;
	leaderboard();

	$('.ftr').click(toggleScroll);
	$('#myonoffswitch').change(function() {
		if($(this).is(":checked"))
			populate(0);
		else
			populate(1);
	});
	$(window).keydown(function(e){
		if ( e.which == 38 ) {
			e.preventDefault();
			if(activePage > 0)
				scroll(activePage - 1);
		}
		else if(e.which == 40){
			e.preventDefault();
			if(activePage < maxPages)
				scroll(activePage + 1);
		}
	});

	$('body').scrollTop('body');
	$('body').focus();

	$('#loadingCont').delay(1000).fadeOut(500).unload();
});