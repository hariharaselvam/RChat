/**
 * Created by hariharaselvam on 7/27/16.
 */

window[appName].factory('graph', function ($rootScope) {
    return {
        Speedo: function (series, Title, x_axis) {
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


        },
        Series: function (data, title_text, x_axis, y_axis, gtype, area, width,negative_y) {
            var title = "";

            var yaxis = {

                    min: 0,
                    title: {
                        text: y_axis
                    },
                };
            if(negative_y==true)
            {
                yaxis = {


                    title: {
                        text: y_axis
                    },
                };

            }

            if (width == undefined || width == 'small') {
                chart = {

                    height: 300,
                    zoomType: 'x',
                    spacingRight: 1,
                    type: gtype
                };

            }
            else {
                chart = {
                    width: 980,
                    height: 300,
                    zoomType: 'x',
                    spacingRight: 1,
                    type: gtype
                };
                title = title_text;


            }


            if (area == "stacked") {
                area = {
                    stacking: "normal",
                    lineWidth: 1,
                    marker: {

                        enabled: false
                    }
                };
            } else {
                area = {
                    lineWidth: 1,
                    marker: {

                        enabled: false
                    }
                };
            }

            var plotbonds=[{
                        from: 1473864300000,
                        to: 1473866100000,
                        color: '#FCFFC5',
                        label: {
                            text: "Analyzing..."
                        }
                    }];
            plotbonds = {};

            var chart = {
                options: {
                    chart: chart,
                    plotOptions: {
                        series: {},
                        area: area,
                        line: {
                            marker: {

                                enabled: false
                            }
                        }
                    },
                },
                xAxis: {
                    type: 'datetime',
                    title: {
                        text: x_axis
                    },

                    plotBands: plotbonds,

                    events: {
                        afterSetExtremes: function () {
                            min = parseFloat(this.getExtremes().min);
                            max = parseFloat(this.getExtremes().max);

                            t1 = new Date(parseInt(min));
                            mint = formatDate(t1);
                            t2 = new Date(parseInt(max));
                            maxt = formatDate(t2);

                            $rootScope.interval = {"start": mint, "end": maxt, "graph": title_text};
                            $rootScope.$$phase || $rootScope.$apply();


                        }
                    }
                },
                yAxis: yaxis,
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
                    text: title
                },
                credits: {
                    enabled: false
                }
            };
            return chart;
        },

        MultiSeries: function (data, title_text, yaxis1, yaxis2, xaxis, width, stack) {
            var title = "";

            var area = {};


            if (width == undefined || width == 'small') {
                chart = {
                    height: 300,
                    zoomType: 'x',
                    spacingRight: 1,

                };

            }
            else {
                chart = {
                    width: 980,
                    height: 300,
                    zoomType: 'x',
                    spacingRight: 1,

                };
                title = title_text;


            }

            if (stack == "stacked") {
                area = {
                    stacking: "normal",
                    lineWidth: 1,
                    marker: {

                        enabled: false
                    }
                };
            } else {
                area = {
                    lineWidth: 1,
                    marker: {

                        enabled: false
                    }
                };
            }

            var multichart = {
                options: {
                    chart: chart,
                    plotOptions: {
                        series: {},
                        area: area,
                        line: {
                            marker: {

                                enabled: false
                            }
                        }
                    },
                },
                xAxis: {
                    type: 'datetime',
                    title: {
                        text: xaxis
                    },
                    events: {
                        afterSetExtremes: function () {
                            min = parseFloat(this.getExtremes().min);
                            max = parseFloat(this.getExtremes().max);

                            t1 = new Date(parseInt(min));
                            mint = formatDate(t1);
                            t2 = new Date(parseInt(max));
                            maxt = formatDate(t2);

                            $rootScope.interval = {"start": mint, "end": maxt, "graph": title_text};
                            $rootScope.$$phase || $rootScope.$apply();


                        }
                    }
                },
                yAxis: [
                    {
                        title: {text: yaxis1},
                        min: 0
                    },
                    {
                        title: {text: yaxis2},
                        min: 0,
                        opposite: true
                    }
                ],
                series: data,

                plotOptions: {
                    series: {
                        cursor: 'pointer',
                    },
                    legend: {
                        enabled: false
                    }
                },
                title: {
                    text: title
                },
                credits: {
                    enabled: false
                }

            };

            return multichart;
        },

        Pie: function (response, pie_title, link) {

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
                        height: 300,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
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

        },
        Geo: function (series, Title, x_axis) {
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


        },

        Histogram: function (series, Title, y_axis, width) {
            var title = '';
            if (width == undefined || width == 'small') {
                chart = {

                    height: 300,
                    zoomType: 'x',
                    spacingRight: 1,
                    type: 'column'
                };

            }
            else {
                chart = {
                    width: 980,
                    height: 300,
                    zoomType: 'x',
                    spacingRight: 1,
                    type: 'column'
                };
                title = Title;


            }

            var chart = {
                options: {
                    chart: chart,
                    title: {
                        text: title
                    },
                    yAxis: {

                        min: 0,
                        title: {
                            text: y_axis
                        },
                    },
                    plotOptions: {
                        column: {
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,

                                style: {
                                    fontWeight: 'bold'
                                },
                                formatter: function () {
                                    return this.y + ' Days';
                                }
                            }
                        },
                        legend: {
                            enabled: false
                        }
                    },
                    credits: {
                        enabled: false
                    }


                },


                series: [{
                    name: y_axis,
                    data: series,
                    color: 'white'
                }]
            };
            return chart
        },

        Template: function (type, series) {
            var template = {};
            template["negative"]=false;
            var graph = {};
            var pop_graph = {};
            switch (type) {
                case 'throughput':
                    template["title"] = "Throughput";
                    template["x_axis"] = "Bits/Seconds";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'athroughput':
                    template["title"] = "Aggregate Throughput";
                    template["x_axis"] = "Bits/Seconds";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'dthroughput':
                    template["title"] = "Data Throughput";
                    template["x_axis"] = "Bits/Seconds";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'ethroughput':
                    template["title"] = "EstThroughput";
                    template["x_axis"] = "Bits/Seconds";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'mthroughput':
                    template["title"] = "Management Throughput";
                    template["x_axis"] = "Bits/Seconds";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'ithroughput':
                    template["title"] = "Throughput";
                    template["x_axis"] = "Bits/Seconds";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'packets':
                    template["title"] = "Packets";
                    template["x_axis"] = "Bits/Seconds";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'drops':
                    template["title"] = "Drops";
                    template["x_axis"] = "Bits/Seconds";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'errors':
                    template["title"] = "Errors";
                    template["x_axis"] = "Bits/Seconds";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'clientsessions':
                    template["title"] = "Client Sessions";
                    template["x_axis"] = "Sessions";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "stacked";
                    template["type"] = "series";
                    break;
                case 'cpuload':
                    template["title"] = "CPU Load";
                    template["x_axis"] = "CPU";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "line";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'cpustat':
                    template["title"] = "CPU Stats";
                    template["x_axis"] = "CPU";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "stacked";
                    template["type"] = "series";
                    break;
                case 'diskgraph':
                    colors = get_color_list();
                    for (i = 0; i < series.length; i++) {
                        series[i]['color'] = colors[i];
                    }
                    template["title"] = "Time Vs Disk Usage";
                    template["x_axis"] = "Disk (%)";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "line";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'airtime':
                    template["title"] = "AirTime";
                    template["x_axis"] = "AirTime";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "line";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'associations':
                    template["title"] = "Associations";
                    template["x_axis"] = "Associations";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "line";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'rssi':
                    template["title"] = "RSSI";
                    template["x_axis"] = "RSSI";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;

                case 'channelchanges':
                    template["title"] = "Channel Changes";
                    template["x_axis"] = "Channels";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "line";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;

                case 'radiobusy':
                    template["title"] = "Busy State";
                    template["x_axis"] = "Percentage (%)";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "line";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;

                case 'noisefloor':
                    template["title"] = "Noise Floor";
                    template["x_axis"] = "dBm";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "line";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    template["negative"] = true;
                    break;

                case 'channels':
                    template["title"] = "Active Channels";
                    template["x_axis"] = "Channels";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "line";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;

                case 'event_series':
                    var colors = get_color_list();
                    for (i = 0; i < series.length; i++) {
                        series[i]['color'] = colors[i];
                    }
                    template["title"] = "Distribution Series";
                    template["x_axis"] = "Events";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "stacked";
                    template["type"] = "series";
                    break;
                case 'frame1':
                    var frames = [];
                    for (i = 0; i < series.length; i++) {
                        if (series[i].name == 'TX Frames' || series[i].name == 'RX Frames' || series[i].name == 'RX Management Frames' || series[i].name == 'TX Management Frames') {
                            frames.push(series[i]);

                        }
                    }
                    series = frames;
                    template["title"] = "Frames";
                    template["x_axis"] = "Frames";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "line";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'frame2':
                    var frames = [];
                    for (i = 0; i < series.length; i++) {
                        if (series[i].name == 'RX CRC Frame Errors' || series[i].name == 'TX Dropped Frames' || series[i].name == 'TX Management Dropped Frames') {
                            frames.push(series[i]);

                        }
                    }
                    series = frames;
                    template["title"] = "Frames ( Error )";
                    template["x_axis"] = "Frames";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "line";
                    template["stack"] = "nonstack";
                    template["type"] = "series";
                    break;
                case 'accesspoints':
                    var ap_series = [];
                    for (i = 0; i < series.length; i++) {
                        if (series[i]["name"] != "Total") {

                            ap_series.push(series[i]);
                        }
                    }
                    series = ap_series;
                    template["title"] = "Managed APs";
                    template["x_axis"] = "Access Points";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "stacked";
                    template["type"] = "series";
                    break;
                case 'memorygraph':
                    var m_series = [];
                    var keys = ['Used', 'free'];

                    for (i = 0; i < series.length; i++) {
                        if (series[i]["name"] != "total") {
                            m_series.push(series[i]);
                        }
                    }

                    if (m_series.length == 2) {
                        series = [m_series[1], m_series[0]];

                    }
                    template["title"] = "Memory";
                    template["x_axis"] = "Memory (bytes)";
                    template["y_axis"] = "Date and Time";
                    template["c_type"] = "area";
                    template["stack"] = "stacked";
                    template["type"] = "series";
                    break;
                case 'cont_pie':
                    var pie_series = {};
                    for (i = 0; i < series.result.length; i++) {
                        pie_series[series.result[i]['ext_ip_country']] = series.result[i]['total'];
                    }
                    series = pie_series;
                    template["title"] = "Controllers by Country";
                    template["type"] = "pie";
                    break;
                case 'ap_pie':
                    var ap_series = {
                        "Connected": series.result.connected_ap,
                        "Disconnected": series.result.disconnected_ap
                    };
                    series = ap_series;
                    template["title"] = "Access Points";
                    template["type"] = "pie";
                    break;
                case 'os_pie':
                    series = series["result"];
                    template["title"] = "OSType";
                    template["type"] = "pie";
                    break;
                case 'cpu_pie':
                    if (series['count']) {
                        delete series['count'];
                    }
                    template["title"] = "CPU Usage";
                    template["type"] = "pie";
                    break;
                case 'event_pie':
                    pie_series = {};
                    for (i = 0; i < series.result.length; i++) {
                        pie_series[series.result[i]['key']] = series.result[i]['doc_count'];
                    }
                    series = pie_series;
                    template["title"] = "Event Distribution";
                    template["type"] = "pie";
                    break;

                case 'cpu_speedo':
                    var cpu_value = 0;


                    cpu_value = (series['1'] + series['15'] + series['5']) / 3;
                    cpu_value = percentage(cpu_value, series['count']);


                    series = [{
                        name: 'CPU Load',
                        data: [parseFloat(cpu_value)],
                        tooltip: {
                            valueSuffix: ' % '
                        }
                    }];
                    template["title"] = "CPU Load";
                    template["x_axis"] = "Load";
                    template["type"] = "speedo";
                    break;
                case 'disk_speedo':
                    var disk = series;
                    var series2 = [];
                    var colors = get_color_list();
                    var isx = 0;
                    if (disk.length == 3) {
                        isx = -40;
                    }
                    if (disk.length == 2) {
                        isx = -20;
                    }


                    for (i = 0; i < disk.length; i++) {
                        var scolor = colors[i];
                        var sx = isx;
                        isx = isx + 40;

                        var value = percentage(disk[i].used, disk[i].size);
                        var row = {
                            name: disk[i]["mount"],
                            data: [parseFloat(value)],
                            color: scolor,
                            dial: {
                                backgroundColor: scolor
                            },
                            dataLabels: {
                                color: scolor,
                                x: sx,
                                y: 20
                            },
                            tooltip: {
                                valueSuffix: ' % '
                            }
                        };
                        series2.push(row);
                    }
                    if (disk.length == 0) {
                        series2 = [{
                            name: 'disk',
                            data: [0],
                            tooltip: {
                                valueSuffix: ' % '
                            }
                        }];
                    }
                    series = series2;
                    template["title"] = "Disk Usage";
                    template["x_axis"] = "Usage %";
                    template["type"] = "speedo";
                    break;
                case 'memory_speedo':
                    var m_value = 0;


                    m_value = percentage(series.used, series.total);


                    if (series.total == -1) {
                        m_value = 0;
                    }


                    series = [{
                        name: 'Memory',
                        data: [parseFloat(m_value)],
                        tooltip: {
                            valueSuffix: ' % '
                        }
                    }];

                    template["title"] = "Memory Usage";
                    template["x_axis"] = "Usage %";
                    template["type"] = "speedo";
                    break;

                case 'controller_geo':
                    var geo_series = {};
                    for (i = 0; i < series.result.length; i++) {
                        geo_series[series.result[i]['ext_ip_countrycode']] = series.result[i]['total'];
                    }
                    series = geo_series;
                    template["title"] = "Geo Distribution of Controllers";
                    template["x_axis"] = "Controllers";
                    template["type"] = "geo";
                    break;

                case 'uptime':
                    series = series.result;
                    template["title"] = "Device Uptime";
                    template["x_axis"] = "Uptime";
                    template["type"] = "histogram";
                    break;

                case 'throughputues':
                    series = series;
                    for (i = 0; i < series.length; i++) {
                        if (series[i]['name'] == 'TX' || series[i]['name'] == 'RX') {
                            series[i]['type'] = "area";
                            series[i]['yAxis'] = 0;

                        }
                        else {
                            series[i]['type'] = "line";
                            series[i]['yAxis'] = 1;
                        }
                    }
                    template['title'] = "Throughput vs Sessions";
                    template["x_axis"] = "DateTime";
                    template["y_axis1"] = "Bits/Second";
                    template["y_axis2"] = "Sessions";
                    template["type"] = "multiseries";
                    template["area"] = "";
                    break;

                case 'clientsessions_ass':
                    series = series;
                    for (i = 0; i < series.length; i++) {
                        if (series[i]['name'] == '2.4GHz' || series[i]['name'] == '5GHz') {
                            series[i]['type'] = "area";
                            series[i]['yAxis'] = 0;

                        }
                        else {
                            series[i]['type'] = "line";
                            series[i]['yAxis'] = 1;
                        }
                    }
                    template['title'] = "Client Sessions vs Associations";
                    template["x_axis"] = "DateTime";
                    template["y_axis1"] = "Client Sessions";
                    template["y_axis2"] = "Associations";
                    template["type"] = "multiseries";
                    template["area"] = "stacked";
                    break;
            }
            switch (template["type"]) {
                case 'series':
                    graph = this.Series(series, template['title'], template['y_axis'], template['x_axis'], template['c_type'], template['stack'],'small',template["negative"]);
                    pop_graph = this.Series(series, template['title'], template['y_axis'], template['x_axis'], template['c_type'], template['stack'], 980,template["negative"]);
                    break;

                case 'pie':
                    graph = this.Pie(series, "");
                    pop_graph = this.Pie(series, template["title"]);
                    break;

                case 'speedo':
                    graph = this.Speedo(series, "", template['x_axis']);
                    pop_graph = this.Speedo(series, template["title"], template['x_axis']);
                    break;

                case 'geo':
                    graph = this.Geo(series, "", template['x_axis']);
                    pop_graph = this.Geo(series, template["title"], template['x_axis']);
                    break;

                case 'histogram':
                    graph = this.Histogram(series, "", template['x_axis']);
                    pop_graph = this.Histogram(series, template["title"], template['x_axis'], 980);
                    break;

                case 'multiseries':
                    graph = this.MultiSeries(series, template['title'], template['y_axis1'], template['y_axis2'], template['x_axis'], width = 'small', template['area']);
                    pop_graph = this.MultiSeries(series, template['title'], template['y_axis1'], template['y_axis2'], template['x_axis'], width = 980, template['area']);
                    break;
            }


            return [graph, pop_graph, template['title'], template["type"]];
        }

    }
});
