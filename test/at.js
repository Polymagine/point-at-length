var test = require('tape');
var points = require('../');

var ptsstr = 'm 340.0802,61.38651 c -40.2898,8.22791 -62.56591,65.81112'
    + ' -49.74004,128.6158 12.82587,62.80467 55.90207,107.07364'
    + ' 96.19186,98.84572 40.2898,-8.22791 62.55966,-65.84175'
    + ' 49.73379,-128.64642 C 423.43994,97.39694 380.36999,53.15859'
    + ' 340.0802,61.38651 z m 12.91104,8.55846 c 22.51488,-4.59795'
    + ' 48.14062,27.6983 57.21553,72.13556 9.0749,44.43726 -1.83609,84.19498'
    + ' -24.35097,88.79294 -22.51489,4.59795 -48.11001,-27.70455'
    + ' -57.18492,-72.14182 -9.0749,-44.43726 1.80548,-84.18872'
    + ' 24.32036,-88.78668 z'
    + ' M 363.38912,100.18734 l 7.78212,25.23786 l 15.68721,-12.87912 L 363.38912,100.18734 z'
    + ' v 25 h 75'
;
var expected = [
    [340.0802001953125,61.38650894165039],
    [321.815673828125,69.2024917602539],
    [307.4776611328125,83.02471160888672],
    [297.3731994628906,100.23271942138672],
    [290.91046142578125,119.13249969482422],
    [287.50921630859375,138.82366943359375],
    [286.7622985839844,158.796630859375],
    [288.4009704589844,178.71836853027344],
    [292.24517822265625,198.3352813720703],
    [298.23358154296875,217.4064178466797],
    [306.42340087890625,235.6387939453125],
    [316.9225769042969,252.64205932617188],
    [329.898193359375,267.8299560546875],
    [345.53973388671875,280.2279052734375],
    [363.81201171875,288.1681823730469],
    [383.6486511230469,289.34698486328125],
    [402.33636474609375,282.61614990234375],
    [417.3070983886719,269.49383544921875],
    [427.9978332519531,252.6488800048828],
    [434.951904296875,233.9263458251953],
    [438.77215576171875,214.3130340576172],
    [439.88922119140625,194.35777282714844],
    [438.58905029296875,174.41134643554688],
    [435.06219482421875,154.7349853515625],
    [429.3924865722656,135.56646728515625],
    [421.5318908691406,117.1893310546875],
    [411.380126953125,99.9755630493164],
    [398.7788391113281,84.4737777709961],
    [383.5347900390625,71.5850830078125],
    [365.6168518066406,62.85874557495117],
    [345.8718566894531,60.56281280517578],
    [366.848388671875,71.46869659423828],
    [382.8503723144531,83.20372009277344],
    [394.5501708984375,99.37262725830078],
    [403.0749206542969,117.44243621826172],
    [408.9747009277344,136.5377655029297],
    [412.4517517089844,156.22030639648438],
    [413.3585205078125,176.18382263183594],
    [411.1668701171875,196.03689575195312],
    [404.6397705078125,214.86961364746094],
    [391.05059814453125,229.1015625],
    [371.67529296875,229.21475219726562],
    [355.7654113769531,217.34808349609375],
    [344.1375732421875,201.12646484375],
    [335.6697692871094,183.0297088623047],
    [329.81781005859375,163.91954040527344],
    [326.3842468261719,144.229248046875],
    [325.5235900878906,124.26376342773438],
    [327.773193359375,104.41747283935547],
    [334.3932800292969,85.61891174316406],
    [348.1394958496094,71.55331420898438],
    [367.772705078125,114.40347290039062],
    [377.7147216796875,120.05304718017578],
    [379.63006591796875,108.73966217041016],
    [363.3891296386719,100.18733978271484],
    [363.3891296386719,121.84354470328532],
    [380.0453247032853,125.18733978271484],
    [400.0453247032853,125.18733978271484],
    [420.0453247032853,125.18733978271484],
    [438.3891296386719,125.18733978271484]
];

test('at', function (t) {
    t.plan(expected.length * 2);
    var pt = points(ptsstr);
    var accuracy = [];
    
    for (var i = 0; i < expected.length; i++) {
        var ref = expected[i];
        var p = pt.at(i * 20);
        var x = p[0], y = p[1];
        var rx = ref[0], ry = ref[1];
        accuracy.push(x / rx, y / ry);
        t.ok(cmp(x, rx, 0.1), x + ' ~~ ' + rx + ' ±10%');
        t.ok(cmp(y, ry, 0.1), y + ' ~~ ' + ry + ' ±10%');
    }
    
    var sum = 0;
    for (var i = 0; i < accuracy.length; i++) {
        sum += accuracy[i];
    }
    console.log('mean accuracy:',
        Math.floor(sum / accuracy.length * 100 * 100) / 100, '%'
    );
});

function cmp (found, wanted, tolerance) {
    return found <= wanted + wanted * tolerance
        && found >= wanted - wanted * tolerance
    ;
}
