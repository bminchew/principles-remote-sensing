// Ge 158 Problem Set 3, Problem 1: starter script
// SRTM elevation (m) and helpers that sample an image (y) and the
// elevation (z_km) at random points, then plot y versus z_km
var dem = ee.Image('USGS/SRTMGL1_003');
function sampleVsElevation(img, region, scale) {
  return dem.divide(1000).rename('z_km').addBands(img.rename('y'))
      .sample({region: region, scale: scale, numPixels: 3000,
               geometries: false, tileScale: 4});
}
function plotVsElevation(samples, title, yLabel) {
  print(ui.Chart.feature.byFeature(samples, 'z_km', 'y')
      .setChartType('ScatterChart')
      .setOptions({title: title, pointSize: 1,
                   legend: {position: 'none'},
                   hAxis: {title: 'Elevation z (km)'},
                   vAxis: {title: yLabel}}));
}

// Part (a): ERA5-Land monthly mean surface pressure (Pa -> hPa)
var tibet = ee.Geometry.Rectangle([78, 26, 92, 36]);
var era5 = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY_AGGR')
    .select('surface_pressure');
var pJan = era5.filterDate('2023-01-01', '2023-02-01').first()
    .divide(100);
var pSamples = sampleVsElevation(pJan.log(), tibet, 11132);
plotVsElevation(pSamples, 'Surface pressure, Tibet, Jan 2023',
                'ln(P / 1 hPa)');
// Least-squares fit y = offset + scale * z_km. Note that 'scale' is
// the slope (per km), not a scale height:
// print(pSamples.reduceColumns(ee.Reducer.linearFit(),
//                              ['z_km', 'y']));

// Part (b): MODIS column water vapor (x 0.001 -> cm), clear-sky
// retrievals only (over clouds, the product reports the water vapor
// above the cloud), averaged over one month
var nepal = ee.Geometry.Rectangle([82, 26.5, 88.5, 30]);
function clearSkyWV(img) {
  var cloudMask = img.select('AOD_QA').bitwiseAnd(7);  // bits 0-2
  return img.select('Column_WV').updateMask(cloudMask.eq(1));
}
var wv = ee.ImageCollection('MODIS/061/MCD19A2_GRANULES')
    .filterBounds(nepal).filterDate('2023-11-01', '2023-12-01')
    .map(clearSkyWV).mean().multiply(0.001);
var wSamples = sampleVsElevation(wv.log(), nepal, 2000);
plotVsElevation(wSamples, 'Column water vapor, Nepal, Nov 2023',
                'ln(w_vap / 1 cm)');

// Part (e): Sentinel-2 top-of-atmosphere reflectance near
// Mt. Everest on 3 Dec 2023 (all tiles from that overpass)
var everest = ee.Geometry.Rectangle([86.5, 27.0, 87.3, 28.15]);
var toa = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
    .filterBounds(everest).filterDate('2023-12-03', '2023-12-04')
    .mosaic().divide(10000);  // reflectance
Map.centerObject(everest, 9);
Map.addLayer(toa, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.4},
             'True color');
Map.addLayer(toa.select('B8A'), {min: 0, max: 0.5}, 'B8A (865 nm)');
Map.addLayer(toa.select('B9'), {min: 0, max: 0.3}, 'B9 (945 nm)');
Map.addLayer(toa.select('B10'), {min: 0, max: 0.05}, 'B10 (1375 nm)');
var lnRatio = toa.select('B9').divide(toa.select('B8A')).log();
plotVsElevation(sampleVsElevation(lnRatio, everest, 300),
                'Sentinel-2 near Mt. Everest', 'ln(B9 / B8A)');
plotVsElevation(sampleVsElevation(toa.select('B10'), everest, 300),
                'Sentinel-2 near Mt. Everest', 'B10 reflectance');
