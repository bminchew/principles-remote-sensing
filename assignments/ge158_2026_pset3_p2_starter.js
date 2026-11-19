// Ge 158 Problem Set 3, Problem 2: starter script (Eaton Fire)
var roi = ee.Geometry.Rectangle([-118.20, 34.15, -117.98, 34.27]);
Map.centerObject(roi, 12);

// Part (a): MODIS burned area for January 2025. BurnDate is the day
// of the year of the burn; 0 means unburned and is masked here.
var burnDate = ee.ImageCollection('MODIS/061/MCD64A1')
    .filterDate('2025-01-01', '2025-02-01').first()
    .select('BurnDate').selfMask();
Map.addLayer(burnDate, {min: 1, max: 31,
             palette: ['yellow', 'orange', 'red', 'purple']},
             'MODIS burn date (adjust min and max)');

// Part (b): Sentinel-2 surface reflectance before and after the
// fire (mosaic of all tiles from one overpass; DN / 10000 gives
// reflectance)
function s2Mosaic(date) {
  return ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
      .filterBounds(roi)
      .filterDate(date, ee.Date(date).advance(1, 'day'))
      .mosaic().divide(10000);
}
var s2Pre = s2Mosaic('2024-12-18');
var s2Post = s2Mosaic('2025-02-21');
Map.addLayer(s2Pre, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3},
             'Sentinel-2 before (18 Dec 2024)');
Map.addLayer(s2Post, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3},
             'Sentinel-2 after (21 Feb 2025)');
// Hint: image.normalizedDifference(['B8', 'B4']) computes
// (B8 - B4) / (B8 + B4).

// Part (c): Sentinel-1 backscatter (already in dB). Median of all
// images from one descending orbit (relative orbit 71) before and
// after the fire, and the change, post minus pre.
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(roi)
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.eq('relativeOrbitNumber_start', 71))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation',
                                   'VH'))
    .select(['VV', 'VH']);
var s1Pre = s1.filterDate('2024-11-15', '2025-01-07').median();
var s1Post = s1.filterDate('2025-01-15', '2025-03-01').median();
var s1Change = s1Post.subtract(s1Pre);  // dB
var changeVis = {min: -4, max: 4, palette: ['blue', 'white', 'red']};
Map.addLayer(s1Change.select('VV'), changeVis, 'Change in VV (dB)');
Map.addLayer(s1Change.select('VH'), changeVis, 'Change in VH (dB)');
