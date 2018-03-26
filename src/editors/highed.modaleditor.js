/******************************************************************************

 Copyright (c) 2016-2018, Highsoft

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 ******************************************************************************/

// @format

/** A modal editor
 * The modal editor connects to a "summoner", which is the DOM node that should
 * spawn the editor. This arg is however optional, and if not present,
 * `show()` should be called instead when wanting to display it.
 *
 * The contained editor can either be a full editor, or a simple editor.
 *
 * @example
 * highed.ModalEditor('icon', {allowDone: true}, function (html) {
 *    doSomethingWithTheExportedHTML(html);
 * });
 *
 * @constructor
 *
 * @param summoner {domnode} - the node which spawns the editor
 * @param attributes {object} - properties. Note that this object is also passed to the editor constructor.
 *   > type {string} - either `full` or `simple`.
 *   > allowDone {bool} - if set to true (default is false) a "Close and use" button will appear on the top bar
 * @param fn {function} - function to call when done editing, argument is an instance of highed.ChartPreview
 *
 */
highed.ModalEditor = function (summoner, attributes, fn) {
    var properties = highed.merge(
            {
                type: 'full',
                allowDone: false
            },
            attributes
        ),
        modal = highed.OverlayModal(false, {
            width: '95%',
            height: '95%',
            showOnInit: false
        }),
        editor =
            properties.type === 'full'
                ? highed.Editor(modal.body, attributes)
                : highed.SimpleEditor(modal.body, attributes),
    //We don't always know the summoner at create time..
        sumFn = false,
        doneEditing = highed.dom.cr(
            'button',
            'highed-done-button',
            'Close &amp; Use'
        );
    ///////////////////////////////////////////////////////////////////////////

    /** Attach to a new summoner
     *  @memberof highed.ModalEditor
     *  @param nn {domnode} - the new node to attach to
     */
    function attachToSummoner(nn) {
        nn = nn || summoner;

        if (!nn) {
            return;
        }

        if (highed.isFn(sumFn)) {
            sumFn();
        }


        //Show the modal when clicking the summoner
        sumFn = highed.dom.on(highed.dom.get(nn), 'click', modal.show);

        // load data if its avaliable
        window.setTimeout(function() {
            editor.chart.loadProject(loadData);
        }, 1000);

    }

    function doDone() {
        if (highed.isFn(fn)) {
            fn(editor.chart);

            // save with Ajax Call
            console.log(editor.chart.export.json(true));
        }
        modal.hide();
    }


    var sampleData = {
        "template": {},
        "options": {
            "title": {
                "text": "My Demo Chart"
            },
            "subtitle": {
                "text": "My Demo Subtitle Chart"
            },
            "exporting": {},
            "yAxis": [
                {
                    "title": {}
                }
            ],
            "series": [
                {
                    "data": [
                        [
                            "Jan",
                            7
                        ],
                        [
                            "Feb",
                            6.9
                        ],
                        [
                            "Mar",
                            9.5
                        ],
                        [
                            "Apr",
                            14.5
                        ],
                        [
                            "May",
                            18.2
                        ],
                        [
                            "Jun",
                            21.5
                        ],
                        [
                            "Jul",
                            25.2
                        ],
                        [
                            "Aug",
                            26.5
                        ],
                        [
                            "Sep",
                            23.3
                        ],
                        [
                            "Oct",
                            18.3
                        ],
                        [
                            "Nov",
                            13.9
                        ],
                        [
                            "Dec",
                            9.6
                        ]
                    ],
                    "name": "Tokyo",
                    "turboThreshold": 0,
                    "_colorIndex": 0,
                    "_symbolIndex": 0
                },
                {
                    "data": [
                        [
                            "Jan",
                            -0.2
                        ],
                        [
                            "Feb",
                            0.8
                        ],
                        [
                            "Mar",
                            5.7
                        ],
                        [
                            "Apr",
                            11.3
                        ],
                        [
                            "May",
                            17
                        ],
                        [
                            "Jun",
                            22
                        ],
                        [
                            "Jul",
                            24.8
                        ],
                        [
                            "Aug",
                            24.1
                        ],
                        [
                            "Sep",
                            20.1
                        ],
                        [
                            "Oct",
                            14.1
                        ],
                        [
                            "Nov",
                            8.6
                        ],
                        [
                            "Dec",
                            2.5
                        ]
                    ],
                    "name": "New York",
                    "turboThreshold": 0,
                    "_colorIndex": 1,
                    "_symbolIndex": 1
                },
                {
                    "data": [
                        [
                            "Jan",
                            -0.9
                        ],
                        [
                            "Feb",
                            0.6
                        ],
                        [
                            "Mar",
                            3.5
                        ],
                        [
                            "Apr",
                            8.4
                        ],
                        [
                            "May",
                            13.5
                        ],
                        [
                            "Jun",
                            17
                        ],
                        [
                            "Jul",
                            18.6
                        ],
                        [
                            "Aug",
                            17.9
                        ],
                        [
                            "Sep",
                            14.3
                        ],
                        [
                            "Oct",
                            9
                        ],
                        [
                            "Nov",
                            3.9
                        ],
                        [
                            "Dec",
                            1
                        ]
                    ],
                    "name": "Berlin",
                    "turboThreshold": 0,
                    "_colorIndex": 2,
                    "_symbolIndex": 2
                },
                {
                    "data": [
                        [
                            "Jan",
                            3.9
                        ],
                        [
                            "Feb",
                            4.2
                        ],
                        [
                            "Mar",
                            5.7
                        ],
                        [
                            "Apr",
                            8.5
                        ],
                        [
                            "May",
                            11.9
                        ],
                        [
                            "Jun",
                            15.2
                        ],
                        [
                            "Jul",
                            17
                        ],
                        [
                            "Aug",
                            16.6
                        ],
                        [
                            "Sep",
                            14.2
                        ],
                        [
                            "Oct",
                            10.3
                        ],
                        [
                            "Nov",
                            6.6
                        ],
                        [
                            "Dec",
                            4.8
                        ]
                    ],
                    "name": "London",
                    "turboThreshold": 0,
                    "_colorIndex": 3,
                    "_symbolIndex": 3
                }
            ],
            "plotOptions": {
                "series": {
                    "animation": false
                }
            },
            "data": {
                "csv": "\"Categories\";\"Tokyo\";\"New York\";\"Berlin\";\"London\"\n\"Jan\";7;-0.2;-0.9;3.9\n\"Feb\";6.9;0.8;0.6;4.2\n\"Mar\";9.5;5.7;3.5;5.7\n\"Apr\";14.5;11.3;8.4;8.5\n\"May\";18.2;17;13.5;11.9\n\"Jun\";21.5;22;17;15.2\n\"Jul\";25.2;24.8;18.6;17\n\"Aug\";26.5;24.1;17.9;16.6\n\"Sep\";23.3;20.1;14.3;14.2\n\"Oct\";18.3;14.1;9;10.3\n\"Nov\";13.9;8.6;3.9;6.6\n\"Dec\";9.6;2.5;1;4.8"
            }
        },
        "customCode": "",
        "theme": false,
        "settings": {
            "constructor": "Chart",
            "dataProvider": {
                "csv": "\"Categories\";\"Tokyo\";\"New York\";\"Berlin\";\"London\"\n\"Jan\";7;-0.2;-0.9;3.9\n\"Feb\";6.9;0.8;0.6;4.2\n\"Mar\";9.5;5.7;3.5;5.7\n\"Apr\";14.5;11.3;8.4;8.5\n\"May\";18.2;17;13.5;11.9\n\"Jun\";21.5;22;17;15.2\n\"Jul\";25.2;24.8;18.6;17\n\"Aug\";26.5;24.1;17.9;16.6\n\"Sep\";23.3;20.1;14.3;14.2\n\"Oct\";18.3;14.1;9;10.3\n\"Nov\";13.9;8.6;3.9;6.6\n\"Dec\";9.6;2.5;1;4.8",
                "googleSpreadsheet": false
            }
        }
    };
    // Load Data With Ajax Call

    var loadData = $.extend(false, sampleData,editor.chart.export.json(true));

    //Resize the editor when showing the modal
    modal.on('Show', editor.resize);

    function loadSavedProject(){
        modal.on('show', editor.chart.loadProject(loadData));
    }


    highed.dom.on(doneEditing, 'click', doDone);

    attachToSummoner(summoner);

    if (properties.allowDone) {
        highed.dom.ap(editor.toolbar.center, doneEditing);
    }

    editor.on('Done', doDone);
    editor.resize();

    ///////////////////////////////////////////////////////////////////////////

    return {
        editor: editor,
        show: modal.show,
        hide: modal.hide,
        on: editor.on,
        attachToSummoner: attachToSummoner
    };
};

highed.templates.add('Combinations', {
    title: 'Bar & Line',
    thumbnail: '',
    config: {
        series: [
            {
                type: 'column'
            },
            {
                type: 'line',
                yAxis: 1
            }
        ],
        yAxis: [
            {
            },
            {
            }
        ],
        xAxis: {}
    }
});