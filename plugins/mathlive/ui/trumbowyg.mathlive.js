import debug = require("gulp-debug");

/* globals MathJax */
(function ($) {
    'use strict';
    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                mathlive: 'Insert Formulas',
                formulas: 'Formulas',
                inline: 'Inline'
            },
            az: {
                mathlive: 'Düstur əlavə et',
                formulas: 'Düsturlar',
                inline: 'Sətir içi'
            },
            by: {
                mathlive: 'Уставіць формулу',
                formulas: 'Формула',
                inline: 'Inline-элемент'
            },
            ca: {
                mathlive: 'Inserir Fórmula',
                formulas: 'Fórmula',
                inline: 'En línia'
            },
            da: {
                mathlive: 'Indsæt formler',
                formulas: 'Formler',
                inline: 'Inline'
            },
            de: {
                mathlive: 'Formel einfügen',
                formulas: 'Formel',
                inline: 'Innerhalb der Zeile'
            },
            es: {
                mathlive: 'Insertar Fórmula',
                formulas: 'Fórmula',
                inline: 'En línea'
            },
            et: {
                mathlive: 'Sisesta valem',
                formulas: 'Valemid',
                inline: 'Teksti sees'
            },
            fr: {
                mathlive: 'Inserer une formule',
                formulas: 'Formule',
                inline: 'En ligne'
            },
            hu: {
                mathlive: 'Formulák beszúrás',
                formulas: 'Formulák',
                inline: 'Inline'
            },
            ko: {
                mathlive: '수식 넣기',
                formulas: '수식',
                inline: '글 안에 넣기'
            },
            pt_br: {
                mathlive: 'Inserir fórmulas',
                formulas: 'Fórmulas',
                inline: 'Em linha'
            },
            ru: {
                mathlive: 'Вставить формулу',
                formulas: 'Формула',
                inline: 'Строчный элемент'
            },
            sl: {
                mathlive: 'Vstavi matematični izraz',
                formulas: 'Formula',
                inline: 'V vrstici'
            },
            tr: {
                mathlive: 'Formül Ekle',
                formulas: 'Formüller',
                inline: 'Satır içi'
            },
            zh_tw: {
                mathlive: '插入方程式',
                formulas: '方程式',
                inline: '內嵌'
            },
        },
        // jshint camelcase:true

        plugins: {
            mathlive: {
                init: function (trumbowyg) {
                    var mathliveOptions = {
                        formulas: {
                            label: trumbowyg.lang.formulas,
                            required: true,
                            value: ''
                        },
                        inline: {
                            label: trumbowyg.lang.inline,
                            attributes: {
                                checked: true
                            },
                            type: 'checkbox',
                            required: false,
                        }
                    };

                    var mathliveCallback = function (v) {
                        var delimiter = v.inline ? '$' : '$$';
                        if (trumbowyg.currentMathNode) {
                            $(trumbowyg.currentMathNode)
                                .html(delimiter + ' ' + v.formulas + ' ' + delimiter)
                                .attr('formulas', v.formulas)
                                .attr('inline', (v.inline ? 'true' : 'false'));
                        } else {
                            var html = '<span contenteditable="false" formulas="' + v.formulas + '" inline="' + (v.inline ? 'true' : 'false') + '" >' + delimiter + ' ' + v.formulas + ' ' + delimiter + '</span>';
                            var node = $(html)[0];
                            node.onclick = openModal;

                            trumbowyg.range.deleteContents();
                            trumbowyg.range.insertNode(node);
                        }

                        trumbowyg.currentMathNode = false;
                        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
                        return true;
                    };

                    var openModal = function () {
                        trumbowyg.currentMathNode = this;
                        mathliveOptions.formulas.value = $(this).attr('formulas');

                        if ($(this).attr('inline') === 'true') {
                            mathliveOptions.inline.attributes.checked = true;
                        } else {
                            delete mathliveOptions.inline.attributes.checked;
                        }

                        //trumbowyg.openModalInsert(trumbowyg.lang.mathlive, mathliveOptions, mathliveCallback);


                    };

                    var btnDef = {
                        fn: function () {
                            trumbowyg.saveRange();

                            mathliveOptions.formulas.value = trumbowyg.getRangeText();
                            mathliveOptions.inline.attributes.checked = true;
                            //trumbowyg.openModalInsert(trumbowyg.lang.mathlive, mathliveOptions, mathliveCallback);

                            $modal = trumbowyg.openModalInsert({
                                title: trumbowyg.lang.mathlive,
                                fields: {
                                    mathliveOptions,
                                    // Build your own input by setting type as a function and returning the html
                                    referrerpolicy: {
                                        label: 'Referrer Policy',
                                        name: 'referrerpolicy',
                                        type: function (field, fieldId, prefix, lg) {
                                            var html = '';

                                            if (field.name === "formula")
                                            {

                                                html += '<div class="' + prefix + 'input-row">' +
                                                    '<div class="' + prefix + 'input-infos">' +
                                                    '<label for="' + fieldId + '">' +
                                                    '<span>' + (lg[field.label] ? lg[field.label] : field.label) + '</span>' +
                                                    '</label>' +
                                                    '</div>' +
                                                    '<div class="' + prefix + 'input-html">' +
                                                
                                                    '</div>' +
                                                    '</div>';

                                            }

                                            return html;
                                        }
                                    }
                                },
                                // Callback is called when user confirms
                                callback: function (values) {
                                    mathliveCallback(values);

                                    return true; // Return true if you have finished with this modal box
                                    // If you do not return anything, you must manage the closing of the modal box yourself
                                }
                            });

                            // You can also listen for modal confirm/cancel events to do some custom things
                            // Note: the openModalInsert callback is called on tbwconfirm
                            $modal.on('tbwconfirm', function (e) {
                                // Do what you want
                            });
                            $modal.on('tbwcancel', function (e) {
                                trumbowyg.closeModal();
                            });
                        }
                    };

                    trumbowyg.$ta.on('tbwinit', function () {
                        var nodes = trumbowyg.$ed.find('[formulas]');

                        nodes.each(function (i, elem) {
                            elem.onclick = openModal;
                        });
                    });

                    trumbowyg.addBtnDef('mathlive', btnDef);
                }
            }
        }
    });
})(jQuery);
