/**
 * Created by hariharaselvam on 4/25/16.
 */


function convert_throughput(rate) {
    if (rate == -1) {
        rate = 0;
    }
    if (rate >= 1000000) {
        rate = rate / 1000000;
        rate = Math.round(rate * 100) / 100;
        rate = rate.toString() + " MBit/s"
    }
    else if ((rate >= 1000) && (rate < 1000000)) {
        rate = rate / 1000;
        rate = Math.round(rate * 100) / 100;
        rate = rate.toString() + " KBit/s"
    }
    else {
        rate = Math.round(rate * 100) / 100;
        rate = rate.toString() + " bits/s"
    }

    return rate;
}


function graph_config1(data, title_text, x_axis, y_axis, gtype, area) {
    if (area = "stacked") {
        area = {
            stacking: "normal",
            lineColor: '#666666',
            lineWidth: 1,
            marker: {

                enabled: false
            }
        };
    } else {
        area = {};
    }

    var chart = {
        options: {
            chart: {
                width: 980,
                zoomType: 'x',
                spacingRight: 1,
                type: gtype
            },
            plotOptions: {
                series: {},
                area: area
            },
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: x_axis
            }
        },
        yAxis: {

            min: 0,
            title: {
                text: y_axis
            },
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
            },
            legend: {
                enabled: false
            }
        },
        series: data,
        title: {
            text: title_text
        },
        credits: {
            enabled: false
        }
    };
    return chart;
};


function graph_config(data, title_text, x_axis, y_axis, gtype, area) {
    if (area == "stacked") {
        area = {
            stacking: "normal",
            lineColor: '#666666',
            lineWidth: 1,
            marker: {

                enabled: false
            }
        };
    } else {
        area = {
            stacking: false,
            lineColor: '#666666',
            lineWidth: 1,
            marker: {

                enabled: false
            }
        };
    }
    var chart = {
        options: {
            chart: {
                zoomType: 'x',
                height: 300,
                spacingRight: 1,
                type: gtype
            },
            plotOptions: {
                series: {},
                area: area
            },
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: x_axis
            }
        },
        yAxis: {

            min: 0,
            title: {
                text: y_axis
            },
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
            },
            legend: {
                enabled: false
            }
        },
        series: data,
        title: {
            text: ''
        },
        credits: {
            enabled: false
        }
    };
    return chart;
};


function highmap() {

    // Prepare demo data
    var data = [
        {
            "hc-key": "dz",
            "value": 0
        },
        {
            "hc-key": "ao",
            "value": 1
        },
        {
            "hc-key": "eg",
            "value": 2
        },
        {
            "hc-key": "bd",
            "value": 3
        },
        {
            "hc-key": "ne",
            "value": 4
        },
        {
            "hc-key": "qa",
            "value": 5
        },
        {
            "hc-key": "na",
            "value": 6
        },
        {
            "hc-key": "bg",
            "value": 7
        },
        {
            "hc-key": "bo",
            "value": 8
        },
        {
            "hc-key": "gh",
            "value": 9
        },
        {
            "hc-key": "pk",
            "value": 10
        },
        {
            "hc-key": "pa",
            "value": 11
        },
        {
            "hc-key": "jo",
            "value": 12
        },
        {
            "hc-key": "eh",
            "value": 13
        },
        {
            "hc-key": "ly",
            "value": 14
        },
        {
            "hc-key": "my",
            "value": 15
        },
        {
            "hc-key": "pr",
            "value": 16
        },
        {
            "hc-key": "kp",
            "value": 17
        },
        {
            "hc-key": "tz",
            "value": 18
        },
        {
            "hc-key": "pt",
            "value": 19
        },
        {
            "hc-key": "kh",
            "value": 20
        },
        {
            "hc-key": "py",
            "value": 21
        },
        {
            "hc-key": "sa",
            "value": 22
        },
        {
            "hc-key": "me",
            "value": 23
        },
        {
            "hc-key": "si",
            "value": 24
        },
        {
            "hc-key": "bf",
            "value": 25
        },
        {
            "hc-key": "ch",
            "value": 26
        },
        {
            "hc-key": "mr",
            "value": 27
        },
        {
            "hc-key": "hr",
            "value": 28
        },
        {
            "hc-key": "cl",
            "value": 29
        },
        {
            "hc-key": "cn",
            "value": 30
        },
        {
            "hc-key": "kn",
            "value": 31
        },
        {
            "hc-key": "jm",
            "value": 32
        },
        {
            "hc-key": "dj",
            "value": 33
        },
        {
            "hc-key": "gn",
            "value": 34
        },
        {
            "hc-key": "fi",
            "value": 35
        },
        {
            "hc-key": "uy",
            "value": 36
        },
        {
            "hc-key": "va",
            "value": 37
        },
        {
            "hc-key": "np",
            "value": 38
        },
        {
            "hc-key": "ma",
            "value": 39
        },
        {
            "hc-key": "ye",
            "value": 40
        },
        {
            "hc-key": "ph",
            "value": 41
        },
        {
            "hc-key": "za",
            "value": 42
        },
        {
            "hc-key": "ni",
            "value": 43
        },
        {
            "hc-key": "cyn",
            "value": 44
        },
        {
            "hc-key": "vi",
            "value": 45
        },
        {
            "hc-key": "sy",
            "value": 46
        },
        {
            "hc-key": "li",
            "value": 47
        },
        {
            "hc-key": "mt",
            "value": 48
        },
        {
            "hc-key": "kz",
            "value": 49
        },
        {
            "hc-key": "mn",
            "value": 50
        },
        {
            "hc-key": "sr",
            "value": 51
        },
        {
            "hc-key": "ie",
            "value": 52
        },
        {
            "hc-key": "dm",
            "value": 53
        },
        {
            "hc-key": "bj",
            "value": 54
        },
        {
            "hc-key": "ng",
            "value": 55
        },
        {
            "hc-key": "be",
            "value": 56
        },
        {
            "hc-key": "tg",
            "value": 57
        },
        {
            "hc-key": "de",
            "value": 58
        },
        {
            "hc-key": "lk",
            "value": 59
        },
        {
            "hc-key": "gb",
            "value": 60
        },
        {
            "hc-key": "gy",
            "value": 61
        },
        {
            "hc-key": "cr",
            "value": 62
        },
        {
            "hc-key": "cm",
            "value": 63
        },
        {
            "hc-key": "kas",
            "value": 64
        },
        {
            "hc-key": "km",
            "value": 65
        },
        {
            "hc-key": "ug",
            "value": 66
        },
        {
            "hc-key": "tm",
            "value": 67
        },
        {
            "hc-key": "tt",
            "value": 68
        },
        {
            "hc-key": "nl",
            "value": 69
        },
        {
            "hc-key": "td",
            "value": 70
        },
        {
            "hc-key": "ge",
            "value": 71
        },
        {
            "hc-key": "ro",
            "value": 72
        },
        {
            "hc-key": "scr",
            "value": 73
        },
        {
            "hc-key": "lv",
            "value": 74
        },
        {
            "hc-key": "bz",
            "value": 75
        },
        {
            "hc-key": "mm",
            "value": 76
        },
        {
            "hc-key": "af",
            "value": 77
        },
        {
            "hc-key": "bi",
            "value": 78
        },
        {
            "hc-key": "by",
            "value": 79
        },
        {
            "hc-key": "gd",
            "value": 80
        },
        {
            "hc-key": "lr",
            "value": 81
        },
        {
            "hc-key": "gr",
            "value": 82
        },
        {
            "hc-key": "ls",
            "value": 83
        },
        {
            "hc-key": "gl",
            "value": 84
        },
        {
            "hc-key": "ad",
            "value": 85
        },
        {
            "hc-key": "mz",
            "value": 86
        },
        {
            "hc-key": "tj",
            "value": 87
        },
        {
            "hc-key": "th",
            "value": 88
        },
        {
            "hc-key": "ht",
            "value": 89
        },
        {
            "hc-key": "mx",
            "value": 90
        },
        {
            "hc-key": "zw",
            "value": 91
        },
        {
            "hc-key": "lc",
            "value": 92
        },
        {
            "hc-key": "in",
            "value": 93
        },
        {
            "hc-key": "vc",
            "value": 94
        },
        {
            "hc-key": "bt",
            "value": 95
        },
        {
            "hc-key": "vn",
            "value": 96
        },
        {
            "hc-key": "no",
            "value": 97
        },
        {
            "hc-key": "cz",
            "value": 98
        },
        {
            "hc-key": "ag",
            "value": 99
        },
        {
            "hc-key": "fj",
            "value": 100
        },
        {
            "hc-key": "hn",
            "value": 101
        },
        {
            "hc-key": "mu",
            "value": 102
        },
        {
            "hc-key": "do",
            "value": 103
        },
        {
            "hc-key": "lu",
            "value": 104
        },
        {
            "hc-key": "il",
            "value": 105
        },
        {
            "hc-key": "sm",
            "value": 106
        },
        {
            "hc-key": "pe",
            "value": 107
        },
        {
            "hc-key": "id",
            "value": 108
        },
        {
            "hc-key": "vu",
            "value": 109
        },
        {
            "hc-key": "mk",
            "value": 110
        },
        {
            "hc-key": "cd",
            "value": 111
        },
        {
            "hc-key": "cg",
            "value": 112
        },
        {
            "hc-key": "is",
            "value": 113
        },
        {
            "hc-key": "et",
            "value": 114
        },
        {
            "hc-key": "um",
            "value": 115
        },
        {
            "hc-key": "co",
            "value": 116
        },
        {
            "hc-key": "ser",
            "value": 117
        },
        {
            "hc-key": "bw",
            "value": 118
        },
        {
            "hc-key": "md",
            "value": 119
        },
        {
            "hc-key": "mg",
            "value": 120
        },
        {
            "hc-key": "ec",
            "value": 121
        },
        {
            "hc-key": "sn",
            "value": 122
        },
        {
            "hc-key": "tl",
            "value": 123
        },
        {
            "hc-key": "fr",
            "value": 124
        },
        {
            "hc-key": "lt",
            "value": 125
        },
        {
            "hc-key": "rw",
            "value": 126
        },
        {
            "hc-key": "zm",
            "value": 127
        },
        {
            "hc-key": "gm",
            "value": 128
        },
        {
            "hc-key": "fo",
            "value": 129
        },
        {
            "hc-key": "gt",
            "value": 130
        },
        {
            "hc-key": "dk",
            "value": 131
        },
        {
            "hc-key": "ua",
            "value": 132
        },
        {
            "hc-key": "au",
            "value": 133
        },
        {
            "hc-key": "at",
            "value": 134
        },
        {
            "hc-key": "ve",
            "value": 135
        },
        {
            "hc-key": "pw",
            "value": 136
        },
        {
            "hc-key": "ke",
            "value": 137
        },
        {
            "hc-key": "la",
            "value": 138
        },
        {
            "hc-key": "bjn",
            "value": 139
        },
        {
            "hc-key": "tr",
            "value": 140
        },
        {
            "hc-key": "jp",
            "value": 141
        },
        {
            "hc-key": "al",
            "value": 142
        },
        {
            "hc-key": "om",
            "value": 143
        },
        {
            "hc-key": "it",
            "value": 144
        },
        {
            "hc-key": "bn",
            "value": 145
        },
        {
            "hc-key": "tn",
            "value": 146
        },
        {
            "hc-key": "hu",
            "value": 147
        },
        {
            "hc-key": "ru",
            "value": 148
        },
        {
            "hc-key": "lb",
            "value": 149
        },
        {
            "hc-key": "bb",
            "value": 150
        },
        {
            "hc-key": "br",
            "value": 151
        },
        {
            "hc-key": "ci",
            "value": 152
        },
        {
            "hc-key": "rs",
            "value": 153
        },
        {
            "hc-key": "gq",
            "value": 154
        },
        {
            "hc-key": "us",
            "value": 155
        },
        {
            "hc-key": "se",
            "value": 156
        },
        {
            "hc-key": "az",
            "value": 157
        },
        {
            "hc-key": "gw",
            "value": 158
        },
        {
            "hc-key": "sz",
            "value": 159
        },
        {
            "hc-key": "ca",
            "value": 160
        },
        {
            "hc-key": "kv",
            "value": 161
        },
        {
            "hc-key": "kr",
            "value": 162
        },
        {
            "hc-key": "mw",
            "value": 163
        },
        {
            "hc-key": "sk",
            "value": 164
        },
        {
            "hc-key": "cy",
            "value": 165
        },
        {
            "hc-key": "ba",
            "value": 166
        },
        {
            "hc-key": "pga",
            "value": 167
        },
        {
            "hc-key": "sg",
            "value": 168
        },
        {
            "hc-key": "tw",
            "value": 169
        },
        {
            "hc-key": "so",
            "value": 170
        },
        {
            "hc-key": "sol",
            "value": 171
        },
        {
            "hc-key": "uz",
            "value": 172
        },
        {
            "hc-key": "cf",
            "value": 173
        },
        {
            "hc-key": "pl",
            "value": 174
        },
        {
            "hc-key": "kw",
            "value": 175
        },
        {
            "hc-key": "er",
            "value": 176
        },
        {
            "hc-key": "ga",
            "value": 177
        },
        {
            "hc-key": "ee",
            "value": 178
        },
        {
            "hc-key": "es",
            "value": 179
        },
        {
            "hc-key": "iq",
            "value": 180
        },
        {
            "hc-key": "sv",
            "value": 181
        },
        {
            "hc-key": "ml",
            "value": 182
        },
        {
            "hc-key": "st",
            "value": 183
        },
        {
            "hc-key": "ir",
            "value": 184
        },
        {
            "hc-key": "sl",
            "value": 185
        },
        {
            "hc-key": "cnm",
            "value": 186
        },
        {
            "hc-key": "bs",
            "value": 187
        },
        {
            "hc-key": "sb",
            "value": 188
        },
        {
            "hc-key": "nz",
            "value": 189
        },
        {
            "hc-key": "mc",
            "value": 190
        },
        {
            "hc-key": "ss",
            "value": 191
        },
        {
            "hc-key": "kg",
            "value": 192
        },
        {
            "hc-key": "ae",
            "value": 193
        },
        {
            "hc-key": "ar",
            "value": 194
        },
        {
            "hc-key": "sd",
            "value": 195
        },
        {
            "hc-key": "bh",
            "value": 196
        },
        {
            "hc-key": "am",
            "value": 197
        },
        {
            "hc-key": "pg",
            "value": 198
        },
        {
            "hc-key": "cu",
            "value": 199
        }
    ];

    // Initiate the chart
    $('#mymap').highcharts('Map', {

        title: {
            text: 'Highmaps basic demo'
        },

        subtitle: {
            text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/world.js">World</a>'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },

        series: [{
            data: data,
            mapData: Highcharts.maps['custom/world'],
            joinBy: 'hc-key',
            name: 'Random data',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.value}'
            }
        }]
    });
};


function highmap1() {

    // Prepare demo data
    var data = [
        {
            "hc-key": "in-py",
            "value": 0
        },
        {
            "hc-key": "in-ld",
            "value": 1
        },
        {
            "hc-key": "in-wb",
            "value": 2
        },
        {
            "hc-key": "in-or",
            "value": 3
        },
        {
            "hc-key": "in-br",
            "value": 4
        },
        {
            "hc-key": "in-sk",
            "value": 5
        },
        {
            "hc-key": "in-ct",
            "value": 6
        },
        {
            "hc-key": "in-tn",
            "value": 7
        },
        {
            "hc-key": "in-mp",
            "value": 40
        },
        {
            "hc-key": "in-2984",
            "value": 9
        },
        {
            "hc-key": "in-ga",
            "value": 10
        },
        {
            "hc-key": "in-nl",
            "value": 11
        },
        {
            "hc-key": "in-mn",
            "value": 12
        },
        {
            "hc-key": "in-ar",
            "value": 13
        },
        {
            "hc-key": "in-mz",
            "value": 14
        },
        {
            "hc-key": "in-tr",
            "value": 15
        },
        {
            "hc-key": "in-3464",
            "value": 16
        },
        {
            "hc-key": "in-dl",
            "value": 17
        },
        {
            "hc-key": "in-hr",
            "value": 18
        },
        {
            "hc-key": "in-ch",
            "value": 19
        },
        {
            "hc-key": "in-hp",
            "value": 20
        },
        {
            "hc-key": "in-jk",
            "value": 21
        },
        {
            "hc-key": "in-kl",
            "value": 22
        },
        {
            "hc-key": "in-ka",
            "value": 23
        },
        {
            "hc-key": "in-dn",
            "value": 24
        },
        {
            "hc-key": "in-mh",
            "value": 25
        },
        {
            "hc-key": "in-as",
            "value": 26
        },
        {
            "hc-key": "in-ap",
            "value": 60
        },
        {
            "hc-key": "in-ml",
            "value": 28
        },
        {
            "hc-key": "in-pb",
            "value": 29
        },
        {
            "hc-key": "in-rj",
            "value": 30
        },
        {
            "hc-key": "in-up",
            "value": 31
        },
        {
            "hc-key": "in-ut",
            "value": 32
        },
        {
            "hc-key": "in-jh",
            "value": 33
        }
    ];

    // Initiate the chart
    $('#mymap').highcharts('Map', {

        title: {
            text: 'Highmaps basic demo'
        },

        subtitle: {
            text: 'Source map: <a href="https://code.highcharts.com/mapdata/countries/in/in-all.js">India</a>'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },

        series: [{
            data: data,
            mapData: Highcharts.maps['countries/in/in-all'],
            joinBy: 'hc-key',
            name: 'Random data',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }, {
            name: 'Separators',
            type: 'mapline',
            data: Highcharts.geojson(Highcharts.maps['countries/in/in-all'], 'mapline'),
            color: 'silver',
            showInLegend: false,
            enableMouseTracking: false
        }]
    });
};


function speedometer(series, Title, x_axis) {

    var chart = {

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: 300
        },

        title: {
            text: Title
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: x_axis
            },
            plotBands: [{
                from: 0,
                to: 50,
                color: '#55BF3B' // green
            }, {
                from: 50,
                to: 75,
                color: '#DDDF0D' // yellow
            }, {
                from: 75,
                to: 100,
                color: '#DF5353' // red
            }]
        },
        credits: {
            enabled: false
        },

        series: series

    };

    return chart;

}


function piechart(response, pie_title, link) {

    link = link || "";
    var gseriers = [];

    var us_os_list = Object.keys(response);

    for (i = 0; i < us_os_list.length; i++) {
        var element = {};
        element["name"] = us_os_list[i];
        element["y"] = response[us_os_list[i]];
        if (element["y"] == -1) {
            element["y"] = 0;
        }
        gseriers.push(element);


    }


    gseriers = setcolors(gseriers);
    //console.log(gseriers);
    var result = {
        options: {
            chart: {

                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 300
            }, plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>     : {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: true,
                    events: {
                        click: function (event, i) {
                            if (event.point.name == "Connected") {
                                location.hash = "/accesspoints/online";
                            }
                            if (event.point.name == "Disconnected") {
                                location.hash = "/accesspoints/offline";
                            }
                            if (link != "") {
                                location.hash = link;
                            }


                        }
                    }
                }
            }
        },
        title: {
            text: pie_title,
        },
        credits: {
            enabled: false
        },

        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: [{
            name: "Count",
            colorByPoint: true,
            data: gseriers
        }]
    };

    return result;
}

function replace_empty(result) {
    for (var key in result) {
        switch (result[key]) {
            case null:
                result[key] = " not available";
                break;
            case -1:
                result[key] = " un known";
                break;
            case '':
                result[key] = " - ";
                break;
        }
        return result;
    }
}

function log_plt(action, response) {
    if (response.hasOwnProperty("plt")) {
        console.log(action + "  =  " + response["plt"].toString());
    }

}

function uptime_convertion(seconds) {

    if (seconds == 1 || seconds == 0) {
        return seconds.toString() + " Second";
    }


    var uptime_array = [];
    if (seconds >= 86400) {
        //days = seconds / 86400;
        days = parseInt(seconds / 86400);
        //days = Math.round(days);
        value = days.toString() + " Days";
        seconds = seconds % 86400;
        uptime_array.push(value);
    }

    if (seconds >= 3600) {
        hours = parseInt(seconds / 3600);
        //hours = Math.round(hours);
        value = hours.toString() + " Hours";
        seconds = seconds % 3600;
        uptime_array.push(value);
    }

    if (seconds >= 60) {
        minutes = parseInt(seconds / 60);
        //minutes = Math.round(minutes);
        value = minutes.toString() + " Minutes";
        seconds = seconds % 60;
        uptime_array.push(value);
    }
    if (seconds >= 0) {
        seconds = parseInt(seconds);
        value = seconds.toString() + " Seconds";
        uptime_array.push(value);
    }


    if (uptime_array.length == 0) {
        return "UNKNOWN";
    }
    if (uptime_array.length == 1) {
        uptime = uptime_array[0];
    }
    else {
        uptime = uptime_array[0] + " " + uptime_array[1];
    }
    return uptime;

}

function redirect_login() {
    window.location = "/auth/login/";
}


function formatBytes(bytes) {
    if (bytes == -1) return '0 Byte';
    if (isNaN(bytes)) return '0 Byte';
    if (bytes == 0) return '0 Byte';
    var k = 1024;

    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    try {
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    } catch (e) {
        return '0 Byte';
    }


}

function icon_for_os(os) {
    var icon = "fa-question";
    var apple = ['Mac OS X', 'iOS'];
    var android = ['Android'];
    var windows = ['Windows'];
    var amazon = ['Amazon Kindle'];
    switch (os) {
        case 'Mac OS X':
            icon = "fa-apple";
            break;
        case 'iOS':
            icon = "fa-apple";
            break;
        case 'Android':
            icon = "fa-android";
            break;
        case 'Windows':
            icon = "fa-windows";
            break;
        case 'Windows 7/Vista':
            icon = "fa-windows";
            break;
        case 'Windows (Mobile) 8/8.1/10':
            icon = "fa-windows";
            break;
        case 'Windows (Mobile) 8 / Windows (Mobile) 10':
            icon = "fa-windows";
            break;
        case 'Ubuntu/Debian 5/Knoppix 6':
            icon = "fa-linux";
            break;
        case 'Linux':
            icon = "fa-linux";
            break;
        case 'Amazon Kindle':
            icon = "fa-amazon";
            break;
        case 'Chrome OS':
            icon = "fa-chrome";
            break;
    }

    return icon;


}

function alert_message(flag, message) {

    var divhtml = "<div class='alert alert-dismissible ";
    if (flag == true) {
        divhtml = divhtml + "alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check' ></i>";
    }
    if (flag == false) {
        divhtml = divhtml + "alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-close' ></i>";
    }
    if (flag != false && flag != true) {
        divhtml = divhtml + "alert-warning'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <h4><i class='icon fa fa-check' ></i>";
    }
    divhtml = divhtml + message + "</h4> </div>";
    window.setTimeout(function () {
        $(".alert").fadeTo(500, 0).slideUp(500, function () {

        });

    }, 6000);
    return divhtml;
}

function get_color_list() {
    return ["orange", "grey", "#9ACD32", "#FFFF00", "#F5DEB3", "#EE82EE", "#40E0D0", "#FF6347", "#D8BFD8", "#008080", "#00FF7F", "#6A5ACD", "#A0522D", "#2E8B57", "#F4A460", "#FF0000", "#663399", "#800080", "#B0E0E6", "#DDA0DD", "#CD853F", "#DB7093", "#AFEEEE", "#DA70D6", "#FF4500", "#FFA500", "#6B8E23", "#000080", "#800000", "#FF00FF", "#00FF00", "#B0C4DE", "#778899", "#20B2AA", "#D3D3D3", "#F08080", "#7CFC00", "#F0E68C", "#4B0082", "#CD5C5C", "#FF69B4", "#FFD700", "#00FFFF", "#0000FF", "#8A2BE2", "#A52A2A", "#FF7F50"];
}

function get_color(flag, value) {
    //console.log(value);
    if (flag == true) {
        if (value < 50) {
            return "red"
        }
        if (value >= 50 && value < 75) {
            return "orange"
        }
        if (value <= 100 && value > 75) {
            return "green"
        }
    }
    else {
        if (value < 50) {
            return "green"
        }
        if (value >= 50 && value < 75) {
            return "orange"
        }
        if (value <= 100 && value > 75) {
            return "red"
        }
    }
}

function percentage(used, total) {
    if (used.isNaN) return 0;
    if (total.isNan) return 0;
    if (total == 0) return 0;
    var value = (used / total) * 100;
    value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
    return value;
}

function setcolors(data) {
    var colors = get_color_list();
    for (i = 0; i < data.length; i++) {
        k = 0;
        if (i < colors.length) {
            k = i;
        }
        else {
            k = i % colors.length;
        }
        data[i]["color"] = colors[k];

        if (data[i]["name"] == "iowait") {
            data[i]["color"] = "#DD0000";
        }
        if (data[i]["name"] == "idle") {
            data[i]["color"] = "#008000";
        }
        if (data[i]["name"] == "system") {
            data[i]["color"] = "#0000DD";
        }
        if (data[i]["name"] == "user") {
            data[i]["color"] = "#FF8000";
        }
        if (data[i]["name"] == "Connected") {
            data[i]["color"] = "orange";
        }
        if (data[i]["name"] == "Disconnected") {
            data[i]["color"] = "grey";
        }
        if (data[i]["name"] == "Critical Required") {
            data[i]["color"] = "orange";
        }
        if (data[i]["name"] == "Minor Required") {
            data[i]["color"] = "#F5C778";
        }
        if (data[i]["name"] == "Major") {
            data[i]["color"] = "orange";
        }
        if (data[i]["name"] == "Minor") {
            data[i]["color"] = "#F5C778";
        }
        if (data[i]["name"] == "Up to date") {
            data[i]["color"] = "grey";
        }
        if (data[i]["name"] == "not_patched") {
            data[i]["color"] = "orange";
            data[i]["name"] = "Not Patched";
        }
        if (data[i]["name"] == "semi_patched") {
            data[i]["color"] = "#F5C778";
            data[i]["name"] = "Semi Patched";
        }
        if (data[i]["name"] == "fully_patched") {
            data[i]["color"] = "grey";
            data[i]["name"] = "Fully Patched";
        }
    }
    return data;
}


function geo_graph(series, Title, x_axis) {

    var chart = {
        map: 'world_mill_en',
        backgroundColor: "transparent",
        title: Title,

        regionStyle: {
            initial: {
                fill: '#e4e4e4',
                "fill-opacity": 1,
                stroke: 'none',
                "stroke-width": 0,
                "stroke-opacity": 1
            }
        },
        series: {
            regions: [{
                values: series,
                scale: ["#92c1dc", "#ebf4f9"],
                normalizeFunction: 'polynomial'
            }]
        },
        onRegionLabelShow: function (e, el, code) {
            if (typeof series[code] != "undefined")
                el.html(el.html() + ': <b> ' + series[code] + '</b>  ' + x_axis);
        }
    };

    return chart;

}

function formatDate(date) {
    var utc_time = date.toUTCString().toString().split(" ");

    var time_str = utc_time[4];

    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + time_str;
}



